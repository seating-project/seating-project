import { NextResponse, type NextRequest } from "next/server";
import chromium from "@sparticuz/chromium";
import JSZip from "jszip";
import { z } from "zod";

import { env } from "@/env";
import { db } from "@/server/db";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const downloadSchema = z.object({
  links: z.array(z.string()),
  examId: z.number(),
  templateId: z.number(),
});

/**
 * Chromium for Puppeteer
 */
const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as z.infer<typeof downloadSchema>;
  const exam = await Promise.resolve(
    await db.exam.findUnique({
      where: { id: body.examId },
      include: {
        Departments: true,
        Template: {
          include: {
            Rooms: true,
          },
        },
        Years: true,
        College: true,
        DepartmentsLeftBoys: true,
        DepartmentsLeftGirls: true,
        DepartmentsRightBoys: true,
        DepartmentsRightGirls: true,
        DepartmentsLeftSingleYear: true,
        DepartmentsRightSingleYear: true,
        RoomsOrder: true,
      },
    }),
  );

  const template = await Promise.resolve(
    await db.template.findUnique({
      where: { id: body.templateId },
      include: {
        Rooms: true,
        Buildings: true,
        Logo: true,
      },
    }),
  );

  if (!exam) {
    return new NextResponse(`Exam not found`, {
      status: 500,
    });
  }

  if (!template) {
    return new NextResponse(`Template not found`, {
      status: 500,
    });
  }

  let browser;
  if (env.NODE_ENV === "production") {
    const puppeteer = await import("puppeteer-core");
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
      headless: true,
      acceptInsecureCerts: true,
    });
  } else if (env.NODE_ENV === "development") {
    const puppeteer = await import("puppeteer");
    browser = await puppeteer.launch({
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--allow-file-access-from-files",
        "--enable-local-file-accesses",
      ],
      headless: true,
    });
  }

  if (!browser) {
    throw new Error("Browser not found");
  }

  const page = await browser.newPage();

  await page.goto(`${env.BASE_URL}/login`);
  console.log("LOGIN PAGE", `${env.BASE_URL}/login`);

  await page.type("#email", env.DOWNLOAD_EMAIL);
  await page.type("#password", env.DOWNLOAD_PASSWORD);

  await page.click("#login-button");

  await page.waitForNavigation();

  const zip = new JSZip();

  for (const link of body.links) {
    const docName = link.split("/")[3];

    if (docName === "attendance") {
      const room = link.split("/")[link.split("/").length - 1];
      const date = link.split("/")[link.split("/").length - 2] ?? "";
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const numDate = dateObj.getDate();
      await page.goto(`${env.BASE_URL}${link}`, {
        waitUntil: "load",
        timeout: 0,
      });
      const pdf = await page.pdf({ format: "A4", timeout: 0 });
      zip.file(`attendance-${month}-${numDate}-${room}.pdf`, pdf, {
        binary: true,
      });
    }
    if (docName === "allotment") {
      const date = link.split("/")[link.split("/").length - 1] ?? "";
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const numDate = dateObj.getDate();

      await page.goto(`${env.BASE_URL}${link}`, {
        waitUntil: "networkidle0",
        timeout: 0,
      });
      const pdf = await Promise.resolve(
        await page.pdf({ format: "A4", timeout: 0 }),
      );
      zip.file(`allotment-${month}-${numDate}.pdf`, pdf, { binary: true });
    } else if (docName === "hallplan") {
      if (
        link.split("/")[link.split("/").length - 1] === "boys" ||
        link.split("/")[link.split("/").length - 1] === "girls"
      ) {
        const gender = link.split("/")[link.split("/").length - 1] ?? "";
        const date = link.split("/")[link.split("/").length - 2] ?? "";
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const numDate = dateObj.getDate();

        await page.goto(`${env.BASE_URL}${link}`, {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        const pdf = await page.pdf({ format: "A4", timeout: 0 });
        zip.file(`hallplan-${month}-${numDate}-${gender}.pdf`, pdf, {
          binary: true,
        });
      } else {
        const date = link.split("/")[link.split("/").length - 1] ?? "";
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const numDate = dateObj.getDate();

        await page.goto(`${env.BASE_URL}${link}`, {
          waitUntil: "networkidle0",
          timeout: 0,
        });
        const pdf = await page.pdf({ format: "A4", timeout: 0 });
        zip.file(`hallplan-${month}-${numDate}.pdf`, pdf, { binary: true });
      }
    }
  }

  // Generate the zip file as a buffer
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });

  const response = new NextResponse(zipBuffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=documents.zip",
    },
    status: 200,
  });

  return response;
}

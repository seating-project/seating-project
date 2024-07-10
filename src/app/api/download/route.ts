import { NextResponse, type NextRequest } from "next/server";
import JSZip from "jszip";
import puppeteer from "puppeteer";
// import puppeteer from 'puppeteer-core';
import { z } from "zod";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

const downloadSchema = z.object({
  links: z.array(z.string()),
  examId: z.number(),
  templateId: z.number(),
});

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
  // const puppeteer = await import("puppeteer-core");
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
    args: [
      // "--disable-gpu",
      // "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });
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
      const date = link.split("/")[link.split("/").length - 2];
      await page.goto(`${env.BASE_URL}${link}`, {
        waitUntil: "load",
        timeout: 0,
      });
      const pdf = await page.pdf({ format: "A4", timeout: 0 });
      zip.file(`attendance-${date}-${room}.pdf`, pdf, { binary: true });
    }
    if (docName === "allotment") {
      const date = link.split("/")[link.split("/").length - 1] ?? "";
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const numDate = dateObj.getDate();

      await page.goto(`${env.BASE_URL}${link}`, {
        waitUntil: "networkidle0",
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
        });
        const pdf: Buffer = await page.pdf({ format: "A4", timeout: 0 });
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

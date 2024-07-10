import { promises as fs } from "fs";
import os from "os";
import path from "path";
import puppeteer from "puppeteer";
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const pdfRouter = createTRPCRouter({
  downloadPDFs: protectedProcedure
    .input(
      z.object({
        links: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const examID = decodeURIComponent(input.links[0]?.split("/")[2] ?? "");
      const exam = await ctx.db.exam.findUnique({
        where: { id: parseInt(examID) },
      });
      if (!exam) {
        throw new Error("Exam not found");
      }
      const pdfsDir =
        path.join(os.homedir(), "Downloads") + `/Seating/${exam.name}`;

      const attendanceDir = path.join(pdfsDir, "attendance");
      console.log("PDF", pdfsDir);

      try {
        await fs.mkdir(pdfsDir, { recursive: true });
        await fs.mkdir(attendanceDir, { recursive: true });
      } catch (error) {
        console.log("Error creating directory", error);
        throw error;
      }

      const browser = await puppeteer.launch({
        headless: "new",
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

      let message = "";

      for (const link of input.links) {
        const docName = link.split("/")[3];

        if (docName === "attendance") {
          const room = link.split("/")[link.split("/").length - 1];
          const date = link.split("/")[link.split("/").length - 2];
          const pdfPath = `${attendanceDir}/${docName}_${room}_${date}.pdf`;
          await page.goto(`${env.BASE_URL}${link}`, {
            waitUntil: "load",
            timeout: 0,
          });
          await page.pdf({ path: pdfPath, format: "A4", timeout: 0 });
        }
        if (docName === "allotment") {
          const date = link.split("/")[link.split("/").length - 1] ?? "";
          const dateObj = new Date(date);
          const month = dateObj.toLocaleString("default", { month: "long" });
          const numDate = dateObj.getDate();
          const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}.pdf`;
          await page.goto(`${env.BASE_URL}${link}`, {
            waitUntil: "networkidle0",
          });
          await page.pdf({ path: pdfPath, format: "A4", timeout: 0 });
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
            const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}_${gender}.pdf`;
            await page.goto(`${env.BASE_URL}${link}`, {
              waitUntil: "networkidle0",
            });
            await page.pdf({ path: pdfPath, format: "A4", timeout: 0 });
          } else {
            const date = link.split("/")[link.split("/").length - 1] ?? "";
            const dateObj = new Date(date);
            const month = dateObj.toLocaleString("default", { month: "long" });
            const numDate = dateObj.getDate();
            const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}.pdf`;
            await page.goto(`${env.BASE_URL}${link}`, {
              waitUntil: "networkidle0",
            });
            await page.pdf({ path: pdfPath, format: "A4", timeout: 0 });
          }
        }

        message += `PDF downloaded successfully for link ${link}\n`;
      }

      await browser.close();
      return { message };
    }),
});

import puppeteer from "puppeteer";
import { promises as fs } from "fs";
import path from "path";

export async function downloadPDFs(links: string[]) {
  // const pdfsDir = './pdfs';
  const examName = decodeURIComponent(links[0].split("/")[4]);
  // const pdfsDir = path.join(require('os').homedir(), 'Downloads') + `/Seating/${examName}`;
  //create pdf directory inside app
  // const pdfsDir = path.join(__dirname, '..', '..', 'pdfs', examName);

  // create pdf folder in root directory
  // const pdfsDir = path.join(__dirname, '..', '..', '..', 'pdfs', examName);

  // create pdf folder in root directory
  const pdfsDir = path.join(process.cwd(), "pdfs", examName);

  const attendanceDir = path.join(pdfsDir, "attendance");
  console.log("PDF", pdfsDir);

  let message = "";

  try {
    await fs.mkdir(pdfsDir, { recursive: true });
    await fs.mkdir(attendanceDir, { recursive: true });
  } catch (error: any) {
    if (error.code !== "EEXIST") {
      throw error;
    }
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-sandbox",
    ],
  });
  const page = await browser.newPage();

  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    const docName = url.split("/")[5];

    if (docName === "attendance") {
      const room = url.split("/")[url.split("/").length - 1];
      const date = url.split("/")[url.split("/").length - 2];
      const pdfPath = `${attendanceDir}/${docName}_${room}_${date}.pdf`;
      await page.goto(url, { waitUntil: "networkidle0" });
      await page.pdf({ path: pdfPath, format: "A4" });
    } else if (docName === "allotments") {
      const date = url.split("/")[url.split("/").length - 1];
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString("default", { month: "long" });
      const numDate = dateObj.getDate();
      // const pdfPath = `${pdfsDir}/${docName}_${date}.pdf`;
      const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}.pdf`;
      await page.goto(url, { waitUntil: "networkidle0" });
      await page.pdf({ path: pdfPath, format: "A4" });
    } else if (docName === "hallplan") {
      // const pdfPath = `${pdfsDir}/${docName}.pdf`;
      if (
        url.split("/")[url.split("/").length - 1] === "boys" ||
        url.split("/")[url.split("/").length - 1] === "girls"
      ) {
        const gender = url.split("/")[url.split("/").length - 1];
        const date = url.split("/")[url.split("/").length - 2];
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const numDate = dateObj.getDate();
        const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}_${gender}.pdf`;
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.pdf({ path: pdfPath, format: "A4" });
      } else {
        const date = url.split("/")[url.split("/").length - 1];
        const dateObj = new Date(date);
        const month = dateObj.toLocaleString("default", { month: "long" });
        const numDate = dateObj.getDate();
        const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}.pdf`;
        await page.goto(url, { waitUntil: "networkidle0" });
        await page.pdf({ path: pdfPath, format: "A4" });
      }
    }

    message += `PDF downloaded successfully for link ${i + 1}\n`;
  }

  await browser.close();

  return pdfsDir + message;
}

// export { downloadPDFs };

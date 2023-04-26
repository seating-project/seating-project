import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

async function downloadPDFs(links: string[]): Promise<string> {
  const pdfsDir = './pdfs';
  let message = '';

  try {
    await fs.mkdir(pdfsDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error;
    }
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    const docName = url.split('/')[5];
    if (docName === 'attendance') {
      const room = url.split('/')[url.split('/').length - 1];
      const pdfPath = `${pdfsDir}/${docName}_${room}_${i}.pdf`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.pdf({ path: pdfPath, format: 'A4' });
    } else if (docName === 'allotments') {
      const date= url.split('/')[url.split('/').length - 1];
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const numDate = dateObj.getDate();
      // const pdfPath = `${pdfsDir}/${docName}_${date}.pdf`;
      const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}_${i}.pdf`;
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.pdf({ path: pdfPath, format: 'A4' });
    } else if (docName === 'hallplan') {
      const date= url.split('/')[url.split('/').length - 2];
      const dateObj = new Date(date);
      const month = dateObj.toLocaleString('default', { month: 'long' });
      const numDate = dateObj.getDate();
      const gender= url.split('/')[url.split('/').length - 1];
      // const pdfPath = `${pdfsDir}/${docName}_${date}_${gender}.pdf`;

      const pdfPath = `${pdfsDir}/${docName}_${month}_${numDate}_${gender}_${i}.pdf`
      await page.goto(url, { waitUntil: 'networkidle0' });
      await page.pdf({ path: pdfPath, format: 'A4' });
    } 
    
    

    message += `PDF downloaded successfully for link ${i + 1}\n`;
  }

  await browser.close();

  return message;
}

export { downloadPDFs };

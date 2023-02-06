import { NextApiHandler } from 'next'
import puppeteer from 'puppeteer'

const Handler: NextApiHandler = async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:3000/test/', { waitUntil: 'networkidle2' })
  await page.emulateMediaType('screen')
  
  const pdfBuffer = await page.pdf({ format: 'A4', margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }, printBackground: true })
  res.status(200).send(pdfBuffer)
  await browser.close()
}

export default Handler
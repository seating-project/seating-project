import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { downloadPDFs } from '../../utils/downloadPDF';
import { NextApiResponse, NextApiRequest } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { links } = req.body;
    console.log(links);
    try {
      const message = await downloadPDFs(links);
      res.status(200).json({ message });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to download PDF files' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import chromium from "@sparticuz/chromium";

import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";

/**
 * Chromium for Puppeteer
 */
const CHROMIUM_EXECUTABLE_PATH =
  "https://github.com/Sparticuz/chromium/releases/download/v122.0.0/chromium-v122.0.0-pack.tar";

/**
 * Tailwind
 */
const TAILWIND_CDN =
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";

const getHallPlanTemplate = async () => {
  try {
    const template = await import(`@/components/hallplans/HallPlanTemplate`);
    return template.default;
  } catch (error) {
    console.error(`Error importing template: ${error as string}`);
    return null;
  }
};

export async function POST(req: NextRequest) {
  let browser;
  const ENV = process.env.NODE_ENV;

  try {
    const { exam, template, date } = (await req.json()) as {
      exam: RouterOutputs["exam"]["getExamById"];
      template: RouterOutputs["template"]["getTemplate"];
      date: string;
    };

    if (!exam || !template) {
      throw new Error("Exam or Template not found");
    }

    const departments = await api.department.getDepartments();
    const years = await api.year.getYears();
    const rooms = await api.room.getRooms();

    const hallplan = await api.allotment.createHallPlanForAll({
      examId: exam.id,
      templateId: template.id,
      date: date,
    });

    const ReactDOMServer = (await import("react-dom/server")).default;

    const HallPlanTemplate = await getHallPlanTemplate();
    if (!HallPlanTemplate) {
      throw new Error("Template not found");
    }

    const htmlTemplate = ReactDOMServer.renderToStaticMarkup(
      HallPlanTemplate({
        exam,
        template,
        date,
        hallplan,
        departments,
        years,
        rooms,
      }),
    );

    console.log("HTML Template", htmlTemplate);

    if (ENV === "production") {
      const puppeteer = await import("puppeteer-core");
      browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH),
        headless: true,
        acceptInsecureCerts: true,
      });
    } else if (ENV === "development") {
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
      throw new Error("Failed to launch browser");
    }

    const page = await browser.newPage();
    console.log("Page opened"); // Debugging log

    // Set the HTML content of the page
    await page.setContent(htmlTemplate, {
      // * "waitUntil" prop makes fonts work in templates
      waitUntil: "networkidle0",
    });
    console.log("Page content set"); // Debugging log

    // Add Tailwind CSS
    await page.addStyleTag({
      url: TAILWIND_CDN,
    });
    console.log("Style tag added"); // Debugging log

    // Add montserrat font from Google Fonts as well as other custom styles
    await page.addStyleTag({
      content: `
      @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
      body {
        font-family: 'Poppins', serif;
      }
      * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
      }
      .onepixel {
        height: 1px;
        background-color: #e2e8f0;
      }
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
        }
      }
    `,
    });

    // Generate the PDF
    const pdf: Uint8Array = await page.pdf({
      format: "a4",
      printBackground: true,
    });
    console.log("PDF generated"); // Debugging log

    for (const page of await browser.pages()) {
      await page.close();
    }

    // Close the Puppeteer browser
    await browser.close();
    console.log("Browser closed"); // Debugging log

    // Create a Blob from the PDF data
    const pdfBlob = new Blob([pdf], { type: "application/pdf" });

    const response = new NextResponse(pdfBlob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=invoice.pdf",
      },
      status: 200,
    });

    return response;
  } catch (error) {
    console.error(error);

    // Return an error response
    return new NextResponse(
      `Error generating PDF: \n${(error as Error).message}`,
      {
        status: 500,
      },
    );
  } finally {
    if (browser) {
      await Promise.race([browser.close(), browser.close(), browser.close()]);
    }
  }
}

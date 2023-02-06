import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
type props = {
  html?: React.MutableRefObject<HTMLDivElement>;
};

const GeneratePdf: React.FC<props> = ({ html }) => {
  // const generateImage = async () => {
  //   const image = await toPng(html.current, { quality: 0.95 });
  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });
  
  //   const imgHeight = html.current.offsetHeight;
  //   const pageHeight = 297;
  //   let currentPage = 1;
  //   let y = 0;
  
  //   while (y < imgHeight) {
  //     doc.addPage();
  //     y = 0;
  //     let h = imgHeight - y > pageHeight ? pageHeight : imgHeight - y;
  //     doc.addImage(image, "JPEG", 0, y, 210, h, "", "FAST");
  //     y += h;
  //     currentPage++;
  //   }
  
  //   doc.save();
  // };
  
  const generateImage = async () => {
    const image = await toPng(html.current, { quality: 0.95 });
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    doc.addImage(image, "JPEG", 0, 0, 210, 297);
    doc.save();
  };
  return (
    <div className="button-container">
      <button onClick={generateImage}>Get PDF using image</button>
      {/* <button onClick={generatePdf}>
        Get PDF as text
      </button> */}
    </div>
  );
};

export default GeneratePdf;

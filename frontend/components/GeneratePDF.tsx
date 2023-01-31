import React from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
type props = {
  html?: React.MutableRefObject<HTMLDivElement>;
};

const GeneratePdf: React.FC<props> = ({ html }) => {
  const generateImage = async () => {
    const image = await toPng(html.current, { quality: 0.95 });
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    doc.addImage(image, "JPEG", 5, 22, 350, 160);
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

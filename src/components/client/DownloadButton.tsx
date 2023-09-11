"use client";
import React from "react";

type Props = {
  createPDF: () => void;
};



const DownloadButton = ({ createPDF }: Props) => {
  return (
    <div>
      <button
        onClick={createPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadButton;

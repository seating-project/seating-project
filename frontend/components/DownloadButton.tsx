"use client";

import React from "react";

import drf from "../pages/api/axiosConfig";


type Props = {};

const DownloadButton = ({ links }) => {

  const [folderPath, setFolderPath] = React.useState("");




  async function getTemplateData() {
    try {
      const res = await drf.get("/templates/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  

  async function handleDownloadClick() {
    
    // <input type="file directory" webkitdirectory="" onChange={()=>setFolderPath} />
    
    

    console.log("LINKS I GOT", links);
    try {
      
      const response = await fetch("/api/pdf", {
        method: "POST",
        body: JSON.stringify({ links}),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        alert("PDF files downloaded successfully");
      } else {
        throw new Error("Failed to download PDF files");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to download PDF files");
    }
  }

  return (
    <button
      className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
            after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
          after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
      // onClick={downloadAllPages(["http://localhost:3000/exam/Internal%20Assessment%20III"])}
      onClick={handleDownloadClick}
    >
      Download All
    </button>
  );
};

export default DownloadButton;

"use client";

import React from "react";

import drf from "../pages/api/axiosConfig";


type Props = {
  links: string[];
  
};

const DownloadButton = ({ links }: Props) => {

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
      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      // onClick={downloadAllPages(["http://localhost:3000/exam/Internal%20Assessment%20III"])}
      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 transition hover:bg-gradient-to-br hover:ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-2 mb-2"
      onClick={handleDownloadClick}
    >
      Download All
    </button>
  );
};

export default DownloadButton;

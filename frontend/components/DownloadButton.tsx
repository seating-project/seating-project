"use client"

import React from 'react'
import drf from '../pages/api/axiosConfig'

type Props = {}

const DownloadButton = (props: Props) => {

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
        const links = [
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F1",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F3",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F4",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F7",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F8",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F9",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F22",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/F23",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S1",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S2",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S3",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S4",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S5",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S6",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S7",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S8",
            // // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S12",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S10",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S15",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S16",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S17",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S18",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S20",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S21",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S22",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S23",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S24",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/S26",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH1",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH2",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH3",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH4",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH5",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH6",
            // "http://"http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T2",localhost:3000/exam/End%20Semester%20Examination./attendance/EH7",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH8",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH9",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH10",
            // "http://localhost:3000/exam/End%20Semester%20Examination./attendance/EH11",

            // "http://localhost:3000/exam/End%20Semester%20Examination./allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination./hallplan/2023-04-18",

            // "http://localhost:3000/exam/Internal%20Assessment%20II/allotments/2023-04-18",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/hallplan/2023-04-18/boys",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/hallplan/2023-04-18/girls",
            
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T2",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T3",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T4",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T6",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T7",

            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T8",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T9",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T10",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T14",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T15",

            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T16",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T17",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T18",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T20",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/T21",
            
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/MT1",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/MT2",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/MT3",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/MT4",
            // "http://localhost:3000/exam/Internal%20Assessment%20II/attendance/MT5",

            // "http://localhost:3000/exam/End%20Semester%20Examination/allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination/hallplan/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20./allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20./hallplan/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20`/allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20`/hallplan/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20``/allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20``/hallplan/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20```/allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20```/hallplan/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20````/allotments/2023-04-18",
            // "http://localhost:3000/exam/End%20Semester%20Examination%20````/hallplan/2023-04-18",

            "http://localhost:3000/exam/End%20Semester%20Examination%20`````/allotments/2023-04-18",
            "http://localhost:3000/exam/End%20Semester%20Examination%20`````/hallplan/2023-04-18",



            


            
        ];

    
        try {
          const response = await fetch("/api/pdf", {
            method: "POST",
            body: JSON.stringify({ links }),
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
  )
}

export default DownloadButton
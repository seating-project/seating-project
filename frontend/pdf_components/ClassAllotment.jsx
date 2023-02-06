"use client";

import Image from "next/image";
import { useDeptID } from "../src/store";
import React, { useRef, useEffect, useState } from "react";
import { jsPDF, HTMLOptionImage } from "jspdf";
import { toPng, toCanvas } from "html-to-image";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});
import Page from "../components/LandscapePage";

const YEARSUFFIX = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
};

const ROMAN = {
  1: "I",
  2: "II",
  3: "III",
  4: "IV",
  5: "V",
};

function ClassAllotment({
  room,
  roomArray,
  rows,
  columns,
  rangesSingle,
  exam,
  room_strength,
  single_seater,
  boys_girls_separation,
}) {
  const deptID = useDeptID.getState().dept_id_object;
  const componentRef = useRef();
  const [downloading, setDownloading] = useState(false);

  const rangesCreate = (rangesSingle) => {
    let rangesDiv = [];
    let r = [];
    let count = 0;
    for (const i in rangesSingle) {
      r.push(
        <p key={i}>
          <b>
            {i.split(" ")[0].toUpperCase() + " " + ROMAN[rangesSingle[i][0][2]]}
          </b>{" "}
          <br />{" "}
          {rangesSingle[i][0][0] +
            " to " +
            rangesSingle[i][rangesSingle[i].length - 1][0]}
          {" - "} {rangesSingle[i].length}
        </p>
      );
      count++;
    }
    rangesDiv.push(
      <div
        key={count}
        className="flex flex-col justify-center mt-4 pt-4 text-xl"
      >
        {r}
      </div>
    );
    return rangesDiv;
  };
  const downloadPDF = async () => {
    setDownloading(true);
    const image = await toPng(componentRef.current, { quality: 0.95 });
    const doc = new jsPDF();

    doc.addImage(image, "JPEG", 5, 22, 200, 160);
    doc.save();
  };
  const create = (room, roomArray, rows) => {
    let tables = [];
    let table2 = [];
    let row = [];
    let tableCounter = 0;
    let tableIndex = 0;
    let oneTableLeave = 0;
    let snakeRow = 0;
    // console.log("ROOM ARRAY INSIDE LMAO", roomArray);
    // console.log("ROOM STRENGTH", room_strength);

    // if (single_seater) {

    //   roomArray.forEach((i)=>{
    //     if (i.length === 1 && i[0] !== 0) {
    //       if (snakeRow === 0) {
    //         row.push(
    //           <tr className="h-4" key={i}>
    //             <td
    //               className="border-2 border-black h-4 p-2"
    //               width={200}
    //               height={66}
    //             >
    //               <b>{i[0][1].toUpperCase()}</b>{" "}
    //               {  " " + i[0][0]}
    //             </td>
    //           </tr>
    //         );
    //         tableCounter++;
    //       } else if (snakeRow === 1) {
    //         row.unshift(
    //           <tr className="h-4" key={i}>
    //             <td
    //               className="border-2 border-black h-4 p-2"
    //               width={200}
    //               height={66}
    //             >
    //               <b>{i[0][1].toUpperCase()}</b>{" "}
    //               {  " " + i[0][0]}
    //             </td>
    //           </tr>
    //         );
    //         tableCounter++;
    //       }
    //     }
    //   })

    // } else {

    roomArray.forEach((i) => {
      if (i.length === 2 && i[0] !== 0 && i[1] !== 0) {
        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td className="border-2 border-black h-4 p-2" height={66}></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          } else if (tableIndex != 3 && snakeRow === 1) {
            row.unshift(
              <tr className="h-4" key={i}>
                <td className="border-2 border-black h-4 p-2" height={66}></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          }
        }

        if (snakeRow === 0) {
          row.push(
            <tr className="h-4" key={i}>
              <td
                className="border-2 border-black h-4 p-2"
                width={200}
                height={66}
              >
                <b>{i[0][1].toUpperCase()}</b>{" "}
                {  " " + i[0][0]}{" "}
                <br /> <b>{i[1][1].toUpperCase()}</b>{" "}
                {" " + i[1][0]}
              </td>
            </tr>
          );
          tableCounter++;
        } else if (snakeRow === 1) {
          row.unshift(
            <tr className="h-4" key={i}>
              <td
                className="border-2 border-black h-4 p-2"
                width={200}
                height={66}
              >
                <b>{i[0][1].toUpperCase()}</b>{" "}
                {  " " + i[0][0]}{" "}
                <br /> <b>{i[1][1].toUpperCase()}</b>{" "}
                {" " + i[1][0]}
              </td>
            </tr>
          );
          tableCounter++;
        }
      } else {
        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                ></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          } else if (tableIndex != 3 && snakeRow === 1) {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                ></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          }
        }
        if (i[0] === 0) {
          if (snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  {" "}
                  <b>{i[1][1].toUpperCase()}</b>{" "}
                  {" " + i[1][0]}
                  <br />{" "}
                </td>
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  {" "}
                  <b>{i[1][1].toUpperCase()}</b>{" "}
                  {" " + i[1][0]}
                  <br />{" "}
                </td>
              </tr>
            );
            tableCounter++;
          }
        } else if (i[1] === 0) {
          if (snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  <b>{i[0][1].toUpperCase()}</b>{" "}
                  {  " " + i[0][0]}
                  <br />{" "}
                </td>
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  <b>{i[0][1].toUpperCase()}</b>{" "}
                  {  " " + i[0][0]}
                  <br />{" "}
                </td>
              </tr>
            );
            tableCounter++;
          }
        } else {
          if (snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  {" "}
                </td>
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2"
                  width={200}
                  height={66}
                >
                  {" "}
                </td>
              </tr>
            );
            tableCounter++;
          }
        }
        // console.log("TABLE COUNTER", tableCounter);
        // console.log("ROW LENGTH", row.length);
      }
      if (row.length === columns) {
        if (snakeRow === 1) {
          // row.reverse();
          row.unshift(row[row.length - 1]);
          row.pop();
        }
        table2.push(
          <table key={i} className="border-2 border-black text-lg ">
            <thead>
              <tr key={i} className="h-16 text-4xl">
                <th className="border border-black text-xl p-2">
                  {"Row " + (tableIndex + 1)}
                </th>
              </tr>
            </thead>
            <tbody>{row}</tbody>
          </table>
        );
        row = [];
        tableCounter = 0;
        tableIndex++;
        oneTableLeave = 0;
        if (snakeRow === 0) {
          snakeRow = 1;
        } else {
          snakeRow = 0;
        }
      }
    });
    // }

    if (row.length > 0) {
      table2.push(
        <table className="border-2 border-black min-h-[900px] text-lg ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black text-xl p-2">
                {"Row " + (tableIndex + 1)}
              </th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      );
      oneTableLeave = 0;
    }

    if (table2.length > 0) {
      tables.push(
        <div
          key={table2}
          className="flex flex-row  min-h-[900px] overflow-x-auto "
        >
          {table2}
        </div>
      );
    }
    return tables;
  };
  return (
    <>
      <a href="/api/pdf" download="class_allotment.pdf" className="downloadBtn">
        Download PDF
      </a>
      <Page>
        <div className="flex flex-row mt-4 justify-center items-center">
          <div className="w-2/5 m-4 items-center">
            <Image
              src="/cit.png"
              width={300}
              height={300}
              alt="dasd"
              className="object-contain"
            />
            <h1 className="text-2xl text-center mt-4 font-bold">
              {" "}
              {exam.toUpperCase()}{" "}
            </h1>
            <h1 className="text-2xl text-center mt-4 ">
              {" "}
              Room: <b>{room}</b>{" "}
            </h1>
            {rangesCreate(rangesSingle)}
            <table className="border-2 border-black text-lg m-4" >
              <thead></thead>
              <tbody>
                <tr >
                  <th className="border-2 border-black text-xl p-2"> Date </th>
                  <td className="border-2 border-black text-xl p-2"> 13/02/2022</td>
                </tr>
                <tr>
                  <th className="border-2 border-black text-xl p-2"> Session </th>
                  <td className="border-2 border-black text-xl p-2"> AN</td>
                </tr>
                <tr>
                  <th className="border-2 border-black text-xl p-2"> Time </th>
                  <td className="border-2 border-black text-xl p-2"> 12:00 PM to 3:00 PM </td>
                </tr>
              </tbody>
            </table>
            {/* <p> Date: 13/02/2023  </p>
            <p> Session: AN </p>
            <p> Time:  </p> */}
            {/* {!downloading && <button onClick={downloadPDF}>Download PDF</button>} */}
          </div>
          <div className="flex flex-col m-4  w-3/5">
            {create(room, roomArray, rows)}
            {/* <GeneratePDF html={componentRef} /> */}
          </div>
        </div>
      </Page>
    </>
  );
}
export default ClassAllotment;

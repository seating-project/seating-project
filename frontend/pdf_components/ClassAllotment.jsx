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

const YEARSUFFIX = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
};

function ClassAllotment({
  room,
  roomArray,
  rows,
  columns,
  rangesSingle,
  exam,
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
          <b>{i.toUpperCase() + YEARSUFFIX[rangesSingle[i][0][2]] + " Year"}</b>{" "}
          <br />{" "}
          {rangesSingle[i][0][0] +
            " to " +
            rangesSingle[i][rangesSingle[i].length - 1][0]}
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
    console.log("ROOM ARRAY INSIDE LMAO", roomArray);
    
    roomArray.forEach((i) => {
      console.log("I", i);

      if ((i.length === 2) && (i[0] !== 0) && (i[1] !== 0)) {
        row.push(
          <tr className="h-4" key={i}>
            <td className="border-2 border-black h-4 p-2">
              <b>{i[0][1].toUpperCase()}</b>{" "}
              {" " +
                i[0][2] +
                YEARSUFFIX[i[0][2]] +
                " Year " +
                i[0][0].toString().slice(-3)}{" "}
              <br /> <b>{i[1][1].toUpperCase()}</b>{" "}
              {" " +
                i[1][2] +
                YEARSUFFIX[i[1][2]] +
                " Year " +
                i[1][0].toString().slice(-3)}
            </td>
          </tr>
        );
      } else {
        if (i[0] === 0) {
          row.push(
            <tr className="h-4" key={i}>
              <td className="border-2 border-black h-4 p-2">
                {" "}
                <b>{i[1][1].toUpperCase()}</b>{" "}
                {i[1][2] +
                  YEARSUFFIX[i[1][2]] +
                  " Year " +
                  i[1][0].toString().slice(-3)}
                <br/>{" "}
              </td>
            </tr>
          );
        } else if (i[1] === 0) {
          row.push(
            <tr className="h-4" key={i}>
              <td className="border-2 border-black h-4 p-2">
                <b>{i[0][1].toUpperCase()}</b>{" "}
                {" " +
                  i[0][2] +
                  YEARSUFFIX[i[0][2]] +
                  " Year " +
                  i[0][0].toString().slice(-3)}
                <br/>{" "}
              </td>
            </tr>
          );
        } else {
          row.push(
            <tr className="h-4" key={i}>
              <td className="border-2 border-black h-4 p-2">
              </td>
            </tr>
          )
        }
      }
      if (row.length === columns) {
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
        tableCounter++;
        tableIndex++;
      }
    });

    if (row.length > 0) {
      table2.push(
        <table className="border-2 border-black min-h-[700px] ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black">
                {"Row " + (tableIndex + 1)}
              </th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      );
    }

    if (table2.length > 0) {
      tables.push(
        <div
          key={table2}
          className="flex flex-row justify-center items-center min-h-[700px] overflow-x-auto "
        >
          {table2}
        </div>
      );
    }
    return tables;
  };
  return (
    <div ref={componentRef} className="flex flex-row mt-4">
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
        {/* {!downloading && <button onClick={downloadPDF}>Download PDF</button>} */}
      </div>
      <div className="flex flex-col m-4 justify-center items-center w-3/5">
        {create(room, roomArray, rows)}
        <GeneratePDF html={componentRef} />
      </div>
    </div>
  );
}
export default ClassAllotment;

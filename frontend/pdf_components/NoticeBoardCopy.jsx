"use client";

import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
const GeneratePDF = dynamic(() => import("../components/GeneratePDF"), {
  ssr: false,
});
import Page from "../components/PotraitPage";
import styles from "../styles/NoticeBoardCopy.module.css";

const YEARSUFFIX = {
  1: "st",
  2: "nd",
  3: "rd",
  4: "th",
};

const NoticeBoardCopy = ({ ranges, exam }) => {
  const componentRef = useRef();
  let dept_and_their_ranges = {};
  Object.keys(ranges).forEach((k) => {
    console.log("ROOMIE", k);
    Object.keys(ranges[k]).forEach((key1) => {
      let dept = key1;
      let roomie = k;
      if (dept_and_their_ranges[dept]) {
        let obj = {};
        obj[roomie] = ranges[roomie][key1];
        dept_and_their_ranges[dept].push(obj);
      } else {
        let obj1 = {};
        obj1[roomie] = ranges[roomie][key1];
        dept_and_their_ranges[dept] = [obj1];
      }
    });
  });
  // Sorting the object
  let sorted = {};
  Object.keys(dept_and_their_ranges).sort().reduce(function (r, k) {
    return sorted[k] = dept_and_their_ranges[k];
  }, {});
  dept_and_their_ranges = sorted;

  console.log("DEPT SPECIFIC STUFF", dept_and_their_ranges);
  console.log("DEPT SPECIFIC ONLY CSE", dept_and_their_ranges["cse 2"]);

  const roomRanges = (deptRange) => {
    let r = [];
    let codeFirst = [];
    let codeLast = [];
    let code1 = [];
    let c = 1;
    let sed = [];

    console.log("DEPT", deptRange);
    console.log("FULL STUFF", dept_and_their_ranges[deptRange]);

    sed.push(
      <tr className="font-bold text-xl p-2">
        <td colSpan={5} className="p-2 text-center bg-screen">
          Branch: {deptRange.toUpperCase() + YEARSUFFIX[deptRange.slice(-1)]}{" "}
          Year
        </td>
      </tr>
    );
    for (let i in dept_and_their_ranges[deptRange]) {
      r = [];
      console.log("ROOM", Object.keys(dept_and_their_ranges[deptRange][i])[0]);
      console.log(
        "Start",
        Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]
      );
      console.log(
        "End",
        Object.entries(dept_and_their_ranges[deptRange][i])[0][1][
          Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length - 1
        ][0]
      );
      r.push(
        <td key={"1" + c} className="border-2 p-2 text-center">
          {c++}
        </td>
      );
      r.push(
        <td key={"2" + c} className="border-2 p-2 text-center">
          {Object.keys(dept_and_their_ranges[deptRange][i])[0]}
        </td>
      );
      r.push(
        <td key={"3" + c} className="border-2 p-2 text-center">
          {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]}
        </td>
      );
      r.push(
        <td key={"4" + c} className="border-2 p-2 text-center">
          {
            Object.entries(dept_and_their_ranges[deptRange][i])[0][1][
              Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length -
                1
            ][0]
          }
        </td>
      );
      r.push(
        <td key={"5" + c} className="border-2 p-2 text-center">
          {Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length}
        </td>
      );
      sed.push(
        <tr key={c} className={styles.unbreak}>
          {r}
        </tr>
      );
    }
    return sed;
  };
  const dept1 = ["cse 1", "it 1", "aids 1"]
  console.log("EXAM", exam)
  return (
    <>
      <a href="/api/pdf" download="notice_board_copy.pdf" className="downloadBtn">
        Download PDF
      </a>
      <Page>
        <div
          className="items-center justify-center"
          ref={componentRef}
        >
          {/* <GeneratePDF html={componentRef}/> */}
          <div className="flex flex-col items-center justify-center p-4">
            <Image src="/citlogo.png" alt="logo" width={600} height={680} />
            <h1 className="text-4xl font-semibold p-4">{exam}</h1>
            <h1 className="text-4xl font-semibold p-4">Main Building</h1>
          </div>
          {/* <div className="flex flex-col justify-center p-4">
            <p> <b>EH1 - EH10</b>   : Block A - First Floor</p>
            <p> <b>EH11 - EH20</b>  : Block A - Ground Floor</p>
            <p> <b>EH21 - EH27</b>  : Block B - First Floor</p>
          </div> */}
          <div className="ml-4">
            <table className="border-2 " width={700}>
              <thead>
                <tr>
                  <th className="border-2 p-4" rowSpan={2}>
                    S. No
                  </th>
                  <th className="border-2 p-4" rowSpan={2}>
                    Room
                  </th>
                  <th className="border-2 p-4" colSpan={2}>
                    Register No
                  </th>
                  <th className="border-2 p-4" rowSpan={2}>
                    Total
                  </th>
                </tr>
                <tr>
                  <th className="border-2 p-4">From</th>
                  <th className="border-2 p-4">To</th>
                </tr>
              </thead>
              
                {Object.keys(dept_and_their_ranges).map((dept) => {
                  if (dept1.includes(dept)){
                    console.log("DEPT", dept)
                  return <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>;
                  }
                })}
                {/* {roomRanges('cse 2') } */}
              
            </table>
          </div>
        </div>
      </Page>
      {/* <Page>

      </Page> */}
        {/* <Page>
        <div
            className="items-center justify-center"
            ref={componentRef}
          >
            
            <div className="flex flex-col items-center justify-center p-4">
              <Image src="/citlogo.png" alt="logo" width={600} height={680} />
              <h1 className="text-4xl font-semibold p-4">{exam}</h1>
            </div>
            <div className="ml-4">
              <table className="border-2 " width={700}>
                <thead>
                  <tr>
                    <th className="border-2 p-4" rowSpan={2}>
                      S. No
                    </th>
                    <th className="border-2 p-4" rowSpan={2}>
                      Room
                    </th>
                    <th className="border-2 p-4" colSpan={2}>
                      Register No
                    </th>
                    <th className="border-2 p-4" rowSpan={2}>
                      Total
                    </th>
                  </tr>
                  <tr>
                    <th className="border-2 p-4">From</th>
                    <th className="border-2 p-4">To</th>
                  </tr>
                </thead>
                
                  {Object.keys(dept_and_their_ranges).map((dept) => {
                    if (!(dept1.includes(dept))){
                    return <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>;
                    }
                  })}
                
              </table>
            </div>
          </div>
        </Page> */}
    </>
  );
};

export default NoticeBoardCopy;

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

const FLOORS = {
  F: "First Floor",
  S: "Second Floor",
  T: "Third Floor",
  MT: "Third Floor",
  EH: "New Building",
};

const PGDEPT = {
  "ae 1": "Applied Electronics",
  "cad/cam 1": "CAD/CAM",
  "csem 1": "Computer Science and Engineering (PG)",
};

const ROOMNO = {};

for (let i = 1; i <= 10; i++) {
  ROOMNO[i] = "Block A - First Floor";
}
for (let i = 11; i <= 20; i++) {
  ROOMNO[i] = "Block A - Ground Floor";
}
for (let i = 21; i <= 27; i++) {
  ROOMNO[i] = "Block B - First Floor";
}

const REG = new RegExp("(?<=\\D)(?=\\d)|(?<=\\d)(?=\\D)");

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
  Object.keys(dept_and_their_ranges)
    .sort()
    .reduce(function (r, k) {
      return (sorted[k] = dept_and_their_ranges[k]);
    }, {});
  dept_and_their_ranges = sorted;

  // console.log("DEPT SPECIFIC STUFF", dept_and_their_ranges);
  // console.log("DEPT SPECIFIC ONLY CSE", dept_and_their_ranges["cse 2"]);

  let totalTotalCount = 0;
  const roomRanges = (deptRange) => {
    let r = [];
    let codeFirst = [];
    let codeLast = [];
    let code1 = [];
    let c = 1;
    let sed = [];
    let totalCount = 0;

    console.log("DEPT", deptRange);
    console.log("FULL STUFF", dept_and_their_ranges[deptRange]);
    // Sort the array of objects
    dept_and_their_ranges[deptRange].sort((a, b) => {
      // console.log("A", a)
      // console.log("B", b)
      let a1 = Object.entries(a)[0][1][0][0];
      let b1 = Object.entries(b)[0][1][0][0];
      // console.log("A1", a1.slice(-3))
      // console.log("B1", b1)
      return parseInt(a1.slice(-3)) - parseInt(b1.slice(-3));
    });
    console.log("SORTED", dept_and_their_ranges[deptRange]);
    sed.push(
      <tr className="font-bold text-xl p-2">
        <td colSpan={5} className="p-2 text-center bg-light-blue">
          Branch:{" "}
          {deptRange.includes("ae") ||
          deptRange.includes("cad/cam") ||
          deptRange.includes("csem")
            ? PGDEPT[deptRange] +
              " " +
              deptRange.slice(-1) +
              YEARSUFFIX[deptRange.slice(-1)]
            : deptRange.toUpperCase() + YEARSUFFIX[deptRange.slice(-1)]}{" "}
          Year
        </td>
      </tr>
    );
    // console.log("MAAME", dept_and_their_ranges[deptRange])

    for (let i in dept_and_their_ranges[deptRange]) {
      if (deptRange=="Ph.D 1") {
        r = [];
        console.log("ROOM now", Object.keys(dept_and_their_ranges[deptRange][i])[0]);
        console.log(
          "Start",
          Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]
        );
        console.log(
          "End",
          Object.entries(dept_and_their_ranges[deptRange][i])[0][1][ Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length - 1][0]
        );
        r.push(
          <td key={"1" + c} className="border-2 p-2 text-center">
            {c++}
          </td>
        );
        r.push(
          <td key={"2" + c} className="border-2 p-2 text-center">
            <b className="text-xl">
              {Object.keys(dept_and_their_ranges[deptRange][i])[0]}
            </b>
          </td>
        );
        r.push(
          <td key={"3" + c} className="border-2 p-2 text-center" colSpan={2}>
            <b className="text-lg">
              {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]}{", "}
              {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][1][0]}{", "}
              {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][2][0]} 
            </b>
          </td>
        );
        r.push(
          <td key={"5" + c} className="border-2 p-2 text-center">
            {Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length}
          </td>
        );
        
      } else {
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
          <b className="text-xl">
            {Object.keys(dept_and_their_ranges[deptRange][i])[0]}
          </b>
          <br />
          {/* {FLOORS[Object.keys(dept_and_their_ranges[deptRange][i])[0].split(REG)[0]]} */}
          {Object.keys(dept_and_their_ranges[deptRange][i])[0].includes("EH")
            ? ROOMNO[
                Object.keys(dept_and_their_ranges[deptRange][i])[0].split(
                  REG
                )[1]
              ]
            : FLOORS[
                Object.keys(dept_and_their_ranges[deptRange][i])[0].split(
                  REG
                )[0]
              ]}
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

      }
      
      totalCount += Object.entries(dept_and_their_ranges[deptRange][i])[0][1]
        .length;
      totalTotalCount += Object.entries(
        dept_and_their_ranges[deptRange][i]
      )[0][1].length;
      sed.push(
        <tr key={c} className={styles.unbreak}>
          {r}
        </tr>
      );
    }
    sed.push(
      <tr key={c + 1} className={styles.unbreak}>
        <td colSpan={4} className="border-2 p-2 text-center">
          <b>Total Students</b>
        </td>
        <td className="border-2 p-2 text-center">
          <b>{totalCount}</b>
        </td>
      </tr>
    );
    totalCount = 0;

    return sed;
  };

  const printPage = () => {
    console.log("PRINTTT");
    print();
  };
  const dept1 = ["cse 1", "it 1", "aids 1"];
  const pgdept = ["ae 1", "cad/cam 1", "csem 1"];
  const phddept = ["Ph.D 1"];
  // console.log("EXAM", exam);
  return (
    <>
      {/* <a href="/api/pdf" download="notice_board_copy.pdf" className="downloadBtn">
        Download PDF
      </a> */}
      {/* <button onClick={printPage} className="downloadBtn">
        Print/Save
      </button> */}
      <Page>
        <div className="items-center justify-center" ref={componentRef}>
          {/* <GeneratePDF html={componentRef}/> */}
          {/* <div className="flex flex-col items-center justify-center p-4">
            <Image src="/citlogo.png" alt="logo" width={600} height={680} />
            <h1 className="text-2xl font-semibold p-1">{exam}</h1>
            <h1 className="text-2xl font-semibold p-1">
              Hall Arrangement - 15/02/2023
            </h1>
            <h1 className="text-2xl font-semibold p-1">Main Building</h1>
          </div> */}
          {/* <div className="flex flex-col justify-center p-4">
            <p> <b>EH1 - EH10</b>   : Block A - First Floor</p>
            <p> <b>EH11 - EH20</b>  : Block A - Ground Floor</p>
            <p> <b>EH21 - EH27</b>  : Block B - First Floor</p>
          </div> */}
          {/* <Image src="/citlogo.png" alt="logo" width={600} height={680} /> */}
          <div className="ml-4">
            <table className=" " width={700}>
              {/* <thead>
                
              </thead> */}
              <thead className="justify-center items-center text-center">
                <tr>
                  {/* <Image
                      src="/citlogo.png"
                      alt="logo"
                      width={600}
                      height={680}
                    /> */}
                  {/* <th>
                    <img src="/citlogo.png" alt="logo" width={600} height={680}/>
                    </th> */}
                </tr>
                <tr className="border-2">
                  <th colSpan={5}>
                    <h1 className="text-2xl font-semibold p-1">{exam}</h1>
                  </th>
                </tr>
                <tr className="border-2">
                  <th colSpan={5}>
                    {" "}
                    <h1 className="text-2xl font-semibold p-1">
                      Hall Arrangement - 23/02/2023 (AN)
                    </h1>{" "}
                  </th>
                </tr>
                <tr className="border-2">
                  <th colSpan={5}>
                    {/* <h1 className="text-2xl font-semibold p-1">New Building (Block A and B)</h1> */}
                    <h1 className="text-2xl font-semibold p-1">Main Building</h1>
                  </th>
                </tr>
                <tr>
                  <th className="border-2 p-4" rowSpan={2}>
                    S. No
                  </th>
                  <th className="border-2 p-4" rowSpan={2}>
                    Hall No
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

              <tbody>
                <tr>
                  <td colSpan={5} className="border-2 p-2 text-center text-2xl">
                    <b>UG Students</b>
                  </td>
                </tr>
              </tbody>
              {Object.keys(dept_and_their_ranges).map((dept) => {
                if (
                  dept1.includes(dept) &&
                  !pgdept.includes(dept) &&
                  !phddept.includes(dept)
                ) {
                  console.log("DEPT", dept);
                  return (
                    <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>
                  );
                }
              })}
              {/* <tbody>
                <tr>
                  <td colSpan={5} className="border-2 p-2 text-center text-2xl">
                    <b>PG Students</b>
                  </td>
                </tr>
              </tbody>
              {Object.keys(dept_and_their_ranges).map((dept) => {
                if (pgdept.includes(dept)) {
                  console.log("DEPT", dept);
                  return (
                    <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>
                  );
                }
              })}
              <tbody>
                <tr>
                  <td colSpan={5} className="border-2 p-2 text-center text-2xl">
                    <b>Ph.D Students</b>
                  </td>
                </tr>
              </tbody>
              {Object.keys(dept_and_their_ranges).map((dept) => {
                if (phddept.includes(dept)) {
                  console.log("DEPT", dept);
                  return (
                    <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>
                  );
                }
              })} */}
              <tbody className={styles.unbreak}>
                <tr>
                  <td colSpan={4} className="border-2 p-2 text-center text-2xl">
                    <b>Overall Students</b>
                  </td>
                  <td className="border-2 p-2 text-center text-2xl">
                    <b>{totalTotalCount}</b>
                  </td>
                </tr>
              </tbody>
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

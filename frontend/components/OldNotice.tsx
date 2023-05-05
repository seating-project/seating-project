"use client";

import Page from "./PotraitPage";
import styles from "../styles/Notice.module.css";
import Image from "next/image";
import { template } from "babel-core";

interface Floor {
  boys: Object;
  girls: Object;
}

interface MultiPurposeRoom {
  boys: Object;
  girls: Object;
}

interface Building {
  [key: string]: Floor[] | MultiPurposeRoom[];
}

interface College {
  "New Building": Building | Object;
  "Main Building": Building | Object;
}

type Props = {
  building: string;
  gender: string;
  exam: string;
  date: string;
  ranges: College;
  logoUrl: string;
  bgsep: boolean;
};

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

const OldNotice = (props: Props) => {
  console.log("please brudha please",props.ranges["New Building"]);
  console.log("TRUE AH", props.bgsep);
  let dept_and_their_ranges = {};

  
  if (props.bgsep == true) {

  
  Object.keys(props.ranges[props.building]).forEach((room) => {
    console.log("ROOM", room);
    Object.keys(props.ranges[props.building][room]).forEach((g) => {
      console.log("Gender", g);
      Object.keys(props.ranges[props.building][room][g]).forEach((dept) => {
        console.log(dept);
        if (g == props.gender) {
          if (dept_and_their_ranges[dept]) {
            let obj = {};

            obj[room] = props.ranges[props.building][room][g][dept];
            console.log("OBJ", obj);
            dept_and_their_ranges[dept].push(obj);
          } else {
            let obj = {};
            obj[room] = props.ranges[props.building][room][g][dept];
            console.log("O BJ 2", obj);
            dept_and_their_ranges[dept] = [obj];
          }
        }
      });
    });
  });
  } else {

  Object.keys(props.ranges[props.building]).forEach((room) => {
    console.log("ROOM", room);
    Object.keys(props.ranges[props.building][room]).forEach((dept) => {
      console.log("DEPT", dept);
      if (dept_and_their_ranges[dept]) {
        let obj = {};

        obj[room] = props.ranges[props.building][room][dept];
        console.log("OBJ", obj);
        dept_and_their_ranges[dept].push(obj);
      }
      else {
        let obj = {};
        obj[room] = props.ranges[props.building][room][dept];
        console.log("O BJ 2", obj);
        dept_and_their_ranges[dept] = [obj];
      }
    });
  });

}

  

  //
  console.log("DEPT AND THEIR RANGES", dept_and_their_ranges);

  let sorted = {};
  Object.keys(dept_and_their_ranges)
    .sort()
    .reduce(function (r, k) {
      return (sorted[k] = dept_and_their_ranges[k]);
    }, {});
  dept_and_their_ranges = sorted;

  console.log(dept_and_their_ranges);
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
    // dept_and_their_ranges[deptRange].sort((a, b) => {
    //   // console.log("A", a)
    //   // console.log("B", b)
    //   let a1 = Object.entries(a)[0][1][0][0];
    //   let b1 = Object.entries(b)[0][1][0][0];
    //   // console.log("A1", a1.slice(-3))
    //   // console.log("B1", b1)
    //   return parseInt(a1.slice(-3)) - parseInt(b1.slice(-3));
    // });
    console.log("SORTED", dept_and_their_ranges[deptRange]);
    sed.push(
      <tr className="font-bold text-xl p-2">
        {props.bgsep == true ? (
          <td 
          colSpan={3} 
          className="p-2 text-center bg-light-blue border-black border-2  ">
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
        ) : (
        <td 
          colSpan={5} 
          className="p-2 text-center bg-light-blue border-black border-2  ">
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
        )}
      </tr>
    );
    // console.log("MAAME", dept_and_their_ranges[deptRange])

    for (let i in dept_and_their_ranges[deptRange]) {
      if (deptRange == "Ph.D 1") {
        r = [];
        console.log(
          "ROOM now",
          Object.keys(dept_and_their_ranges[deptRange][i])[0]
        );
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
          <td key={"1" + c} className="border-2 p-2 text-center  border-black   ">
            {c++}
          </td>
        );
        // r.push(
        //   <td key={"2" + c} className="border-2 p-2 text-center">
        //     <b className="text-xl">
        //       {Object.keys(dept_and_their_ranges[deptRange][i])[0]}
        //     </b>
        //   </td>
        // );
        // r.push(
        //   <td key={"3" + c} className="border-2 p-2 text-center" colSpan={2}>
        //     <b className="text-lg">
        //       {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]}{", "}
        //       {/* {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][1][0]}{", "}
        //       {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][2][0]}{", "} */}

        //     </b>
        //   </td>
        // );
        r.push(
          <td key={"5" + c} className="border-2 p-2 text-center  border-black ">
            {Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length}
          </td>
        );
      } else {
        r = [];
        console.log(
          "ROOM",
          Object.keys(dept_and_their_ranges[deptRange][i])[0]
        );
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
          <td key={"1" + c} className="border-2 p-2 text-center  border-black ">
            {c++}
          </td>
        );
        r.push(
          <td key={"2" + c} className="border-2 p-2 text-center  border-black   ">
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
        if (!props.bgsep) {
        r.push(
          <td key={"3" + c} className="border-2 p-2 text-center border-black">
            {Object.entries(dept_and_their_ranges[deptRange][i])[0][1][0][0]}
          </td>
        );
        r.push(
          <td key={"4" + c} className="border-2 p-2 text-center border-black">
            {
              Object.entries(dept_and_their_ranges[deptRange][i])[0][1][
                Object.entries(dept_and_their_ranges[deptRange][i])[0][1].length -
                  1
              ][0]
            }
          </td>
        );
        }
        r.push(
          <td key={"5" + c} className="border-2 p-2 text-center  border-black ">
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
        {props.bgsep ? (
          <td colSpan={2} className="border-2 p-2 text-center  border-black ">
          <b>Total Students</b>
        </td>
        ) : (
          <td colSpan={4} className="border-2 p-2 text-center  border-black ">
          <b>Total Students</b>
        </td>)}
        
        <td className="border-2 p-2 text-center  border-black ">
          <b>{totalCount}</b>
        </td>
      </tr>
    );
    totalCount = 0;

    return sed;
  };

  return (
    <>
      <Page>
        <div className="items-center justify-center">
          <div className="ml-4">
            <table width={700} className="border-black">
              <thead>
                <tr >
                  <th colSpan={5}>
                    <Image
                      src={`data:image/png;base64,${props.logoUrl}`}
                      width={400}
                      height={400}
                      alt="dasd"
                      className="object-contain pr-4"
                    />{" "}
                  </th>
                </tr>
                <tr className="border-2 border-black">
                  <th colSpan={5}>
                    <h1 className="text-2xl font-semibold p-1">{props.exam}</h1>
                  </th>
                </tr>
                <tr className="border-2 border-black">
                  <th colSpan={5}>
                    {" "}
                    <h1 className="text-2xl font-semibold p-1">
                      Hall Arrangement - { " "}
                      {props.date}  {" "}
                      {/* to {"2023-04-21" }  */}
                      (FN)  {" "}
                      {/* ___ */}
                      {props.bgsep && (
                      props.gender.toUpperCase())}
                    </h1>{" "}
                  </th>
                </tr>
                <tr className="border-2 border-black">
                  {/* <th colSpan={5}>
                    <h1 className="text-2xl font-semibold p-1">New Building (Block A and B)</h1>
                    <h1 className="text-2xl font-semibold p-1">
                      {props.building}
                      Main Building
                    </h1>
                  </th> */}
                </tr>
                <tr className="border-2 border-black">
                  <th className="border-2 p-4 border-black" rowSpan={2}>
                    S. No
                  </th>
                  <th className="border-2 p-4 border-black" rowSpan={2}>
                    Hall No
                  </th>
                  {!props.bgsep ? (
                  <th className="border-2 p-4 border-black" colSpan={2}>
                    Register No
                  </th>
                  ) : null}
                  <th className="border-2 p-4 border-black" rowSpan={2}>
                    Total
                  </th>
                </tr>
                {!props.bgsep ? (
                  
                
                <tr>
                  <th className="border-2 p-4 border-black">From</th>
                  <th className="border-2 p-4 border-black">To</th>
                </tr>) : null }
              </thead>
              
              <tbody>
                <tr>
                  <td colSpan={5} className="border-2 p-2 text-center text-2xl border-black">
                    <b>UG Students</b>
                  </td>
                </tr>
              </tbody>
              {Object.keys(dept_and_their_ranges).map((dept) => {
                return (
                  <tbody className={styles.unbreak}>{roomRanges(dept)}</tbody>
                );
              })}
              <tbody className={styles.unbreak}>
                <tr>
                  {props.bgsep ? (
                    <td colSpan={2} className="border-2 p-2 text-center text-2xl  border-black  ">
                    <b>Overall Students</b>
                  </td>) : (
                    <td colSpan={4} className="border-2 p-2 text-center text-2xl  border-black  ">
                    <b>Overall Students</b>
                  </td>)}
                  
                  <td className="border-2 p-2 text-center text-2xl  border-black  ">
                    <b>{totalTotalCount}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Page>
    </>
  );
};

export default OldNotice;

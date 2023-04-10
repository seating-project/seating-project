"use client";

import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Page from "../components/LandscapePage";

interface Template {
  template_name: string;
  number_of_rows: number;
  number_of_columns: number;
  room_strength: number;
  is_single_seater: boolean;
  is_boys_girls_separation: boolean;
  start_time: string;
  end_time: string;
  is_alternate_dept_seated: boolean;
  logo: number;
  rooms: string[];
  buildings: string[];
}

interface Departments {
  [building: string]: string[];
}

interface TimeTable {
  [dept: string]: {
    [date: string]: string;
  };
}
interface Exam {
  exam_name: string;
  from_date: string;
  to_date: string;
  departments: Departments;
  time_table: TimeTable;
  is_phd: boolean;
  is_me: boolean;
  is_years_together: boolean;
  is_departments_together: boolean;
  is_send_whatsapp_message: boolean;
  time_to_send_whatsapp_message: string | null;
  exam_template: string;
  no_of_sets: number | null;
  second_column_options: string;
  phd_room: string | null;
  me_room: string | null;
  years: string[];
  phd_students: string[];
  sets_for_which_subjects: string[];
}

interface RoomArray {
  [room: string]: Array<[Array<any>, Array<any>]>;
}

type RangeArray = {
  [gender: string]: any;
};

interface ClassAllotmentParams {
  room: string;
  date: string;
  roomArray: RoomArray;
  rangeArray: RangeArray;
  template: Template;
  exam: Exam;
  logoUrl: string | null;
}

// function ClassAllotment({
//   room: string,
//   date,
//   roomArray,
//   rangeArray,
//   template: Template,
//   exam,
//   logoUrl,
// }: any)
function ClassAllotment(params: ClassAllotmentParams) {
  const { room, date, roomArray, rangeArray, template, exam, logoUrl } = params;

  // console.log("ROOM", room);
  // console.log("DATE", date);
  // console.log("ROOM ARRAY", roomArray);
  // console.log("TEMPLATE", template);
  // console.log("EXAM", exam);
  // console.log("LOGO URL", logoUrl);
  // console.log("RANGE ARRAY", rangeArray);
  // console.log("ROOM ARRAY", roomArray);

  let dateNew: Date = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate: string = dateNew.toLocaleDateString("en-IN", options);
  // console.log(formattedDate);
  // const rangesCreate = (rangesSingle: any) => {};
  // console.log("RANGE ARRAY", rangeArray);

  const rangesCreate = (rangeArray: RangeArray) => {
    let rangesDiv: any = [];
    let r: React.ReactNode[] = [];
    let s = [];
    let count = 0;

    if (template.is_single_seater) {
      // console.log("SINGLE SEATER");
      if (template.is_boys_girls_separation) {
      } else {
      }
    } else {
      if (template.is_boys_girls_separation) {
        // console.log("RUNNING");
        let count = 0;
        Object.keys(rangeArray).map((gender: string) => {
          console.log(rangeArray[gender]);
          if (JSON.stringify(rangeArray[gender]) !== JSON.stringify({})) {
            Object.keys(rangeArray[gender]).map((dept) => {
              console.log("DEPT", dept);
              r.push(
                <div key={dept + "div"} className="">
                  <p key={dept} className="border-2 p-2 text-lg px-4">
                    {" . "}
                    {" . "}
                    {" . "}
                    <b>{dept.split(" ")[0].toUpperCase() + " "}</b>{" "}
                    <b> - {rangeArray[gender][dept].length}</b>
                    {" . "}
                    {" . "}
                    {" . "}
                  </p>
                  <div className="flex">
                    <p key={dept + 1} className="border p-2 w-full">
                      P
                    </p>
                    <p key={dept + 2} className="border p-2 w-full">
                      {" "}
                      A{" "}
                    </p>
                  </div>
                </div>
              );
              count++;
            });
          } else {
          }
        });
        rangesDiv.push(
          <div
            key={count}
            className="flex flex-row justify-center items-center  pt-4 text-xs "
          >
            {r}
          </div>
        );
      } else {
      }
      return rangesDiv;
    }

    return rangesDiv;
  };

  const create = (
    roomArray: RoomArray,
    room: string,
    template: Template,
    exam: Exam
  ) => {
    let tables = [];
    let table2 = [];
    let row = [];
    let tableCounter = 0;
    let tableIndex = 0;
    let oneTableLeave = 0;
    let snakeRow = 0;
    let endthisstuff = 0;
    let totalTables = 1;
    let temp = 0;

    // parameters we need to consider
    // 1. is_single_seater
    // 2. is_me
    // 3. is_phd

    // Pseudocode for the create of the table
    //
    //
    let room_strength = template.room_strength;
    if (!template.is_single_seater) {
      room_strength = template.room_strength / 2;
    }

    for (var i = 0; i < Object.keys(roomArray).length; i++) {
      if (
        roomArray[i].length === 2 &&
        String(roomArray[i][0]) !== "0" &&
        String(roomArray[i][1]) !== "0"
      ) {
        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td className="border-2 border-black h-4 p-2" height={66} width={190}></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          } else if (tableIndex != 3 && snakeRow === 1) {
            row.unshift(
              <tr className="h-4" key={i}>
                <td className="border-2 border-black h-4 p-2" height={66} width={190}></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          }
        }

        if (snakeRow === 0) {
          console.log("CHECK ", String(roomArray[i][0][0]).toUpperCase());
          row.push(
            <tr className="max-h-6" key={i}>
              <td
                className="border-2 border-black text-center p-2 text-sm "
                // width={220}
                // height={40}
              >
                <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                {" " + roomArray[i][0][0]} <br />{" "}
                <hr className="w-full text-black" />
                <b>{String(roomArray[i][1][1]).toUpperCase()}</b>{" "}
                {" " + roomArray[i][1][0]}
              </td>
              <td
                className="border-2 border-black text-center text-sm"
                // width={20}
              >
                <hr className="w-full text-black" />
              </td>
            </tr>
          );
          tableCounter++;
        } else if (snakeRow === 1) {
          row.unshift(
            <tr className="" key={i}>
              <td
                className="border-2 border-black text-center p-2 py-2  text-sm"
                // width={220}
                // height={40}
              >
                <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                {" " + roomArray[i][0][0]} <br /> <hr className="w-full" />
                <b>{String(roomArray[i][1][1]).toUpperCase()}</b>{" "}
                {" " + roomArray[i][1][0]}
              </td>
              <td
                className="border-2 border-black  text-center text-sm"
                width={20}
              >
                <hr className="w-full text-black" />
              </td>
            </tr>
          );
          tableCounter++;
        }
      } else {
        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            console.log("WORKING@");
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  // width={200}
                  height={50}
                ></td>
                <td className="border-2 border-black h-4 p-2 text-center"></td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          } else if (tableIndex != 3 && snakeRow === 1) {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  // width={200}
                  height={50}
                ></td>
                <td className="border-2 border-black h-4 p-2 text-center"> </td>
              </tr>
            );
            tableCounter++;
            oneTableLeave = 1;
          }
        }

        if (String(roomArray[i][0]) === "0") {
        } else if (String(roomArray[i][1]) === "0") {
          if (snakeRow === 0) {
            row.push(
              <tr className="" key={i}>
                {/* <td className="border-2 border-black  text-center" >{totalTables++}</td> */}

                <td
                  className="border-2 border-black text-sm   text-center"
                  // width={190}
                  height={50}
                >
                  <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                  {" " + roomArray[i][0][0]}
                  {/* <br />{" "} */}
                </td>
                {/* {(i[0][1].toUpperCase()!="PH.D" && i[0][1].toUpperCase()!="AE" && i[0][1].toUpperCase()!="CAD/CAM" && i[0][1].toUpperCase()!="CSEM") ? 
                <td className="border-2 border-black text-center" width={50}>{totalTables++}-<b>{set[temp]}</b></td> :
                <td className="border-2 border-black text-center" width={50}>{totalTables++}</td>}
                 */}
                <td
                  className="border-2 border-black  text-center text-xs"
                  width={20}
                >
                  {/* <hr className="w-full"/> */}
                </td>
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="" key={i}>
                {/* <td className="border-2 border-black  text-center" >{totalTables++}</td> */}

                <td
                  className="border-2 border-black text-sm text-center"
                  // width={190}
                  height={50}
                >
                  <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                  {" " + roomArray[i][0][0]}
                  {/* <br />{" "} */}
                </td>
                {/* {(i[0][1].toUpperCase()!="PH.D" && i[0][1].toUpperCase()!="AE" && i[0][1].toUpperCase()!="CAD/CAM" && i[0][1].toUpperCase()!="CSEM") ? 
                <td className="border-2 border-black text-center" width={50}>{totalTables++}-<b>{set[temp]}</b></td> :
                <td className="border-2 border-black text-center" width={50}>{totalTables++}</td>} */}

                <td
                  className="border-2 border-black  text-center text-xs"
                  width={20}
                >
                  {/* <hr className="w-full"/> */}
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
                  className="border-2 border-black h-4 p-2 text-center"
                  width={50}
                ></td>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  width={190}
                  height={50}
                >
                  {" "}
                </td>
              </tr>
            );
            if (temp == 4) {
              temp = 0;
            }
            tableCounter++;
          } else {
            row.unshift(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  width={50}
                ></td>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  width={190}
                  height={50}
                >
                  {" "}
                </td>
              </tr>
            );
            tableCounter++;
          }
        }
      }

      if (row.length === template.number_of_columns) {
        // Columns Variable
        if (snakeRow === 1 && tableIndex != 3 && room_strength != 25) {
          // console.log("ROW", row)
          row.reverse();
          // row.unshift(row[row.length - 1]);

          // row.pop();
        } else if (snakeRow === 0 && tableIndex != 3 && room_strength != 25) {
          row.reverse();
        } else if (snakeRow === 1 && tableIndex != 3 && room_strength == 25) {
          row.unshift(row[row.length - 1]);
          // row.reverse();
          row.pop();
        }
        if (tableIndex == 3 && room_strength == 25) {
          // row.reverse()
        }

        if (tableIndex == 3 && room_strength != 25) {
          row.reverse();
        }
        console.log("Here coming");
        console.log("ROOM ACTUAL LENGTH", room, Object.keys(roomArray).length);
        console.log(template.is_single_seater, room_strength, tableCounter);
        if (room_strength != 25) {
          row.reverse();
        }

        if (
          Object.keys(roomArray).length > room_strength &&
          tableCounter == template.number_of_columns &&
          room_strength == 25
        ) {
          console.log("caa");

          if (Object.keys(roomArray).length - room_strength === 2) {
            console.log("MAAMA");
            if (tableIndex === 2) {
              row.shift();
              // const value = roomArray.slice(-2)[0][0][0];
              const value =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 2]
                ][0][0][0];

              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    // width={200}
                    height={50}
                  >
                    <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                    {" " + value}
                  </td>
                  {/* <td className="border-2 border-black h-4  text-center" width={30} height={50}>{26}-<b>{set[temp]}</b></td> */}
                  <td
                    className="border-2 border-black h-4  text-center"
                    width={30}
                    height={50}
                  >
                    {26}-<b>B</b>
                  </td>
                </tr>
              );
              // setCount[set[temp++]] += 1

              // if (temp==4){
              //   temp=0
              // }
              // setCount["B"] += 1

              // if (temp==4){
              //   temp=0
              // }
            }
            if (tableIndex === 1) {
              row.shift();

              const value =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 2]
                ][0][0][0];

              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    // width={190}
                    height={50}
                  >
                    <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                    {" " + value}
                  </td>
                  {/* <td className="border-2 border-black h-4  text-center" width={50} height={50}>{27}-<b>{set[temp]}</b></td> */}
                  <td
                    className="border-2 border-black h-4  text-center"
                    width={30}
                    height={50}
                  >
                    {27}-<b>C</b>
                  </td>
                </tr>
              );
              // setCount[set[temp++]] += 1
              // if (temp==4){
              //   temp=0
              // }
              // setCount["C"] += 1

              if (temp == 4) {
                temp = 0;
              }
            }
          }
          if (Object.keys(roomArray).length - room_strength === 1) {
            console.log("Here caaaaa");
            if (tableIndex === 2) {
              row.shift();
              const value =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 1]
                ][0][0][0];

              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    // width={190}
                    height={50}
                  >
                    <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                    {" " + value}
                  </td>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    width={50}
                    height={50}
                  >
                    {/* {26}-<b>{set[temp]}</b> */}
                    {26}
                  </td>
                </tr>
              );
              // setCount[set[temp++]] += 1
              // if (temp=4){
              //   temp=0
              // }
            }
          }
        }

        if (
          Object.keys(roomArray).length > room_strength &&
          tableCounter == template.number_of_columns &&
          room_strength == 30
        ) {
          console.log("caa");
          if (Object.keys(roomArray).length - room_strength === 2) {
            //


            if (tableIndex == template.number_of_rows - 1) {
              const value1 =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 2]
                ][0][0];
              const value2 =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 2]
                ][1][0];

              const value3 =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 1]
                ][0][0];
              const value4 =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 1]
                ][1][0];

              row.push(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center text-sm"
                    width={190}
                    height={66}
                  >
                    {/* <b>{String(roomArray[Object.keys(roomArray)[Object.keys(roomArray).length - 2]][0][1]).toUpperCase()}</b>{" "} */}
                    <b>{String(roomArray[Object.keys(roomArray).length - 2][0][1]).toUpperCase()}</b>{" "}
                    {" " + value1} <br /> <hr className="w-full" />

                    
                    {String(roomArray[Object.keys(roomArray).length - 2][1][1]) == "undefined" ? (
                      null
                    ) : (
                      <b>{String(roomArray[Object.keys(roomArray).length - 2][1][1]).toUpperCase()}</b>
                    )
                     }

                    { String(roomArray[Object.keys(roomArray).length - 2][1][1]) == "undefined" ? (
                      null
                    ) : (
                      " " + value2
                    )}
                    {/* <b>{String(roomArray[i][1][1]).toUpperCase()}</b>{" "}
                    {" " + value2} <br />{" "} */}
                  </td>

                  <td
                    className="border-2 border-black h-4 p-2 text-center text-sm"
                    width={20}
                  >
                    {/* <b>{String(roomArray[Object.keys(roomArray)[Object.keys(roomArray).length - 1]][0][1]).toUpperCase()}</b>{" "} */}
                  </td>
                </tr>
              );
              tableCounter++;
              console.log("TABLE COUNTERR", tableCounter);

              row.push(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center text-sm"
                    width={190}
                    height={66}
                  >
                    {/* <b>{String(roomArray[Object.keys(roomArray)[Object.keys(roomArray).length - 2]][0][1]).toUpperCase()}</b>{" "} */}
                    <b>{String(roomArray[Object.keys(roomArray).length - 1][0][1]).toUpperCase()}</b>{" "}
                    {" " + value3} <br /> <hr className="w-full" />

                    {
                      String(roomArray[Object.keys(roomArray).length - 1][1][1]) == "undefined" ? (
                        null
                      ) : (
                        <b>{String(roomArray[Object.keys(roomArray).length - 1][1][1]).toUpperCase()}</b>
                      )
                    }

                    {
                      String(roomArray[Object.keys(roomArray).length - 1 ][1][1]) == "undefined" ? (
                        null
                      ) : (
                        " " + value4
                      )
                    }
{/* 
                    <b>{String(roomArray[i][1][1]).toUpperCase()}</b>{" "}
                    {" " + value4} <br />{" "} */}
                  </td>

                  <td
                    className="border-2 border-black h-4 p-2 text-center text-sm"
                    width={20}
                  >
                    {/* <b>{String(roomArray[Object.keys(roomArray)[Object.keys(roomArray).length - 1]][0][1]).toUpperCase()}</b>{" "} */}
                  </td>
                </tr>
              );
              tableCounter++;
            }
          }
          if (Object.keys(roomArray).length - room_strength === 1) {
            console.log("Here caaaaa");

            console.log(
              tableIndex,
              "is table Index and columns are",
              template.number_of_columns
            );
            if (tableIndex == template.number_of_rows - 1) {
              const value =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 1]
                ][0][0];
              const value2 =
                roomArray[
                  Object.keys(roomArray)[Object.keys(roomArray).length - 1]
                ][1][0];

              console.log(value);

              row.push(
                <tr className="h-4" key={i + "1"}>
                  <td
                    className="border-2 border-black h-4 p-2 text-center text-sm"
                    width={190}
                    height={66}
                  >
                    {/* <b>{String(roomArray[i][0][1]).toUpperCase()}</b>{" "}
                    {" " + value}
                    {value2} */}
                    <b>{String(roomArray[Object.keys(roomArray).length - 1][0][1]).toUpperCase()}</b>{" "}
                    {" " + value} <br /> <hr className="w-full" />

                    {String(roomArray[i][1][1]) == "undefined" ? (
                      null
                    ) : (
                      <b>{String(roomArray[Object.keys(roomArray).length - 1][1][1]).toUpperCase()}</b>
                    )
                      
                    }

                    {String(roomArray[i][1][1]) == "undefined" ? (
                      null
                    ) : (
                      " " + value2
                    )}


                    {/* <b>{String(roomArray[i][1][1]).toUpperCase()}</b>{" "}
                    {" " + value2} <br />{" "} */}
                  </td>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    width={50}
                  ></td>
                </tr>
              );
              tableCounter++;
            }
          }
        }

        table2.push(
          <table key={i} className="border-2 border-black text-xs p-2">
            <thead>
              <tr key={i} className=" ">
                <th className="border border-black text-lg p-2">
                  {/* {"Row " + (tableIndex + 1)} */}
                  Register No
                </th>
                <th className="border-2 border-black text-lg  p-2">
                  {/* Seat No */} P/A
                </th>
                {/* <th className="border-2 border-black text-xs ">
                  P/A
                </th> */}
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
        // if (tableIndex === template.number_of_rows) {
        // }
        // console.log("SET COUNT", setCount);
        // master_set[room] = setCount;
      }
    }
    console.log("PLEASE WORK HERE", row.length);
    if (row.length >= 3 && room != "S4") {
      for (let o = 0; o < template.number_of_columns - row.length + 1; o++) {
        row.unshift(
          <tr className="" key={o + "1"}>
            <td
              className="border-2 border-black h-4 p-2 text-center"
              // width={200}
              height={50}
            ></td>
            <td
              className="border-2 border-black h-4 p-2 text-center"
              width={30}
              height={50}
            ></td>
          </tr>
        );
      }
      console.log("COMING HERE");
      table2.push(
        <table className="border-2 border-black    text-xs ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black text-lg p-2">
                Register No
              </th>
              <th className="border-2 border-solid border-black ">
                {/* {"Row " + (tableIndex + 1)} */}
                {/* Seat No */}
                P/A
              </th>
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      );
      oneTableLeave = 0;
    }

    if (row.length > 3 && room == "EH27") {
      for (let o = 0; o < template.number_of_columns - row.length; o++) {
        row.unshift(
          <tr className="" key={o + "1"}>
            <td
              className="border-2 border-black h-4 p-2 text-center"
              // width={200}
              height={50}
            ></td>
            <td
              className="border-2 border-black h-4 p-2 text-center"
              width={30}
              height={50}
            ></td>
          </tr>
        );
      }
      console.log("COMING HERE");
      table2.push(
        <table className="border-2 border-black text-xs ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black text-xl p-2">
                Register No
              </th>
              <th className="border-2 border-solid border-black ">
                {/* {"Row " + (tableIndex + 1)} */}
                {/* Seat No */}
                P/A
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
        <div key={9} className="flex flex-row  overflow-x-auto ">
          {table2}
        </div>
      );
    }
    return tables;
  };

  return (
    <>
      <Page>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-between ">
                <Image
                  src={`data:image/png;base64,${logoUrl}`}
                  width={400}
                  height={400}
                  alt="dasd"
                  className="object-contain pr-4"
                />
                <h1 className="text-xl text-center pl-4 font-bold ml-2">
                  {" "}
                  {exam.exam_name.toUpperCase()}{" "}
                </h1>
                <h1 className="text-xl text-center pl-4 font-bold mr-4">
                  Seating Arrangement / Attendance{" "}
                  {room == "EH27" ? "(PG)" : ""}
                </h1>
              </div>
              <table
              // className={`border-2 border-black text-xs ${
              //   ((columns == 7 || columns == 6) && !single_seater) ? "" : "m-4"
              // }  text-center`}
              >
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="border-2 border-black text-sm p-2">
                      {" "}
                      Date: {formattedDate}{" "}
                    </th>
                    <th className="border-2 border-black text-sm p-2">
                      {" "}
                      Session:{" "}
                      {parseInt(template.start_time.split(":")[0]) >= 8 &&
                      parseInt(template.start_time.split(":")[0]) < 12
                        ? "FN"
                        : parseInt(template.end_time.split(":")[0]) >= 12 &&
                          parseInt(template.end_time.split(":")[0]) < 17
                        ? "AN"
                        : null}
                    </th>
                    <th className="border-2 border-black text-sm p-2">
                      {" "}
                      Time: {template.start_time.slice(0, 5)} AM to{" "}
                      {template.end_time.slice(0, 5)} AM{" "}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="  text-center m-2 border-2 rounded-md mr-4 px-4">
              <h1 className=" text-2xl text-center ">
                {" "}
                Hall: <br />
                <b className="text-4xl">{room}</b>{" "}
              </h1>
              {/* <p className="italic">{FLOORS[room.split(REG)[0]]} </p> */}
              {/* {room.includes("EH") ? (
                <p className="italic text-xs"> {ROOMNO[room.split(REG)[1]]} </p>  
              ) : console.log(room)} */}
            </div>
          </div>
          <div className="flex flex-col mt-4 justify-center w-full items-center">
            {create(roomArray, room, template, exam)}
            {/* <GeneratePDF html={componentRef} /> */}
            <div className="flex flex-row w-full">
              {rangesCreate(rangeArray)}
              {/* <div className="mx-4">{createSET(master_set, room)}</div> */}
            </div>
          </div>
          {/* {room=="EH27" ? <div className="mx-4">
            {displaySET(master_set)}</div> : null} */}
          <div className="flex justify-between">
            <p className="p-1"> Sign of the Hall Superintendent </p>
            {/* <p className="p-1"> Approved by: </p> */}
          </div>
        </div>
      </Page>
    </>
  );
}

export default ClassAllotment;

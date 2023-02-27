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

const FLOORS = {
  F: "First Floor",
  S: "Second Floor",
  T: "Third Floor",
  MT: "Third Floor",
  EH: "New Building",
};

const ROOMNO = {

}

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

function  ClassAllotment({
  room,
  date,
  roomArray,
  rows,
  columns,
  rangesSingle,
  exam,
  room_strength,
  single_seater,
  boys_girls_separation,
}) {
  date = new Date(date)
  const options = {day: '2-digit', month: '2-digit', year: 'numeric'}
  date = date.toLocaleDateString('en-IN', options)
  
  const deptID = useDeptID.getState().dept_id_object;
  const componentRef = useRef();
  const [downloading, setDownloading] = useState(false);
  console.log(room_strength);
  const rangesCreate = (rangesSingle) => {
    let rangesDiv = [];
    let r = [];
    let s = []
    let count = 0;
    for (const i in rangesSingle) {
      r.push(
        <div key={i+"div"}>
          <p key={i} className="border-2 p-2 w-1/2 min-w-[100px] px-4">
          <b>
            {i.split(" ")[0].toUpperCase() +
              " " +
              ROMAN[rangesSingle[i][0][2]] +
              " - "}
          </b>{" "}
          {/* {columns == 7 ? null : <br />} */}
          {/* {rangesSingle[i][0][0] +
            " to " +
            rangesSingle[i][rangesSingle[i].length - 1][0]} */}
          <b>{rangesSingle[i].length}</b>
          </p>
          <div className="flex">
          <p key={i + 1} className="border p-2 w-full">
          P 
        </p>
        <p key={i+2} className="border p-2 w-full"> A   </p>
        </div>
        </div>
        
        
      );
      
      
      count++;
    }
    rangesDiv.push(
      <div
        key={count}
        className="flex flex-row justify-center  pt-4 text-xs"
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
    let endthisstuff = 0;
    let totalTables = 1;

    if (!single_seater) {
      room_strength = Math.ceil(room_strength / 2);
    }
    console.log("ROOM STRENGTH", room_strength);
    console.log("COLUMN", columns);
    

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
      // if (room === "EH27" && endthisstuff===0) {
      //   columns++;
      //   endthisstuff = 1;
      // }
      if (i.length === 2 && i[0] !== 0 && i[1] !== 0) {
        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            console.log("Working")
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
            <tr className="" key={i}>
              
              <td
                className="border-2 border-black py-2 text-center text-[8px]"
                width={220}
                height={50}
              >
                <b>{i[0][1].toUpperCase()}</b> {" " + i[0][0]} <br />{" "}
                <hr className="w-full"/>
                <b>{i[1][1].toUpperCase()}</b> {" " + i[1][0]}
              </td>
              <td className="border-2 border-black py-2 text-center text-xs" width={20}>
                <hr className="w-full"/>
              </td>
            </tr>
          );
          tableCounter++;
        } else if (snakeRow === 1) {
          row.unshift(
            <tr className="" key={i}>
              
              <td
                className="border-2 border-black  text-center text-[8px]"
                width={220}
                height={40}
              >
                <b>{i[0][1].toUpperCase()}</b> {" " + i[0][0]} <br />{" "}
                <hr className="w-full"/>
                <b>{i[1][1].toUpperCase()}</b> {" " + i[1][0]}
              </td>
              <td className="border-2 border-black  text-center text-xs" width={20}>
              <hr className="w-full"/>
              </td>
            </tr>
          );
          tableCounter++;
        } 
      } else {
        if (room_strength > 25 && tableCounter == columns-1) {
          console.log("GOPAL dadwadwa", room_strength)
          if (room_strength - 25 === 1) {
            if (tableIndex===2) {
              if (tableCounter===6) {
                print("GOPAL INCOMING")
                row.push(
                  <tr className="h-4" key={i+"1"}>
                    <td
                      className="border-2 border-black h-4 p-2 text-center"
                      width={200}
                      height={66}
                    >
                      <b>{i[0][1].toUpperCase()}</b> {" " + i[0][0]}
                    </td>
                  </tr>
                )
              }
            }
          }
        }

        if (room_strength === 25 && oneTableLeave === 0) {
          if (tableIndex != 3 && snakeRow === 0) {
            console.log("WORKING@")
            row.push(
              <tr className="h-4" key={i}>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
                  // width={200}
                  height={50}
                ></td>
                <td className="border-2 border-black h-4 p-2 text-center">

                </td>
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
        if (i[0] === 0) {
          if (snakeRow === 0) {
            row.push(
              <tr className="" key={i}>
                
                <td
                  className="border-2 border-black  text-center"
                  width={200}
                  height={50}
                >
                  {" "}
                  <b>{i[1][1].toUpperCase()}</b> {" " + i[1][0]}
                  {/* <br />{" "} */}
                </td>
                <td className="border-2 border-black text-center" width={30}>{totalTables++}</td>
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="" key={i}>
                {/* <td>
                  {" "}
                </td> */}
                {/* <td className="border-2 border-black  text-center">{totalTables++}</td> */}
                
                <td
                  className="border-2 border-black  text-center"
                  width={200}
                  height={50}
                >
                  {" "}
                  <b>{i[1][1].toUpperCase()}</b> {" " + i[1][0]}
                  {/* <br />{" "} */}
                </td>

                <td className="border-2 border-black text-center" width={30}>{totalTables++}</td>
              </tr>
            );
            tableCounter++;
          }
        } else if (i[1] === 0) {
          if (snakeRow === 0) {
            row.push(
              <tr className="" key={i}>
                {/* <td className="border-2 border-black  text-center" >{totalTables++}</td> */}
                
                <td
                  className="border-2 border-black  text-center"
                  width={200}
                  height={50}
                >
                  <b>{i[0][1].toUpperCase()}</b> {" " + i[0][0]}
                  {/* <br />{" "} */}
                </td>
                <td className="border-2 border-black text-center" width={30}>{totalTables++}</td>
                
              </tr>
            );
            tableCounter++;
          } else {
            row.unshift(
              <tr className="" key={i}>
                {/* <td className="border-2 border-black  text-center" >{totalTables++}</td> */}
                
                <td
                  className="border-2 border-black  text-center"
                  width={200}
                  height={50}
                >
                  <b>{i[0][1].toUpperCase()}</b> {" " + i[0][0]}
                  {/* <br />{" "} */}
                </td>
                <td className="border-2 border-black text-center" width={30}>{totalTables++}</td>
                
              </tr>
            );
            tableCounter++;
          }
        } else {
          if (snakeRow === 0) {
            row.push(
              <tr className="h-4" key={i}>
                <td className="border-2 border-black h-4 p-2 text-center" width={30}></td>
                <td
                  className="border-2 border-black h-4 p-2 text-center"
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
                <td className="border-2 border-black h-4 p-2 text-center" width={30}></td>
                <td
                     className="border-2 border-black h-4 p-2 text-center"
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
      if (row.length === columns ) {   // Columns Variable
        if (snakeRow === 1 && tableIndex != 3 && room_strength != 25) {
          // console.log("ROW", row)
          row.reverse();
          // row.unshift(row[row.length - 1]);

          // row.pop();
        } else if (snakeRow===0 && tableIndex != 3 && room_strength != 25) {
          row.reverse();
        } 
        else if (snakeRow === 1 && tableIndex != 3 && room_strength == 25) {
          row.unshift(row[row.length - 1]);
          // row.reverse();
          row.pop();
        }
        if (tableIndex == 3 && room_strength == 25) {
          // row.reverse()
        }

        if (tableIndex == 3 && room_strength != 25) {
          row.reverse()
        }
        console.log("Here coming");
        console.log("ROOM ACTUAL LENGTH", roomArray.length);
        console.log(single_seater, room_strength)
        if (room_strength != 25) {
        row.reverse()
        }

        if (roomArray.length > room_strength && tableCounter == columns && room_strength==25) {
          console.log("caa")
          
          if (roomArray.length - room_strength === 2) {
            
            if (tableIndex === 2) {
              row.shift()
              
              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    width={200}
                    height={50}
                  >
                    <b>{i[0][1].toUpperCase()}</b> {" " + roomArray.slice(-2)[0][0][0]}
                  </td>
                  <td className="border-2 border-black h-4 p-2 text-center" width={30} height={50}>{26}</td>
                  
                </tr> 
              );
            }
            if (tableIndex === 1) {
              row.shift()
              
              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    width={200}
                    height={50}
                  >
                    <b>{i[0][1].toUpperCase()}</b> {" " + roomArray.slice(-1)[0][0][0]}
                  </td>
                  <td className="border-2 border-black h-4 p-2 text-center" width={30} height={50}>{27}</td>
                  
                </tr>
              );
            }
          }
          if (roomArray.length - room_strength === 1) {
            console.log("Here caaaaa")
            if (tableIndex === 2) {
              row.shift()
              
              
              row.unshift(
                <tr className="h-4" key={i + "1"}>
                  <td className="border-2 border-black h-4 p-2 text-center" width={30} height={50}></td>
                  <td
                    className="border-2 border-black h-4 p-2 text-center"
                    width={200}
                    height={50}
                  >
                    <b>{i[0][1].toUpperCase()}</b> {" " + roomArray.slice(-1)[0][0][0]}
                  </td>
                  
                </tr>
              );
            }
          }
        }

        if (roomArray.length > room_strength && tableCounter == columns && room_strength==30) {
          console.log("caa")
          if (roomArray.length - room_strength === 2) {
            
            //

            
          }
          if (roomArray.length - room_strength === 1) {
            console.log("Here caaaaa")
            
            console.log(tableIndex, "is table Index and columns are", columns)
            if (tableIndex == rows-1) {
              console.log(roomArray.slice(-1)[0][0][0])
              
              row.push(
                <tr className="h-4" key={i + "1"}>
                  
                  <td
                     className="border-2 border-black h-4 p-2 text-center"
                  width={200}
                  height={66}
                >
                  <b>{i[0][1].toUpperCase()}</b> {" " + roomArray.slice(-1)[0][0][0]}
                </td>
                <td className="border-2 border-black h-4 p-2 text-center" width={30}></td>
                
                </tr>

              )
            }
          }
        }
        
        
        table2.push(
          <table key={i} className="border-2 border-black text-xs p-2">
            <thead>
              <tr key={i} className=" ">
                
                <th className="border border-black text-xs p-2">
                  {/* {"Row " + (tableIndex + 1)} */}
                  Register No
                </th>
                <th className="border-2 border-black text-xs "
                  height={50}
                >
                  Seat No
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
        if (tableIndex === rows) {
          
        }
      } 
    });
    // }

    console.log("PLEASE WORK HERE", row.length)
    if (row.length >= 2 && room=="MT5") {
      
      for (let o=0; o<columns-row.length+4; o++) {
        row.unshift(
          <tr className="" key={o + "1"}>
            
            <td   

              className="border-2 border-black h-4 p-2 text-center"
              width={200}
              height={50}
            >
              
            </td>
            <td className="border-2 border-black h-4 p-2 text-center" width={30} height={50}></td>
          </tr>
        )
      }
      console.log("COMING HERE")
      table2.push(
        <table className="border-2 border-black min-h-[900px] text-xs ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black text-xl p-2">
                Register No
              </th>
              <th className="border-2 border-solid border-black " height={50}>
                {/* {"Row " + (tableIndex + 1)} */}
                Seat No
              </th>
              
            </tr>
          </thead>
          <tbody>{row}</tbody>
        </table>
      );
      oneTableLeave = 0;
    }

    if (row.length >3 && room=="EH27") {
      for (let o=0; o<columns-row.length; o++) {
        row.unshift(
          <tr className="" key={o + "1"}>
            
            <td   

              className="border-2 border-black h-4 p-2 text-center"
              width={200}
              height={50}
            >
              
            </td>
            <td className="border-2 border-black h-4 p-2 text-center" width={30} height={50}></td>
          </tr>
        )
      }
      console.log("COMING HERE")
      table2.push(
        <table className="border-2 border-black min-h-[900px] text-xs ">
          <thead>
            <tr>
              <th className="border-2 border-solid border-black text-xl p-2">
                Register No
              </th>
              <th className="border-2 border-solid border-black " height={50}>
                {/* {"Row " + (tableIndex + 1)} */}
                Seat No
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
      {/* <a href="/api/pdf" download="class_allotment.pdf" className="downloadBtn">
        Download PDF
      </a> */}
      <Page>
        <div className="flex flex-col">
          <div className="w-3/5  flex justify-between items-center">
            <div className="flex flex-col items-center justify-between">
              <div className="flex items-center justify-between ">
                <Image
                  src="/citlogo.png"
                  width={400}
                  height={400}
                  alt="dasd"
                  className="object-contain pr-4"
                />
                <h1 className="text-xl text-center pl-4 font-bold ml-2">
                  {" "}
                  {exam.toUpperCase()}{" "}

                </h1>
                <h1 className="text-xl text-center pl-4 font-bold mr-4">
                  Seating Arrangement / Attendance {room == "EH27" ? "(PG)" : ""}
                </h1>
              </div>
              <table
                className={`border-2 border-black text-xs ${
                  ((columns == 7 || columns == 6) && !single_seater) ? "" : "m-4"
                }  text-center`}
              >
                <thead></thead>
                <tbody>
                  <tr>
                    <th className="border-2 border-black text-xs p-2">
                      {" "}
                      Date: {date}{" "}
                    </th>
                    <th className="border-2 border-black text-xs p-2">
                      {" "}
                      Session: AN
                    </th>
                    <th className="border-2 border-black text-xs p-2">
                      {" "}
                      Time: 12:00 Noon to 3:00 PM{" "}
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
              <p className="italic">{FLOORS[room.split(REG)[0]]} </p>
              {room.includes("EH") ? (
                <p className="italic text-xs"> {ROOMNO[room.split(REG)[1]]} </p>  
              ) : console.log(room)}
            </div>

            {/* <p> Date: 13/02/2023  </p>
            <p> Session: AN </p>
            <p> Time:  </p> */}
            {/* {!downloading && <button onClick={downloadPDF}>Download PDF</button>} */}
          </div>
          <div className="flex flex-col mt-4  w-3/5 items-center">
            {create(room, roomArray, rows)}
            {/* <GeneratePDF html={componentRef} /> */}
            {rangesCreate(rangesSingle)}
          </div>
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

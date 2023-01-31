"use client";

import Image from "next/image";
import { useDeptID } from "../src/store";

function ClassAllotment({ room, roomArray, rows, columns }) {
  const deptID = useDeptID.getState().dept_id_object;

  const create = (room, roomArray, rows) => {
    let tables = [];
    let table2 = [];

    roomArray.forEach((row) => {
      let children = [];
      row.forEach((col, j) => {
        children.push(
          <tr>
            <td>
              {deptID[col[0].toString().slice(6, 9)] +
                col[0].toString().slice(-3) +
                " " +
                deptID[col[1].toString().slice(6, 9)] +
                col[1].toString().slice(-3)}
            </td>
          </tr>
        );
      });
    });
  }
    return (
      <div className="flex flex-row h-[80vh]">
        <div className="w-2/5">
          <Image
            src="/cit.png"
            width={400}
            height={300}
            alt="dasd"
            className="object-contain"
          />
        </div>
        <div className="flex flex-col justify-center items-center h-screen w-3/5">
          {/* {create(room, roomArray, rows)} */}
        </div>
      </div>
    );
}
export default ClassAllotment;

// import React, { useRef, useEffect } from "react";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const ClassAllotment = ({ room, roomArray, rows, columns,  }) => {
//   const deptID = useDeptID.getState().dept_id_object;
//   const tableRef = useRef(null);

//   // useEffect(() => {
//   //   const generatePDF = async () => {
//   //     const canvas = await html2canvas(tableRef.current, {
//   //       scale: 2,
//   //       scrollY: -window.scrollY,
//   //     });
//   //     const pdf = new jsPDF("l", "mm", "a4");
//   //     pdf.addImage(canvas.toDataURL("image/png"), "JPEG", 0, 0, 297, 210);
//   //     pdf.save(`class_allotment_${room}.pdf`);
//   //   };

//   //   generatePDF();
//   // }, []);

//   const createTable = (room, roomArray, rows) => {
//     let tables = [];
//     let table2 = [];

//     console.log("roomArray[i][0]: ", roomArray[0][0][0]);

//     for (let i = 0; i < rows; i++) {
//       let children = [];
//       for (let j = 0; j < columns; j++) {
//         children.push(
//           <tr className="h-20 justify-center w-40">
//             <td className="border-2 text-center justify-center p-10 text-xl w-40 ">
//               {deptID[roomArray[j][0][0].toString().slice(6, 9)] +
//                 roomArray[j][0][0].toString().slice(-3) +
//                 " " +
//                 deptID[roomArray[j][1][0].toString().slice(6, 9)] +
//                 roomArray[j][1][0].toString().slice(-3)}
//             </td>
//           </tr>
//         );
//       }
//       table2.push(
//         <div className="flex flex-col items-center justify-center mt-4">
//           <table className="table-fixed p-4 border-2 border-black w-full">
//             <thead className="h-20 text-2xl text-center w-40 p-5">
//               <tr className="w-32">
//                 <th>Row {i + 1}</th>
//               </tr>
//             </thead>
//             <tbody className="min-h-[500px]">{children}</tbody>
//           </table>
//         </div>
//       );
//     }
//     tables.push(
//       <div className="flex flex-row justify-center items-center m-2 mr-8">
//         {table2}
//       </div>
//     );
//     console.log("tables: ", tables)
//     return tables;
//   };

//   return (
//     <div
//       // ref={tableRef}
//       className="flex flex-row text-xl font-medium p-5 min-h-screen min-w-full pl-4 "
//       key = {room}
//     >
//       <div className="w-2/5 min-w-[500px]">
//         <Image
//           src="/cit.png"
//           width={400}
//           height={300}
//           alt="dasd"
//           className="object-contain"
//         />
//       </div>
//       <div className="flex flex-col p-4 h-screen w-3/5">
//         {createTable(room, roomArray, rows, columns)}
//       </div>
//     </div>
//   );
// };

// export default ClassAllotment;

// console.log("roomArray[i][0]: ", roomArray[0][0][0]);
// console.log("rows: ", rows);
// for (let i = 0; i < rows; i++) {
//   let children = [];
//   for (let j = 0; j < columns; j++) {
//     children.push(
//       <tr>
//         <td>
//           {deptID[roomArray[j][0][0].toString().slice(6, 9)] +
//             roomArray[j][0][0].toString().slice(-3) +
//             " " +
//             deptID[roomArray[j][1][0].toString().slice(6, 9)] +
//             roomArray[j][1][0].toString().slice(-3)
//             }
//         </td>
//       </tr>
//     );
//   }
//   console.log("children: ", children);
//   table2.push(
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Row {i + 1}</th>
//           </tr>
//         </thead>
//         <tbody>{children}</tbody>
//       </table>
//     </div>
//   );
// }
// tables.push(
//   <div className="flex flex-row justify-center items-center m-2 mr-8" key={room}>
//     {table2}
//   </div>
// );
// console.log("tables: ", tables);
// return tables;

//   // function ClassAllotment({ room, roomArray, rows, columns }) {
//   //   const deptID = useDeptID.getState().dept_id_object;

//   //   const create = (room, roomArray, rows) => {
//   //     let tables = [];
//   //     let table2 = [];

//   //     console.log("roomArray[i][0]: ", roomArray[0][0][0]);

//   //     for (let i = 0; i < rows; i++) {
//   //       let children = [];
//   //       for (let j = 0; j < columns; j++) {
//   //         children.push(
//   //           <tr className="h-[100px]">
//   //             <td className="border-2 p-5 text-xl text-center w-[150px]">
//   //               {deptID[roomArray[j][0][0].toString().slice(6, 9)] +
//   //                 roomArray[j][0][0].toString().slice(-3) +
//   //                 " " +
//   //                 deptID[roomArray[j][1][0].toString().slice(6, 9)] +
//   //                 roomArray[j][1][0].toString().slice(-3)}
//   //             </td>
//   //           </tr>
//   //         );
//   //       }
//   //       table2.push(
//   //         <table className="table-auto border-spacing-1 border-black border-2 w-full m-5 p-2">
//   //           <thead>
//   //             <tr className="h-[10  0px] text-2xl w-[150px] p-5 text-center">
//   //               <th>Row {i + 1}</th>
//   //             </tr>
//   //           </thead>
//   //           <tbody>{children}</tbody>
//   //         </table>
//   //       );
//   //     }
//   //     tables.push(<div className="flex flex-row justify-center justify-items-center m-2 mr-8  ">{table2}</div>);
//   //     return tables;
//   //   };

//   // let table = []
//   // let done = []
//   // let head=[]
//   // for (let i=1; i<=rows; i++) {

//   //   head.push(<th className='block [&:not(:last-child)]:border-b-0 '>Row {i}</th>)
//   // }
//   // done.push(<thead className='flex shrink-0 min-w-min'><tr>{head}</tr></thead>)
//   // for (let i=0; i<rows; i++) {
//   //   let children = []

//   //   for (let j=0; j<columns; j++) {
//   //     children.push(<td className='block !bg-none border-l-0 [&:not(:last-child)]:border-b-0'>{i}{j}</td>)
//   //   }
//   //   if (i%2==0) {
//   //     table.push(<tr className='flex flex-col min-w-min shrink-0'>{children}</tr>)
//   //   } else {
//   //     children.reverse()
//   //     table.push(<tr>{children}</tr>)
//   //   }

//   // }
//   // done.push(<tbody className='flex relative overflow-x-auto overflow-y-hidden'>{table}</tbody>)
//   // return done

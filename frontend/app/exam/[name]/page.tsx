// "use client"

import "styles/globals.css";

import drf from "../../../pages/api/axiosConfig";
import Link from "next/link";
import Navbar from "../../../components/Navbar";
import DownloadButton from "../../../components/DownloadButton";
// import puppeteer from "puppeteer-core";
// import path from "path";
// import fs from "fs";

export default async function ExamPage({ params }: any) {
  

  async function getExamData() {
    try {
      const res = await drf.get("/exams/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async function getTemplateData() {
    try {
      const res = await drf.get("/templates/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getRoomData() {
    try {
      const res = await drf.get("/roomdata/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getRoomsData() {
    try {
      const res = await drf.get("/rooms/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const nameGot = params.name;
  const name = decodeURIComponent(nameGot);

  const edata = await getExamData();
  const rdata = await getRoomData();

  let links = [];

  let exam = edata.filter(
    (item: { exam_name: string }) => item.exam_name == name
  )[0];
  console.log("EXAM", exam);
  // console.log("NAME CHECKED", name);
  let roomdata = rdata.filter((item: { exam: string }) => item.exam == name)[0];
  // console.log("ROOMDATA", roomdata);

  const rooms = roomdata.rooms;
  const ranges = roomdata.ranges;

  const tdata = await getTemplateData();
  const template = tdata.filter(
    (item: { template_name: string }) => item.template_name == exam.exam_template
  )[0];
  
  console.log("TEMPLATE", template);
    const ROOMS = template.rooms;

  // let dateNow: Date = new Date();
  let dateNow: string = new Date().toDateString();
  return (
    <div className=" ">
      <Navbar />
      <div className="pl-10 mt-10">
        <h1 className="text-6xl font-bold font-mono text-white">{name}</h1>
        <p className="font-mono pt-2 text-xl"></p>
      </div>
      <div className="pl-10">
        <p className="text-2xl text-white font-mono">
          {exam.from_date} to {exam.to_date}
        </p>
      </div>
      <div className="flex flex-row justify-center pl-10 mt-6 ">
        <div className="flex flex-col mr-6 border-2 p-4">
          {Object.keys(rooms).map((date: string) => {
            let dateObj: Date = new Date(date);
            dateNow = dateObj.toDateString();
            dateObj = new Date(date);
            links.push(`http://localhost:3000/exam/${encodeURIComponent(name)}/allotments/${dateObj.toISOString().substring(0, 10)}`);

            return (
              <Link
                href={`/exam/${name}/allotments/${dateObj
                  .toISOString()
                  .substring(0, 10)}`}
                className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
           after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
           after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {" "}
                Allotments - {dateNow}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col  border-2 p-4">
          {Object.keys(rooms).map((date: string) => {
            let dateObj: Date = new Date(date);
            dateNow = dateObj.toDateString();
            dateObj = new Date(date);
            links.push(`http://localhost:3000/exam/${encodeURIComponent(name)}/hallplan/${dateObj.toISOString().substring(0, 10)}`);
            return (
              <Link
                href={`/exam/${name}/hallplan/${dateObj
                  .toISOString()
                  .substring(0, 10)}`}
                className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
            after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
         after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {" "}
                Notice Board Copies - {dateNow}{" "}
              </Link>
            );
          })}
        </div>
        <div className="flex flex-col  border-2 p-4">
          {ROOMS.map((room: string) => {
            // let dateObj: Date = new Date(date);
            // dateNow = dateObj.toDateString();
            // dateObj = new Date(date);
            return (
              <Link
                // href={`/exam/${name}/hallplan/${dateObj
                //   .toISOString()
                //   .substring(0, 10)}`}
                href = {`/exam/${name}/attendance/${room}`}
                className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
            after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
         after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {" "}
                Attendance - {room}{" "}
              </Link>
            );
          })}
        </div>
        

        <div>
          <div className="flex flex-col  border-2 p-4">
            <DownloadButton links={links}/>
          </div>
        </div>
      </div>
    </div>
  );
}

//   //* All the GET Functions from REST API
//   async function getExamData() {
//     try {
//       const res = await drf.get("/exams/");
//       return res.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }
//   async function getTemplateData() {
//     try {
//       const res = await drf.get("/template/");
//       // return res.data;
//     } catch (error) {
//       console.error(error);
//       // return null;
//     }
//   // }
// //
//   async function getRoomData() {
//     try {
//       const res = await drf.get("/roomdata/");
//       return res.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   //* Getting the URL Parameters
//   // const nameGot = params.name;
//   // const name = decodeURIComponent(nameGot)

//   //* Getting the Exam Data
//   // const edata = await getExamData();
//   // const rdata = await getRoomData();

//   // let exam = edata.filter((item: {exam_name: any}) => item.exam_name == name)[0]
//   // console.log("EXAM", exam)
//   // console.log("NAME CHECKED", name)
//   // let roomdata = rdata.filter((item: {exam: any}) => item.exam == name)
//   // console.log("ROOMDATA", roomdata)

//   // const rooms = roomdata.rooms
//   // const ranges = roomdata.ranges
//   let dateNow = new Date();

//   // return (
//   //   <div><p>page for {name}</p></div>
//   // )

//   return (
//     <div className="mt-36 ">
//       <div className="p-10">
//         <h1 className="text-6xl fold-bold font-mono ">{name}</h1>
//         <p className="font-mono pt-4 text-xl"></p>
//       </div>
//       <div className="pl-10">
//         <p>
//           {/* {exam.from_date} to {exam.to_date} */}
//         </p>
//       </div>
//       <div className="flex flex-row justify-center pl-10 mt-6 ">
//         <div className="flex flex-col mr-6 border-2 p-4">
//           {/* {Object.keys(rooms).map((date: String) => {
//             dateNow = new Date(date);
//             date = new Date(date);
//             dateNow = dateNow.toDateString();
//             return (
//               <Link
//                 href={`/exam/${id}/allotments/${date.toISOString().substring(0,10)}`}
//                 className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
//           after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
//           after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
//               >
//                 {" "}
//                 Allotments - {dateNow}
//               </Link>
//             );
//           })} */}
//         </div>
//         <div className="flex flex-col  border-2 p-4">
//           {/* {Object.keys(roomSingle).map((date: String) => {
//             dateNow = new Date(date);
//             date = new Date(date);
//             dateNow = dateNow.toDateString();
//             return (
//               <Link
//                 href={`/exam/${name}/hallplan/${date.toISOString().substring(0,10)}`}
//                 className="text-3xl py-2 font-mono flex justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full
//            after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
//         after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
//               >
//                 {" "}
//                 Notice Board Copies - {dateNow}{" "}
//               </Link>
//             );
//           })} */}
//         </div>
//       </div>
//     </div>
//   );
// }
// }

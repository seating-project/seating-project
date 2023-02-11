import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
// import Background from "../public/background.svg";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import ExamCard from "../components/ExamCard";
import drf from "../pages/api/axiosConfig";

import { useEffect } from "react";
// import VantaBackground from "../components/SplineBackground";

async function getExamData() {
  try {
    const res = await drf.get("/exams/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function postExamData() {
  const res = await drf.post("/createexamtemplate/", {
    exam_id: 2,
    exam_name: "Internal Assessment 2",
    exam_fromdate: "2023-02-03",
    exam_todate: "2023-02-12",
    exam_depts: ["cse", "it"],
    exam_template: "1",
  });
}

async function Homepage() {
  const edata = await getExamData();
  console.log(edata);

  // useEffect(() => {
  //   const threeScript = document.createElement("script");
  //   threeScript.setAttribute("id", "threeScript");
  //   threeScript.setAttribute(
  //     "src",
  //     "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
  //   );
  //   document.getElementsByTagName("head")[0].appendChild(threeScript);
  //   return () => {
  //     if (threeScript) {
  //       threeScript.remove();
  //     }
  //   };
  // }, []);

  return (
    <>
      <div className="bg-cover bg-light-blue">
        <div className="flex ">
          {/* <Navbar /> */}
          <div className="flex flex-col">
            <Header />
            <div className="flex p-4 flex-wrap flex-row items-center">
              {edata.map((item: { name: any; id: any }) => (
                <ExamCard name={item.name} id={item.id} />
              ))}
              <div className="flex flex-col items-center justify-center w-1/4 h-1/4 m-4 p-4 min-h-[200px] rounded-2xl  bg-white bg-opacity-40 backdrop-blur-md drop-shadow-lg">
                <div className="flex flex-col items-center justify-center">
                  <Link href="/examform" className="flex flex-col items-center justify-center">
                    <PlusCircleIcon className="h-20 w-20 text-black cursor-pointer hover:text-dark-blue transition duration-400 ease-out scale-105" />
                    <h1 className="text-2xl font-mono text-center">
                      Create New Exam
                    </h1>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;

import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Background from "../public/background.svg";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import ExamCard from "../components/ExamCard";

async function getExamData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/exams/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function postExamData() {
  const res = await axios.post("http://127.0.0.1:8080/createexamtemplate/", {
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

  return (
    <div className="bg-white bg-background bg-cover">
      <div className="flex h-screen ">
        <Navbar />
        <div className="flex flex-col">
          <Header />
          <div className="flex p-4 flex-wrap flex-row items-center">
            {edata.map((item: { name: any }) => (
              <ExamCard name={item.name} />
            ))}
            <div className="flex flex-col items-center justify-center w-1/4 h-1/4 m-4 p-4 min-h-[200px] rounded-2xl bg-screen">
              <div className="flex flex-col items-center justify-center">
                <Link href="/templateform">
                  <PlusCircleIcon className="h-20 w-20 text-black cursor-pointer hover:text-gray transition duration-400 ease-out scale-105" />
                </Link>
                <h1 className="text-2xl font-semibold text-center">
                  Create New Exam
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

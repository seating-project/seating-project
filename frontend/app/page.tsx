import '../styles/globals.css'
import drf from '../pages/api/axiosConfig';
import Link from 'next/link';
import Header from '../components/Header';
import ExamCard from '../components/ExamCard';
import { PlusCircleIcon } from "@heroicons/react/outline";
import SplineBackground from '../components/SplineBackground';
import Navbar from '../components/Navbar';

async function getExamData() {
  try {
    const res = await drf.get("/exams/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


async function Homepage() {
  const edata = await getExamData();
  console.log(edata);

  return (
    <>
    <Navbar />
      <div className="bg-cover bg-light-blue flex">
        
        <div className="flex flex-col">
          {/* <Navbar /> */}
          <div className="flex flex-col">
            <Header />
            <div className="flex p-4 flex-wrap flex-row items-center">
              {edata.map((item: { exam_name: any }) => (
                <ExamCard name={item.exam_name} />
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
        <div className="">
          <SplineBackground />
        </div>
      </div>
    </>
  );
}

export default Homepage;
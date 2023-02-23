import Link from "next/link";
import drf from "../../../pages/api/axiosConfig";

export default async function ProductPage({ params }) {
  async function getExamData() {
    try {
      const res = await drf.get("/exams/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const id = params.id;

  console.log("PARAAMS", params);

  const edata = await getExamData();
  console.log(edata);

  let exam = edata.filter((item: { id: any }) => item.id == id);
  exam = exam[0];
  console.log(exam);
  console.log(typeof exam.fromdate)

  return (
    <div className="mt-36 ">
      <div className="p-10">
        <h1 className="text-6xl fold-bold font-mono ">{exam.name}</h1>
        <p className="font-mono pt-4 text-xl">ID: {id}</p>
      </div>
      <div className="pl-10">
        <p>{exam.fromdate} to {exam.todate}</p>
      </div>
      <div className="flex flex-col pl-10 mt-6 ">
        {/* <p>Documents</p> */}
        <Link href={`/exam/${id}/allotments`} className="text-3xl py-2 font-mono justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full 
          after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
          after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"> Allotments </Link>
        <Link href={`/exam/${id}/hallplan`} className="text-3xl py-2 font-mono flex justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full 
          after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
          after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"> Notice Board Copies </Link>

      </div>
    </div>
  );
}

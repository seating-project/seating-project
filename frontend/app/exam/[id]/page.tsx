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
      <div>
        <p>{exam.fromdate} to {exam.todate}</p>
      </div>
      <div>
        <p>Documents</p>
        <Link href={`/exam/${id}/allotments-[id]`}> Allotments </Link>
      </div>
    </div>
  );
}

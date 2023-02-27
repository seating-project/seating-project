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
  async function getTemplateData() {
    try {
      const res = await drf.get("/examtemplate/");
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

  const id = params.id;

  console.log("PARAAMS", params);

  const edata = await getExamData();
  console.log(edata);

  let exam = edata.filter((item: { id: any }) => item.id == id);
  exam = exam[0];
  console.log(exam);
  console.log(typeof exam.fromdate);

  let rooms = await getRoomData();
  rooms = rooms.filter((item: { exam: any }) => item.exam == exam.id);
  rooms = rooms[0];
  const roomSingle = rooms.rooms;
  const rangesNeeded = rooms.ranges;
  let dateNow = new Date();
  return (
    <div className="mt-36 ">
      <div className="p-10">
        <h1 className="text-6xl fold-bold font-mono ">{exam.name}</h1>
        <p className="font-mono pt-4 text-xl">ID: {id}</p>
      </div>
      <div className="pl-10">
        <p>
          {exam.fromdate} to {exam.todate}
        </p>
      </div>
      <div className="flex flex-row justify-center pl-10 mt-6 ">
        <div className="flex flex-col mr-6 border-2 p-4">
          {Object.keys(roomSingle).map((date: String) => {
            dateNow = new Date(date);
            date = new Date(date);
            dateNow = dateNow.toDateString();
            return (
              <Link
                href={`/exam/${id}/allotments/${date.toISOString().substring(0,10)}`}
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
          {Object.keys(roomSingle).map((date: String) => {
            dateNow = new Date(date);
            date = new Date(date);
            dateNow = dateNow.toDateString();
            return (
              <Link
                href={`/exam/${id}/hallplan/${date.toISOString().substring(0,10)}`}
                className="text-3xl py-2 font-mono flex justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full 
           after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
        after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {" "}
                Notice Board Copies - {dateNow}{" "}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

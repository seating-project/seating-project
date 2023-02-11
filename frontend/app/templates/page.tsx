import axios from "axios";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Background from "../public/background.svg";
import { PlusCircleIcon } from "@heroicons/react/outline";
import Link from "next/link";
import ExamCard from "../../components/ExamCard";
import TemplateCard from "../../components/TemplateCard";
import drf from "../../pages/api/axiosConfig";


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

async function postTemplateData() {
  const res = await drf.post("/createexamtemplate/", {
    id: "2",
    rows: 5,
    columns: 5,
    room_strength: 30,
    count_in_bench: 2,
    rooms: { rooms: ["A", "B", "C", "D", "E"] },
  });
}

async function Homepage() {
  const tdata = await getTemplateData();

  return (
    <div className="bg-cover flex flex-row">
      <div className="flex flex-col h-screen">
        <div>
          <h1 className="text-6xl text-black m-8 font-bold">Templates</h1>
        </div>
        <div className="flex flex-wrap m-8">
          {tdata.map((template : any) => (
            <TemplateCard
              key={template.id}
              id={template.id}
              rows={template.rows}
              columns={template.columns}
              room_strength={template.room_strength}
              counts_in_bench={template.count_in_bench}
              rooms={template.rooms}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;

import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TemplateCard from "../components/TemplateCard";
import Background from "../public/background.svg";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { useTemplateData } from "../src/store";

async function getTemplateData() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/examtemplate/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getRoomData() {
  try {
    const res = await axios.get("http://127.0.0.1:8000/roomdata/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function postTemplateData() {
  const res = await axios.post("http://127.0.0.1:8000/createexamtemplate/", {
    id: "2",
    rows: 5,
    columns: 5,
    room_strength: 30,
    count_in_bench: 2,
    rooms: { rooms: ["A", "B", "C", "D", "E"] },
  });
}

async function openForm() {
  null;
}

async function Homepage() {
  // const data = await getData();


  const tdata = await getTemplateData();
  console.log(tdata);

  const rdata = await getRoomData();
  
  const roomSingle = rdata[0].rooms;
  const roomArray = Object.entries(roomSingle);
  console.log(roomArray);

  return (
    <div className="bg-white bg-background bg-cover">
      <div className="flex h-screen ">
        <Navbar />
        <div className="flex flex-col">
          <Header />
          <div className="flex p-4 flex-wrap flex-row items-center">
            {tdata.map((item: { id: any; rows: any; columns: any; room_strength: any; counts_in_bench: any; rooms: any; }) => (
              <TemplateCard
                key={item.id}
                id={item.id}
                rows={item.rows}
                columns={item.columns}
                room_strength={item.room_strength}
                counts_in_bench={item.counts_in_bench}
                rooms={item.rooms}
              />
            ))}
            <div className="flex flex-col items-center justify-center w-1/4 h-1/4 m-4 p-4 min-h-[200px] rounded-2xl bg-screen">
              <div className="flex flex-col items-center justify-center">
                <PlusCircleIcon className="h-20 w-20 text-black cursor-pointer hover:text-gray transition duration-400 ease-out scale-105" />
                <h1 className="text-2xl font-semibold text-center">Create New Template</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;

import axios from "axios";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import TemplateCard from "../components/TemplateCard";

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

async function Testpage() {
  // const data = await getData();

  // const roomSingle = data[0].rooms;
  // const roomArray = Object.entries(roomSingle);
  // console.log(roomArray);

  return <div className="bg-white">

  </div>;
}

export default Testpage;

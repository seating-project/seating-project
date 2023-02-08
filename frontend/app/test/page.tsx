import axios from "axios";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import TemplateCard from "../../components/TemplateCard";
import ClassAllotment from "../../pdf_components/ClassAllotment";
import NoticeBoardCopy from "../../pdf_components/NoticeBoardCopy";
import AttendanceSheets from "../../pdf_components/AttendanceSheets";

async function getTemplateData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/examtemplate/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getRoomData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/roomdata/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function postTemplateData() {
  const res = await axios.post("http://127.0.0.1:8080/createexamtemplate/", {
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

  const rdata = await getRoomData();
  const roomSingle = rdata[0].rooms;
  const rangesNeeded = rdata[0].ranges;
  const roomArray = Object.entries(roomSingle);
  const tdata = await getTemplateData();
  console.log(tdata);
  //console.log("ROOM SINGLE LOL",roomSingle);
  //console.log("RANGES LMAO", rangesNeeded);
  //console.log("room length", roomSingle["F1"].length)
  console.log("room length", tdata[0].room_strength)

  return (
    <div className="bg-white h-screen w-screen" >
      {Object.keys(roomSingle).map((room) => {
        return (
          <ClassAllotment
            key={room}
            room={room}
            roomArray={roomSingle[room]}
            rows={tdata[0].num_rows}
            columns={tdata[0].num_columns}
            rangesSingle={rangesNeeded[room]}
            exam={tdata[0].template_exam_name}
            room_strength = {tdata[0].room_strength}
            single_seater = {tdata[0].single_seater}
            boys_girls_separation = {tdata[0].boys_girls_separation}
            
          />
        );
      })}
      {/* <NoticeBoardCopy ranges={rangesNeeded} exam={tdata[0].template_exam_name} /> */}
      {/* <AttendanceSheets ranges = {rangesNeeded}/> */}
    </div>
  );
}

export default Testpage;

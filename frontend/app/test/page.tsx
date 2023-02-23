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
  // console.log(tdata);


  const roomGOD = Object.entries(rdata[0].rooms).sort(([a], [b]) => a.localeCompare(b))
  // console.log("ROOM GOD", roomGOD)
  
  let roomsNeeded = [];

  for (let i = 0; i < roomGOD.length; i++) {
    console.log("roomGOD[i]", roomGOD[i][0])
    if (roomGOD[i][0].includes("T") && !(roomGOD[i][0].includes("M"))) {
      roomsNeeded.push(roomGOD[i]);
      
    }
    
  }
  for (let i = 0; i < roomGOD.length; i++) {
    if (roomGOD[i][0].includes("M") && (roomGOD[i][0].includes("T"))) {
      roomsNeeded.push(roomGOD[i]);
      
    }
    
  }
  for (let i = 0; i < roomGOD.length; i++) {
    if (roomGOD[i][0].includes("EH")) {
      roomsNeeded.push(roomGOD[i]);
      
    }
    
  }
  
  let rangesNeededGirls = {}
  rangesNeededGirls["S1"] = rangesNeeded["S1"]
  rangesNeededGirls["S2"] = rangesNeeded["S2"]
  rangesNeededGirls["S3"] = rangesNeeded["S3"]
  rangesNeededGirls["S4"] = rangesNeeded["S4"]

  let rangesNeededBoys = {}
  Object.keys(rangesNeeded).forEach((key) => {
    if (!(Object.keys(rangesNeededGirls).includes(key))) {
      rangesNeededBoys[key] = rangesNeeded[key]
    }
  })


  // console.log("GIRLS RANGES", rangesNeededGirls)
  // console.log("BOYS RANGEES" , rangesNeededBoys)


  // console.log("ORDERED GOM", roomsNeeded)
  // console.log("ROOM SINGLE LOL",roomSingle);
  // console.log("RANGES LMAO", rangesNeeded);
  //console.log("room length", roomSingle["F1"].length)
  // console.log("room length", tdata[0].room_strength)
  let order = 0;
  const timestamp = Date.now();
  return (
    <div className="bg-white w-screen" >
      
      
      {Object.keys(roomSingle).map((room) => {
        console.log("room", room);
        return (
          <ClassAllotment
            key={`page-${timestamp}-${order++}`}
            room={room}
            roomArray={roomSingle[room]}
            rows={tdata[1].num_rows}
            columns={tdata[1].num_columns}
            rangesSingle={rangesNeeded[room]}
            // exam={tdata[0].template_exam_name}
            exam = "Internal Assessment - I"
            room_strength = {tdata[1].room_strength}
            single_seater = {tdata[1].single_seater}
            boys_girls_separation = {tdata[1].boys_girls_separation}
          />
        );
      })}
      {/* <NoticeBoardCopy ranges={rangesNeededGirls} exam={"Model Examination"} /> */}
      {/* <AttendanceSheets ranges = {rangesNeeded}/> */}
    </div>
  );
}

export default Testpage;

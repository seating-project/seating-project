import Link from "next/link";
import drf from "../../../../../pages/api/axiosConfig";
import ClassAllotment from "../../../../../pdf_components/ClassAllotment";
import NoticeBoardCopy from "../../../../../pdf_components/NoticeBoardCopy";

async function getTemplateData() {
  try {
    const res = await drf.get("/examtemplate/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getExamData() {
  try {
    const res = await drf.get("/exams/");
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

export default async function HallPlanPage({ params }) {
  

  const id = params.id;

  console.log("PARAAMS", params);
  const date = params.date

  const edata = await getExamData();
  console.log(edata);

  let exam = edata.filter((item: { id: any }) => item.id == id);
  exam = exam[0];
  console.log(exam);
  console.log(typeof exam.fromdate)

  let template = await getTemplateData();
  template = template.filter((item: { id: any }) => item.id == exam.template);
  template = template[0];
  console.log(template);

  let rooms = await getRoomData();
  console.log("ROOMS", rooms)
  rooms = rooms.filter((item: { exam: any }) => item.exam == exam.id);
  rooms = rooms[0];
  console.log("ROOMS", rooms);
  const roomSingle = rooms.rooms;
  const rangesNeeded = rooms.ranges;

  let order = 0;
  const timestamp = Date.now();

  const rdata = await getRoomData();
  
  // const roomArray = Object.entries(roomSingle);
  // const tdata = await getTemplateData();
  // console.log(tdata);


  const roomGOD = Object.entries(rdata[0].rooms).sort(([a], [b]) => a.localeCompare(b))
  // console.log("ROOM GOD", roomGOD)
  
  let roomsNeeded = [];

  for (let i = 0; i < roomGOD.length; i++) {
    // console.log("roomGOD[i]", roomGOD[i][0])
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
  
//   let rangesNeededGirls = {}
//   rangesNeededGirls["S1"] = rangesNeeded["S1"]
//   rangesNeededGirls["S2"] = rangesNeeded["S2"]
//   rangesNeededGirls["S3"] = rangesNeeded["S3"]
//   rangesNeededGirls["S4"] = rangesNeeded["S4"]

//   let rangesNeededBoys = {}
//   Object.keys(rangesNeeded).forEach((key) => {
//     if (!(Object.keys(rangesNeededGirls).includes(key))) {
//       rangesNeededBoys[key] = rangesNeeded[key]
//     }
//   })

  return (
    <div className="bg-white w-screen" >
      
      
      {/* {Object.keys(roomSingle).map((room) => {
        // console.log("room", room);
        return (
          <ClassAllotment
            key={`page-${timestamp}-${order++}`}
            room={room}
            roomArray={roomSingle[room]}
            rows={template.num_rows}
            columns={template.num_columns}
            rangesSingle={rangesNeeded[room]}
            // exam={tdata[0].template_exam_name}
            exam = {exam.name}
            room_strength = {template.room_strength}
            single_seater = {template.single_seater}
            boys_girls_separation = {template.boys_girls_separation}
          />
        );
      })} */}
      <NoticeBoardCopy ranges={rangesNeeded} exam={exam.name} date={date} />
      {/* <AttendanceSheets ranges = {rangesNeeded}/> */}
    </div>
  )
}
// "use client";
// import drf from "../../../../pages/api/axiosConfig";

// const AllotmentPage = async ({params}) => {
//   // const router = useRouter();
//   // console.log("ROUTER", router);
//   // const { id } = router.query;
//   // console.log("ID", id);
//   console.log("PARAMS", params.id)
//   async function getExamData() {
//     try {
//       const res = await drf.get("/exams/");
//       return res.data;
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   const edata = await getExamData();
//   console.log(edata);

//   // let exam = edata.filter((item: { id: any }) => item.id == id);
//   // exam = exam[0];
//   console.log(exam);
//   console.log(typeof exam.fromdate)

//   return ( 
//     <div>
      
//     </div>
//   )

// };

// export default AllotmentPage;

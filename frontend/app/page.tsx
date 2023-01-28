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
    return null
  }
}

async function getRoomData() {
  try {
  const res = await axios.get("http://127.0.0.1:8000/roomdata/");
  return res.data;
  } catch (error) {
    console.error(error);
    return null
  }
  
}


async function postTemplateData() {
  const res = await axios.post("http://127.0.0.1:8000/createexamtemplate/", {
    "id": "2",
    "rows": 5,
    "columns": 5,
    "room_strength": 30,
    "count_in_bench": 2,
    "rooms": {"rooms":["A","B","C","D","E"]},
  });
}


async function Homepage() {
  // const data = await getData();
  
  // const roomSingle = data[0].rooms;
  // const roomArray = Object.entries(roomSingle);
  // console.log(roomArray);

  const tdata = await getTemplateData();
  return (
    <div className="bg-white">
      <div className="flex h-screen ">
        <Navbar />
        <div className="flex flex-col">
          <Header />
          <div className="flex p-4 flex-wrap flex-row">
            {tdata.map((item) => (
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
            {/* <TemplateCard 
            
              id={tdata[0].id}
              key={tdata[0].id}
              rows={tdata[0].rows}
              columns={tdata[0].columns}
              room_strength={tdata[0].room_strength}
              counts_in_bench={tdata[0].counts_in_bench}
              rooms={tdata[0].rooms}
          
            />
            <TemplateCard />
            <TemplateCard />
            <TemplateCard /> */}
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Homepage;

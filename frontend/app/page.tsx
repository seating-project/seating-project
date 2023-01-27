import axios from "axios";


async function getData() {
  const res = await axios.get("http://127.0.0.1:8000/roomdata/");
  return res.data;
}


// async function postData() {
//   const res = await axios.post("http://127.0.0.1:8000/createexamtemplate/", {
//     "id": "2",
//     "rows": 5,
//     "columns": 5,
//     "room_strength": 30,
//     "count_in_bench": 2,
//     "rooms": "[\"A\", \"B\", \"C\", \"D\", \"E\"]",
//   });
// }


async function Homepage() {
  const data = await getData();
  
  const roomSingle = data[0].rooms;
  const roomArray = Object.entries(roomSingle);
  console.log(roomArray);

  return (
    <div>
      <div>
        {roomArray.map((item) => (
          <div key={item[0]}>
            <p>{item[1].map((item1) => (
              <div key={item1}>
                <p>{item1.map((item2) => (
                  <div key={item2}>
                    <p>{item2}</p>
                  </div>
                ))}</p>
              </div>
            ))}</p>
          </div>
        ))}


        {/* {data[0].rooms.map((item) => (
          <div key={item.id}>
            <p>{item.rooms}</p>
          </div>
        ))} */}
        
      </div> 
      </div>
  
  );
}

export default Homepage;

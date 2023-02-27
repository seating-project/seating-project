import axios from "axios";
import TemplateForm from "../../components/TemplateForm";
import drf from "../../pages/api/axiosConfig";


async function getRoomData() {
  try {
    const res = await drf.get("/room/");
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function getBuildingData() {
  try {
    const res = await drf.get("/building/");
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}


export default async function Form() {
  const room_opt = await getRoomData();
  console.log("ROOMS ", room_opt);
  const building_opt = await getBuildingData();
  console.log("BUILDINGS ", building_opt);
  return <TemplateForm roomsAvailable={room_opt} buildingsAvailable={building_opt}/>;
}

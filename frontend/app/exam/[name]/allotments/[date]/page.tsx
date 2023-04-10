import "styles/globals.css";
import Link from "next/link";
import drf from "../../../../../pages/api/axiosConfig";
import ClassAllotment from "../../../../../components/ClassAllotment";

export default async function AllotmentPage({ params }: any) {
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
      const res = await drf.get("/templates/");
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

  async function getLogoData() {
    try {
      const res = await drf.get("/logos/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const getImageUrl = async (imagePath: any) => {
    try {
      return await drf
        .get(`/get-image/${imagePath}`, { responseType: "arraybuffer" })
        .then((response) =>
          Buffer.from(response.data, "binary").toString("base64")
        );
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const nameGot = params.name;
  const name = decodeURIComponent(nameGot);
  const dateGot = params.date;
  const date = decodeURIComponent(dateGot);

  const edata = await getExamData();
  const rdata = await getRoomData();
  const tdata = await getTemplateData();

  let exam = edata.filter(
    (item: { exam_name: any }) => item.exam_name == name
  )[0];
  console.log("EXAM", exam);
  console.log("NAME CHECKED", name);
  let roomdata = rdata.filter((item: { exam: any }) => item.exam == name)[0];
  console.log("ROOMDATA", roomdata);
  let template = tdata.filter(
    (item: { template_name: any }) => item.template_name == exam.exam_template
  )[0];
  console.log("TEMPLATE", template);
  console.log("TEMPLATE IMAGE", template.logo);

  const ldata = await getLogoData();
  let logo = ldata.filter((item: { id: any }) => item.id == template.logo)[0];
  // console.log("LOGO", logo);
  const wholeImagePath = logo.image;
  const imagePath = wholeImagePath.split("media/")[1];
  console.log("IMAGE PATH", imagePath);

  const logoUrl = await getImageUrl(imagePath);

  const rooms = roomdata.rooms;
  const ranges = roomdata.ranges;
  let dateNow = new Date();

  console.log("DATE", date);
  const dateObject = new Date(date);
  const roomsCurrent = rooms[dateObject.toISOString().slice(0, 10)];
  console.log(roomsCurrent);
  const rangesCurrent = ranges[dateObject.toISOString().slice(0, 10)];
  console.log("RANGES", rangesCurrent);
  console.log("RANGES CURRENT", rangesCurrent["Main Building"]["F1"]);
  
  interface RangeTemp {
    [key: string]: Object;
  }

  let rangeTemp: RangeTemp = {};
  Object.keys(rangesCurrent).map((building) => {  
    return Object.keys(rangesCurrent[building]).map((room) => {
      console.log("ROOOM", room)
      return (rangeTemp[room] = rangesCurrent[building][room]);
    })
  });
  console.log("RANGE TEMP", rangeTemp);

  const timestamp = dateNow.getTime();
  let order = 0;

  return (
    <div className="bg-white w-screen">
      

      {Object.keys(roomsCurrent).map((room) => {
        
        return (
          <ClassAllotment
            key={`page-${timestamp}-${order++}`}
            room={room}
            date={date}
            roomArray={roomsCurrent[room]}
            rangeArray={rangeTemp[room]}
            template={template}
            exam={exam}
            logoUrl={logoUrl}
          />
        );
      })}
    </div>
  );
}

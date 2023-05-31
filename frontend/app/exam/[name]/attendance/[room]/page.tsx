
import NoticeBoardCopy from "../../../../../components/NoticeBoardCopy";
import OldNotice from "../../../../../components/OldNotice";
import drf from "../../../../../pages/api/axiosConfig";
import '../../../../../styles/globals.css';






export default async function AttendancePage({params}: any) {

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
      const roomGot = params.room;
      const roomNoice = decodeURIComponent(roomGot);
    
      const edata = await getExamData();
      const rdata = await getRoomData();
      const tdata = await getTemplateData();
    
      console.log("NAME", name)

      let exam = edata.filter(
        (item: { exam_name: any }) => item.exam_name == name
      )[0];
    //   console.log("EXAM", exam);
    //   console.log("NAME CHECKED", name);
      let roomdata = rdata.filter((item: { exam: any }) => item.exam == name)[0];
    //   console.log("ROOMDATA", roomdata);
      let template = tdata.filter(
        (item: { template_name: any }) => item.template_name == exam.exam_template
      )[0];
    //   console.log("TEMPLATE", template);
    //   console.log("TEMPLATE IMAGE", template.logo);
    
      const ldata = await getLogoData();
      let logo = ldata.filter((item: { id: any }) => item.id == template.logo)[0];
      // console.log("LOGO", logo);
      const wholeImagePath = logo.image;
      const imagePath = wholeImagePath.split("media/")[1];
    //   console.log("IMAGE PATH", imagePath);
    
      const logoUrl = await getImageUrl(imagePath);
    
      const rooms = roomdata.rooms;
      const ranges = roomdata.ranges;
      let dateNow = new Date();
    
    //   console.log("DATE", date);
    const date = "2023-04-22"
      const dateObject = new Date("2023-05-12");
      const roomsCurrent = rooms[dateObject.toISOString().slice(0, 10)];
    //   console.log(roomsCurrent);
      const rangesCurrent = ranges[dateObject.toISOString().slice(0, 10)];
      console.log("RANGES", ranges);
      console.log("ROOM", roomNoice);
    //   console.log("RANGES CURRENT", rangesCurrent["Main Building"]["F1"]);

    return (
        <>
        {/* {Object.keys(rangesCurrent).map((building) => {
            // console.log("BUILDING", building);
            return Object.keys(rangesCurrent[building]).map((room) => {
                // console.log("ROOM", room);
                // console.log(rangesCurrent[building][room]);
                return <NoticeBoardCopy ranges={rangesCurrent[building][room]} exam={exam} date={date} room={room} logoUrl={logoUrl} />
            })
        })
        } */}
        <NoticeBoardCopy ranges={rangesCurrent["Main Building"][roomNoice]} exam={exam} date={date} room={roomNoice} logoUrl={logoUrl as string} isbg={template.is_boys_girls_separation} />
            {/* <OldNotice gender="boys" building="Main Building" exam={name} date={date} ranges={rangesCurrent} logoUrl={logoUrl} /> */}
        </>
    )
}  


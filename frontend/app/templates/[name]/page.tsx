import React from "react";
import Navbar from "../../../components/Navbar";
import "../../../styles/globals.css";
import { NextPage } from "next";
import drf from "../../../pages/api/axiosConfig";
import Image from "next/image";
import DeleteButton from "../../../components/DeleteButtonTemplate";

const TemplateNamePage = async ({ params }: any) => {
  const nameGot = params.name;
  const name = decodeURIComponent(nameGot);

  async function getTemplateData() {
    try {
      const res = await drf.get("/templates/");
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

  const tdata = await getTemplateData();

  const template = tdata.filter(
    (item: { template_name: any }) => item.template_name === name
  )[0];

  const ldata = await getLogoData();
  let logo = ldata.filter((item: { id: any }) => item.id == template.logo)[0];
  const wholeImagePath = logo.image;
  console.log(wholeImagePath);
  const imagePath = wholeImagePath.split("media/")[1];
  const logoUrl = await getImageUrl(imagePath);

  console.log(template);

  return (
    <>
      <Navbar />
      <div className="bg-cover bg-light-blue flex">
        <div className="flex flex-col m-24 w-screen p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-xl dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          {/* <Navbar /> */}
          <div className="flex pl-2 py-4 flex-wrap flex-row items-center justify-between">
            <h1 className="text-4xl font-bold text-centermb-2 tracking-tight text-gray-900 dark:text-white">
              {name}
            </h1>
            <div className="flex flex-row items-center">
              <DeleteButton name={name} />
            </div>
          </div>
          <div className="flex  text-2xl w-full">
            <div className="flex flex-col text-2xl w-1/3">
              <div className="flex p-2 ">
                <p className="font-medium">Number of Rows:</p>
                &nbsp;
                <p className="text-[#8080FF]">{template.number_of_rows}</p>
              </div>
              <div className="flex p-2 ">
                <p className="font-medium">Number of Columns:</p>
                &nbsp;
                <p className="text-[#8080FF]">{template.number_of_columns}</p>
              </div>
              <div className="flex p-2 ">
                <p className="font-medium">Room Strength:</p>
                &nbsp;
                <p className="text-[#8080FF]">{template.room_strength}</p>
              </div>

              <div className="flex p-2 ">
                <p className="font-medium">Is Single Seater?:</p>
                &nbsp;
                <p className="text-[#8080FF]">
                  {template.is_single_seater.toString()}
                </p>
              </div>
              <div className="flex p-2 ">
                <p className="font-medium">Are boys and girls separated?:</p>
                &nbsp;
                <p className="text-[#8080FF]">
                  {template.is_boys_girls_separation.toString()}
                </p>
              </div>
              <div className="flex p-2 ">
                <p className="font-medium">Start time for examination:</p>
                &nbsp;
                <p className="text-[#8080FF]">
                  {template.start_time.toString()}
                </p>
              </div>
            </div>
            <div className="flex flex-col text-2xl w-2/3">
              <div className="flex p-2">
                <p className="font-medium">End Time for examination:</p>
                &nbsp;
                <p className="text-[#8080FF]">{template.end_time.toString()}</p>
              </div>
              <div className="flex p-2">
                <p className="font-medium">
                  Are alternate departments seated together?:
                </p>
                &nbsp;
                <p className="text-[#8080FF]">
                  {template.is_alternate_dept_seated.toString()}
                </p>
              </div>
              <div className="flex p-2">
                <p className="font-medium">Logo: </p>
                &nbsp;
                {/* <p className="text-[#8080FF]">{template.logo}</p> */}
                <Image
                      src={`data:image/png;base64,${logoUrl}`}
                      width={400}
                      height={400}
                      alt="dasd"
                      className="object-contain pr-4"
                    />{" "}
              </div>
              <div className="flex p-2">
                <p className="font-medium">Rooms: </p>
                &nbsp;
                <div className="gap-2 flex flex-wrap  ">
                  {template.rooms.map((room: any) => (
                    <p className="text-[#8080FF]">{room},</p>
                  ))}
                </div>
              </div>
              <div className="flex p-2">
                <p className="font-medium">Buildings: </p>
                &nbsp;
                <div className="gap-2 flex ">
                  {template.buildings.map((building: any) => (
                    <p className="text-[#8080FF]">{building},</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TemplateNamePage;

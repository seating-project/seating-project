import Navbar from "../../components/Navbar";
import React from "react";
import "../../styles/globals.css";
import drf from "../../pages/api/axiosConfig";
import TemplateCard from "../../components/TemplateCard";

type Props = {};

async function getTemplateData() {
    try {
        const res = await drf.get("/templates/");
        return res.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}



const TemplatesPage = async (props: Props) => {

    const tdata = await getTemplateData();
    console.log(tdata);


  return (
    <>
      <Navbar />
        <div className="bg-cover bg-light-blue flex">

            <div className="flex flex-col">
                {/* <Navbar /> */}
                <div className="flex flex-col">
                    {/* <Header /> */}
                    <div className="flex p-4 flex-wrap flex-row items-center">
                        {tdata.map((item: { template_name: any }) => (
                            <TemplateCard name={item.template_name} />
                        ))
                        }                    
                    </div>
                    <div className="flex p-4 flex-wrap flex-row items-center">
                        <div className="flex flex-col items-center justify-center w-1/4 h-1/4 m-4 p-4 min-h-[200px] min-w-[200px] rounded-2xl  bg-gray-300 bg-opacity-40 backdrop-blur-md drop-shadow-lg">
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-2xl font-mono text-center">
                                    Create New Template
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="">

            </div> */}
        </div>

    </>
  );
};

export default TemplatesPage;

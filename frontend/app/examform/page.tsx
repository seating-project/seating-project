import axios from "axios";
import ExamForm from "../../components/ExamForm";
import drf from "../../pages/api/axiosConfig"

async function getTemplateData() {
  try {
    const res = await drf.get("/examtemplate/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getDeptDate() {
  try {
    const res = await drf.get("/dept/");
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
}


export default async function Form() {

  
  const dept_opt = await getDeptDate();
  console.log("DEPARTMENTS ", dept_opt);


  const templates = await getTemplateData();
  console.log(templates);
  return <ExamForm templates={templates} departments={dept_opt}/>;
}

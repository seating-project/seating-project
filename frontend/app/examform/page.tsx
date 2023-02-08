import axios from "axios";
import ExamForm from "../../components/ExamForm";

async function getTemplateData() {
  try {
    const res = await axios.get("http://127.0.0.1:8080/examtemplate/");
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Form() {
  const templates = await getTemplateData();
  console.log(templates);
  return <ExamForm templates={templates} />;
}

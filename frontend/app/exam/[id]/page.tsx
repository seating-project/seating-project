import drf from "../../../pages/api/axiosConfig";

export default async function ProductPage({ params }) {
  async function getExamData() {
    try {
      const res = await drf.get("/exams/");
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const id = params.id;

  console.log("PARAAMS", params);

  const edata = await getExamData();
  console.log(edata);

  let exam = edata.filter((item: { id: any }) => item.id == id);
  exam = exam[0];

  return (
    <div className="m-2">
      <h1 className="text-6xl fold-bold font-mono">{exam.name}</h1>
      <p className="font-mono p-1 text-xl">ID: {id}</p>
    </div>
  );
}

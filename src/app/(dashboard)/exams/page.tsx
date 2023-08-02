import ExamTable from "@/components/tables/ExamsTable";
import { api } from "@/trpc/server";


export default async function ExamPage() {

  const exams = await api.exam.getLatestExams.query();

  async function getTemplateName(templateId:number) {
    const template = await api.template.getTemplateName.query({ id: templateId });
    return template;
  }

  const requiredExamData = exams.map((exam) => {
    
    const templateName = getTemplateName(exam.templateId); 
    return {
      id: exam.id,
      name: exam.name,
      template: exam.Template,
      startDate: exam.startDate,
      endDate: exam.endDate,
      departments: exam.Departments,

    };
  });

  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Templates</p>
        <div className="my-4">
          <ExamTable data={requiredExamData} />
        </div>
      </div>
    </div>
  );
}

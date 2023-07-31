import CreateExamForm from "@/components/forms/CreateExamForm";
import { api } from "@/trpc/server";

export default async function CreateNewExamPage() {

  const departments = await api.department.getDepartments.query()
  const requiredDepartments = departments.map((department) => ({
    value: department.branch,
    label: department.branch,
  }));

  const templates = await api.template.getTemplates.query()
  const requiredTemplates = templates.map((template) => ({
    value: template.name,
    label: template.name,
  }));

  const years = await api.year.getYears.query()
  const requiredYears = years.map((year) => ({
    value: String(year.year),
    label: String(year.year),
  }));


  return (
    <div className="w-full h-full ">
      <div className="h-full">
        <div className="p-8 w-1/3 border-r h-full">
          <p className="text-2xl font-bold">Create New Exam</p>

          <div className="my-4 w-full">
            <CreateExamForm departments={requiredDepartments} templates={requiredTemplates} years={requiredYears} />
          </div>
          <div>{/* {Exam Sheet} */}</div>
        </div>
      </div>
    </div>
  );
}

import CreateExamForm from "@/components/forms/CreateExamForm";
import { api } from "@/trpc/server";

export default async function CreateNewExamPage() {
  const departments = await api.department.getDepartments.query();
  const requiredDepartments = departments.map((department) => ({
    value: department.branch,
    label: department.branch,
  }));

  const templates = await api.template.getTemplatesIncludingRooms.query();
  const requiredTemplates = templates.map((template) => ({
    value: template.name,
    label: template.name,
  }));

  const templateData = templates.map((template) => ({
    ...template,
  }));

  const years = await api.year.getYears.query();
  const requiredYears = years.map((year) => ({
    value: String(year.year),
    label: String(year.year),
  }));

  return (
    <div className="h-full w-full ">
      <div className="h-full">
        <div className="h-full w-1/3 border-r p-8">
          <p className="text-2xl font-bold">Create New Exam</p>

          <div className="my-4 w-full">
            <CreateExamForm
              departments={requiredDepartments}
              templates={requiredTemplates}
              templateData={templateData}
              years={requiredYears}
            />
          </div>
          <div>{/* {Exam Sheet} */}</div>
        </div>
      </div>
    </div>
  );
}

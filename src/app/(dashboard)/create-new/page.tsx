import CreateExamForm from "@/components/forms/CreateExamForm";
import { api } from "@/trpc/server";

export default async function CreateNewExamPage() {
  const departments = await api.department.getDepartments.query();
  const requiredDepartments = departments.map((department) => ({
    value: department.shortName,
    label: department.shortName,
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
    <div className="w-full">
      <CreateExamForm
        departments={requiredDepartments}
        templates={requiredTemplates}
        templateData={templateData}
        years={requiredYears}
      />
    </div>
  );
}

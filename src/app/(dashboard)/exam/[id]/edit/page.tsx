import React from "react";

import EditExamForm from "@/components/forms/EditExamForm";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ExamEditPage = async (props: Props) => {
  const params = await props.params;
  const exam = await api.exam.getExamById({
    id: Number(params.id),
  });

  const departments = await api.department.getDepartments();
  const requiredDepartments = departments.map((department) => ({
    value: department.shortName,
    label: department.shortName,
  }));
  requiredDepartments.sort((a, b) => a.value.localeCompare(b.value));

  const templates = await api.template.getTemplatesIncludingRooms();
  const requiredTemplates = templates.map((template) => ({
    value: template.name,
    label: template.name,
  }));

  const templateData = templates.map((template) => ({
    ...template,
  }));

  const years = await api.year.getYears();
  const requiredYears = years.map((year) => ({
    value: String(year.year),
    label: String(year.year),
  }));

  const colleges = await api.college.getColleges();
  const requiredColleges = colleges.map((college) => ({
    value: college.name,
    label: college.name,
  }));

  return (
    <div className="w-full">
      <EditExamForm
        exam={exam}
        departments={requiredDepartments}
        templates={requiredTemplates}
        templateData={templateData}
        years={requiredYears}
        colleges={requiredColleges}
      />
    </div>
  );
};

export default ExamEditPage;

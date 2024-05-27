import React from "react";

import EditExamForm from "@/components/forms/EditExamForm";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

const ExamEditPage = async (props: Props) => {
  const exam = await api.exam.getExamById.query({
    id: Number(props.params.id),
  });

  const departments = await api.department.getDepartments.query();
  const requiredDepartments = departments.map((department) => ({
    value: department.shortName,
    label: department.shortName,
  }));
  requiredDepartments.sort((a, b) => a.value.localeCompare(b.value));

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

  const colleges = await api.college.getColleges.query();
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

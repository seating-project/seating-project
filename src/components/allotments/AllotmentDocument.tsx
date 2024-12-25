import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/react";

import AllotmentTemplate from "./AllotmentTemplate";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
};

const AllotmentDocument = async ({ exam, template, date }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const allotments = await api.allotment.createAllotment({
    examId: exam.id,
    templateId: template.id,
    date: date,
  });

  const logo = await api.template.getLogo({
    id: template.logoId,
  });
  const departments = await api.department.getDepartments();

  return (
    <AllotmentTemplate
      exam={exam}
      template={template}
      date={date}
      logo={logo}
      departments={departments}
      allotments={allotments}
    />
  );
};

export default AllotmentDocument;

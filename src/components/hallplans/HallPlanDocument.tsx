import React from "react";

import HallPlanTemplate from "@/components/hallplans/HallPlanTemplate";
import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
};

const HallPlanDocument = async ({ exam, template, date }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const hallplan = await api.allotment.createHallPlanForAll({
    examId: exam.id,
    templateId: template.id,
    date: date,
  });

  const departments = await api.department.getDepartments();
  const years = await api.year.getYears();
  const rooms = await api.room.getRooms();

  return (
    <HallPlanTemplate
      exam={exam}
      template={template}
      date={date}
      hallplan={hallplan}
      departments={departments}
      years={years}
      rooms={rooms}
    />
  );
};

export default HallPlanDocument;

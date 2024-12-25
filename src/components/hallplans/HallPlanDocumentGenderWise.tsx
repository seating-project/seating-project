import React from "react";

import HallPlanTemplateGenderWise from "@/components/hallplans/HallPlanTemplateGenderWise";
import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
  gender: "boys" | "girls";
};

const HallPlanDocument = async ({ exam, template, date, gender }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const departments = await api.department.getDepartments();
  const years = await api.year.getYears();
  const rooms = await api.room.getRooms();

  const hallplan = await api.allotment.createHallPlanGenderWise({
    examId: exam.id,
    templateId: template.id,
    date: date,
  });

  return (
    <HallPlanTemplateGenderWise
      exam={exam}
      template={template}
      date={date}
      hallplan={hallplan}
      departments={departments}
      years={years}
      rooms={rooms}
      gender={gender}
    />
  );
};

export default HallPlanDocument;

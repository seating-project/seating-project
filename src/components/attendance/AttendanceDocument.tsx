import React from "react";

import AttendanceTemplate from "@/components/attendance/AttendanceTemplate";
import type { RouterOutputs } from "@/trpc/react";
import { api } from "@/trpc/server";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
  room: string;
};

const AttendanceDocument = async ({ exam, template, date, room }: Props) => {
  const attendance = await api.allotment.createAttendance({
    examId: exam?.id ?? 0,
    templateId: template?.id ?? 0,
    date: date,
    room: room,
  });
  const departments = await api.department.getDepartments();
  const years = await api.year.getYears();

  return (
    <AttendanceTemplate
      exam={exam}
      template={template}
      attendance={attendance}
      departments={departments}
      years={years}
      date={date}
      room={room}
    />
  );
};

export default AttendanceDocument;

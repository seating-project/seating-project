import React from "react";

import AttendanceDocument from "@/components/attendance/AttendanceDocument";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
    date: string;
    room: string;
  }>;
};

const AttendancePage = async (props: Props) => {
  const params = await props.params;
  const examId = decodeURIComponent(params.id);
  const date = decodeURIComponent(params.date);
  const room = decodeURIComponent(params.room);

  const exam = await api.exam.getExamById({
    id: Number(examId),
  });

  const template = await api.template.getTemplate({
    id: exam?.templateId ?? 0,
  });

  return (
    <div>
      {" "}
      <AttendanceDocument
        exam={exam}
        template={template}
        date={date}
        room={room}
      />
    </div>
  );
};

export default AttendancePage;

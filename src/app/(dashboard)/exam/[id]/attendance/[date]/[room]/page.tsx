import React from "react";

import AttendanceDocument from "@/components/attendance/AttendanceDocument";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
    date: string;
    room: string;
  };
};

const AttendancePage = async (props: Props) => {
  const examId = decodeURIComponent(props.params.id);
  const date = decodeURIComponent(props.params.date);
  const room = decodeURIComponent(props.params.room);

  const exam = await api.exam.getExamById.query({
    id: Number(examId),
  });

  const template = await api.template.getTemplate.query({
    id: exam?.templateId ?? 0,
  });

  return (
    <div>
      {" "}
      <AttendanceDocument exam={exam} template={template} date={date} room={room} />
    </div>
  );
};

export default AttendancePage;

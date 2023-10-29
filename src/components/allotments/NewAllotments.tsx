import React from "react";

import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/shared";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
};

const NewAllotments = async ({ exam, template }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const allotments = await api.allotment.createAllotment.query({
    examId: exam.id,
    templateId: template.id,
  });

  // console.log("ALLOTMENTS", allotments);

  return (
    <div className="p-8">
      {Object.keys(allotments)?.map((allotment) => {  
        return (
          <div className="p-8" key={allotment}>
            <p>Exam: {exam.name}</p>
            <p>Template: {template.name}</p>
            <p>Room: {allotment}</p>
            {allotments[allotment]?.map((student) => {
              return (
                <div key={student[0]?.name + " " + student[1]?.name ?? " "}>
                  <p>
                    {student[0]?.name  + " " + student[1]?.name + " " + student[0]?.departmentId + " " + student[1]?.departmentId ?? "  "}
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default NewAllotments;

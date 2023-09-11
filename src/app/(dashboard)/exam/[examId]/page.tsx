import Allotments from "@/components/allotments/Allotments";
import { Button } from "@/components/ui/button";
import { getTimeTableDates } from "@/lib/utils";
import { api } from "@/trpc/server";
import type { TimeTable } from "@/types";
import Link from "next/link";

type Props = {
  params: {
    examId: string;
  };
};

const ExamPage = async (props: Props) => {
  const examId = decodeURIComponent(props.params.examId);
  const exam = await api.exam.getExamById.query({ id: Number(examId) });
  const timetable = exam?.Timetable;
  const examDates = getTimeTableDates(timetable as TimeTable);

  

  if (exam === null) {
    return (
      <div className="fle x-col flex h-96  w-full items-center justify-center space-y-8 p-8">
        <p className="text-4xl font-bold underline">Exam not found</p>
        <div className="space-x-4">
          <Button>
            <Link href="/exams">Go to Exams</Link>
          </Button>
          <Button>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <p className="text-4xl font-bold"> {exam.name} </p>
      <div className="my-8 flex flex-col">
        <p className="text-xl">
          {" "}
          From {exam.startDate.toLocaleDateString()} to{" "}
          {exam.endDate.toLocaleDateString()}
        </p>
      </div>
      <Allotments examId={Number(examId)} dates={examDates} />
    </div>
  );
};

export default ExamPage;

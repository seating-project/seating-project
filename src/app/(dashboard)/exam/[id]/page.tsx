import Link from "next/link";

import Allotments from "@/components/allotments/Allotments";
import HallPlans from "@/components/hallplans/HallPlans";
import MainNav from "@/components/navbar/MainNav";
import { Button } from "@/components/ui/button";
import { getTimeTableDates } from "@/lib/utils";
import { api } from "@/trpc/server";
import type { TimeTable } from "@/types";
import Attendances from "@/components/attendance/Attendances";

type Props = {
  params: {
    id: string;
  };
};

const ExamPage = async (props: Props) => {
  const exam = await api.exam.getExamById.query({
    id: Number(props.params.id),
  });
  const timetable = exam?.Timetable;
  const examDates = getTimeTableDates(timetable as TimeTable);

  console.log("LMAOOOO", props.params.id);

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
    <div>
      <div className="sticky top-0 z-10">
        <MainNav />
      </div>
      <div className="p-8">
        <p className="text-4xl font-bold"> {exam.name} </p>
        <div className="my-8 flex flex-col">
          <p className="text-xl">
            {" "}
            From {exam.startDate.toLocaleDateString()} to{" "}
            {exam.endDate.toLocaleDateString()}
          </p>
        </div>
        <Allotments examId={Number(props.params.id)} dates={examDates} />
        <HallPlans exam={exam} dates={examDates} />
        <Attendances examId={Number(props.params.id)} dates={examDates} timetable={timetable as TimeTable} />
      </div>
    </div>
  );
};

export default ExamPage;

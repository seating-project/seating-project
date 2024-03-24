import Link from "next/link";

import Allotments from "@/components/allotments/Allotments";
import Attendances from "@/components/attendance/Attendances";
import DownloadButton from "@/components/client/DownloadButton";
import HallPlans from "@/components/hallplans/HallPlans";
import MainNav from "@/components/navbar/MainNav";
import { Button } from "@/components/ui/button";
import {
  findDateRangesWithDifferences,
  getTimeTableBasedOnDays,
  getTimeTableDates,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import type { TimeTable } from "@/types";

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
  console.log("====================================");
  console.log("Exam ", exam);
  console.log("====================================");
  console.log("LMAOOOO", props.params.id);

  const links = [];
  // for (let i = 0; i < examDates.length; i++) {
  //   links.push(`/exam/${exam?.id}/allotment/${examDates[i]}`);
  // }

  for (const date of examDates) {
    links.push(`/exam/${exam?.id}/allotment/${date}`);
  }
  if (!exam?.Template.isBoysGirlsSeparate) {
    for (const date of examDates) {
      links.push(`/exam/${exam?.id}/hallplan/${date}`);
    }
  } else {
    for (const date of examDates) {
      links.push(`/exam/${exam?.id}/hallplan/${date}/boys`);
      links.push(`/exam/${exam?.id}/hallplan/${date}/girls`);
    }
  }
  const timeTableBasedOnDays = getTimeTableBasedOnDays(timetable as TimeTable);
  const dateRangesWithDifferences =
    findDateRangesWithDifferences(timeTableBasedOnDays);
  const rooms: string[][] = [];
  await Promise.all(
    dateRangesWithDifferences.map(async (dateRange) => {
      const roomsForOneDate = await api.allotment.getAttendanceRooms.query({
        examId: exam?.id ?? 0,
        date: dateRange[0],
      });
      rooms.push(roomsForOneDate);
    }),
  );
  dateRangesWithDifferences.map((dateRange, index) => {
    if (dateRange[0] === dateRange[1]) {
      rooms[index]?.map((room) => {
        links.push(`/exam/${exam?.id}/attendance/${dateRange[0]}/${room}`);
      });
    } else {
      rooms[index]?.map((room) => {
        links.push(`/exam/${exam?.id}/attendance/${dateRange[0]}/${room}`);
      });
    }
  });
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
        <div className="flex justify-between items-center">
          <p className="text-4xl font-bold"> {exam.name} </p>
          <div>
            <Link href={`/exam/${exam.id}/edit`}>
              <Button>Edit Exam</Button>
            </Link>
          </div>
        </div>
        <div className="my-8 flex flex-col">
          <p className="text-xl">
            {" "}
            From {exam.startDate.toLocaleDateString()} to{" "}
            {exam.endDate.toLocaleDateString()}
          </p>
        </div>
        <div>
          <DownloadButton links={links} />
        </div>
        <Allotments examId={Number(props.params.id)} dates={examDates} />
        <HallPlans exam={exam} dates={examDates} />
        <Attendances
          examId={Number(props.params.id)}
          dates={examDates}
          timetable={timetable as TimeTable}
        />
      </div>
    </div>
  );
};

export default ExamPage;

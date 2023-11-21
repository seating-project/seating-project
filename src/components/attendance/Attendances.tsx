import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  findDateRangesWithDifferences,
  getTimeTableBasedOnDays,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import type { TimeTable } from "@/types";
import Link from "next/link";

type Props = {
  examId: number;
  dates: string[];
  timetable: TimeTable;
};

const Attendances = async ({ examId, dates, timetable }: Props) => {
  const timeTableBasedOnDays = getTimeTableBasedOnDays(timetable);
  const dateRangesWithDifferences =
    findDateRangesWithDifferences(timeTableBasedOnDays);

  const rooms: string[][] = []
  await Promise.all(
  dateRangesWithDifferences.map(async (dateRange) => {
    const roomsForOneDate = await api.allotment.getAttendanceRooms.query({
      examId: examId,
      date: dateRange[0],
    });
    rooms.push(roomsForOneDate)
  })
  )

  console.log("ROoms", rooms)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Copies</CardTitle>
        <CardDescription>The attendance sheets for the exam</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex flex-row space-x-4">
            {dateRangesWithDifferences.map((dateRange, index) => {
              if (dateRange[0] === dateRange[1]) {
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Attendance for {dateRange[0]}</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                      {
                          rooms[index]?.map((room, index) => {
                            return (
                              <div key={index}>
                                <Link
                                  href={`/exam/${examId}/attendance/${dateRange[0]}/${room}`}
                                >
                                  {room}
                                </Link>
                              </div>
                            );
                          })
                        }
                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                return (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>
                        Attendance for {dateRange[0]} to {dateRange[1]}
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        {
                          rooms[index]?.map((room, index) => {
                            return (
                              <div key={index}>
                                <Link
                                  href={`/exam/${examId}/attendance/${dateRange[0]}/${room}`}
                                >
                                  {room}
                                </Link>
                              </div>
                            );
                          })
                        }
                      </div>
                    </CardContent>
                  </Card>
                );
              }
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Attendances;

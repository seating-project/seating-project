import Link from "next/link";

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

import { Button } from "../ui/button";

type Props = {
  examId: number;
  dates: string[];
  timetable: TimeTable;
};

const Attendances = async ({ examId, timetable }: Props) => {
  const timeTableBasedOnDays = getTimeTableBasedOnDays(timetable);
  const dateRangesWithDifferences =
    findDateRangesWithDifferences(timeTableBasedOnDays);

  const rooms: string[][] = [];
  await Promise.all(
    dateRangesWithDifferences.map(async (dateRange) => {
      const roomsForOneDate = await api.allotment.getAttendanceRooms({
        examId: examId,
        date: dateRange[0],
      });
      rooms.push(roomsForOneDate);
    }),
  );

  return (
    <Card className="my-2">
      <CardHeader>
        <CardTitle>Attendance Copies</CardTitle>
        <CardDescription>The attendance sheets for the exam</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <div className="flex flex-col space-y-4">
            {dateRangesWithDifferences.map((dateRange, index) => {
              if (dateRange[0] === dateRange[1]) {
                return (
                  <Card
                    key={index}
                    className="flex w-full items-center space-x-2"
                  >
                    <CardHeader>
                      <CardTitle>
                        Attendance for{" "}
                        {new Date(dateRange[0]).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row">
                      <div className="item-center flex flex-row gap-2">
                        {rooms[index]?.map((room, index) => {
                          return (
                            <div key={index}>
                              <Button>
                                <Link
                                  href={`/exam/${examId}/attendance/${dateRange[0]}/${room}`}
                                >
                                  {room}
                                </Link>
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                );
              } else {
                return (
                  <Card
                    key={index}
                    className="flex w-full items-center space-x-2"
                  >
                    <CardHeader>
                      <CardTitle>
                        Attendance for{" "}
                        {new Date(dateRange[0]).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        to{" "}
                        {new Date(dateRange[1]).toLocaleDateString("en-IN", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-row">
                      <div className="flex flex-row flex-wrap gap-2 ">
                        {rooms[index]?.map((room, index) => {
                          return (
                            <div key={index}>
                              <Button>
                                <Link
                                  href={`/exam/${examId}/attendance/${dateRange[0]}/${room}`}
                                >
                                  {room}
                                </Link>
                              </Button>
                            </div>
                          );
                        })}
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

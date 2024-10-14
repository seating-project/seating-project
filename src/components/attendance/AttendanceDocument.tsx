import React from "react";
import Image from "next/image";

import {
  cn,
  findDateRangesWithDifferences,
  getSuffix,
  getTimeTableBasedOnDays,
} from "@/lib/utils";
import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/shared";
import type { TimeTable } from "@/types";

import Page from "../page/PotraitPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
  room: string;
};

const AttendanceDocument = async ({ exam, template, date, room }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const timetable = exam?.Timetable as TimeTable;
  const timeTableBasedOnDays = getTimeTableBasedOnDays(timetable);
  const dateRangesWithDifferences =
    findDateRangesWithDifferences(timeTableBasedOnDays);
  const currentDateRange = dateRangesWithDifferences.find((dateRange) => {
    return dateRange[0] === date;
  });

  function extractDates(): string[] {
    const datesArray: string[] = [];
    for (const year of Object.values(timetable)) {
      for (const department of Object.values(year)) {
        const dates = Object.keys(department);
        dates.forEach((date) => {
          if (!datesArray.includes(date)) {
            datesArray.push(date);
          }
        });
      }
    }

    datesArray.sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    return datesArray;
  }
  const datesThatHaveExams = extractDates();

  function findNumberOfDays(dateRange: string[]) {
    const start = new Date(dateRange[0] ?? "");
    const end = new Date(dateRange[1] ?? "");
    // Should be inclusive of start and end
    const days =
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
    return days;
  }

  function findAllDates(dateRange: string[]) {
    const start = new Date(dateRange[0] ?? "");
    const end = new Date(dateRange[1] ?? "");
    const dates = [];
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
      if (datesThatHaveExams.includes(date.toISOString().split("T")[0] ?? ""))
        dates.push(new Date(date));
    }
    return dates;
  }

  console.log("DATE RANGES", dateRangesWithDifferences);
  const attendance = await api.allotment.createAttendance.query({
    examId: exam?.id ?? 0,
    templateId: template?.id ?? 0,
    date: date,
    room: room,
  });

  // console.log("ATTENDANCE", attendance);

  const colSpan = 7 + findNumberOfDays(currentDateRange ?? []);
  console.log("COLSPAN", colSpan);

  const departments = await api.department.getDepartments.query();
  const years = await api.year.getYears.query();

  const allDates = findAllDates(currentDateRange ?? []);

  return (
    <div>
      <Page>
        <Table className="overflow-x">
          <TableHeader>
            <TableRow>
              <TableHead
                className="border text-center text-2xl text-black"
                colSpan={colSpan}
              >
                <div className="flex w-full items-center justify-center">
                  <Image
                    src={template.Logo.image}
                    width={400}
                    height={400}
                    alt="dasd"
                    className="object-contain"
                  />
                </div>
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border text-center text-2xl text-black"
                colSpan={colSpan}
              >
                {exam.name}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border text-center text-2xl text-black"
                colSpan={colSpan}
              >
                Attendance - Room {room}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className={cn(
                  "border text-center text-black",
                  colSpan > 7 ? "p-0.5" : "",
                )}
                colSpan={1}
              >
                S.No
              </TableHead>
              <TableHead
                className={cn(
                  "border text-center text-black",
                  colSpan > 7 ? "p-0.5" : "",
                )}
                colSpan={1}
              >
                Reg. No.
              </TableHead>
              <TableHead
                className={cn(
                  "border text-center text-black",
                  colSpan > 7 ? "p-0.5" : "",
                )}
                colSpan={1}
              >
                Name
              </TableHead>
              <TableHead
                className={cn(
                  "border text-center text-black",
                  colSpan > 7 ? "p-0.5" : "",
                )}
                colSpan={1}
              >
                Dept
              </TableHead>
              {allDates.map((date, index) => {
                return (
                  <TableHead
                    className="border p-0.5 text-center text-xs text-black"
                    colSpan={1}
                    key={index}
                  >
                    {date.toLocaleDateString()}
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>
          {Object.keys(attendance)?.map((key) => {
            const department = departments.find((dept) => {
              return dept.id === Number(key.split(" ")[0]);
            });
            const year = years.find((yr) => {
              return yr.id === Number(key.split(" ")[1]);
            });
            return (
              <TableBody key={key}>
                <TableRow>
                  <TableCell
                    colSpan={colSpan}
                    className="border text-center text-xl font-medium"
                  >
                    {`
                        ${department?.branch ?? ""} (${
                          department?.shortName ?? ""
                        }) ${year?.year}${getSuffix(year?.year ?? 0)} Year
                        `}
                  </TableCell>
                </TableRow>
                {attendance[key]?.map((student, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell
                        className={cn(
                          "border p-0 text-center  text-black",
                          colSpan > 7 ? "p-0.5 text-xs" : "",
                        )}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "border p-0 text-center  text-black",
                          colSpan > 7 ? "p-0.5 text-xs" : "",
                        )}
                      >
                        {exam.isRollNumber
                          ? student.rollNumber
                          : student.registerNumber}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "border p-0 text-center  text-black",
                          colSpan > 7 ? "p-0.5 text-xs" : "",
                        )}
                      >
                        {student.name}
                      </TableCell>
                      <TableCell
                        className={cn(
                          "border p-0 text-center  text-black",
                          colSpan > 7 ? "p-0.5 text-xs" : "",
                        )}
                      >
                        {department?.shortName ?? ""}
                      </TableCell>
                      {allDates.map((date, index) => {
                        return (
                          <TableCell
                            className="w-[50px] border text-center text-black"
                            key={index}
                          ></TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            );
          })}
        </Table>
      </Page>
    </div>
  );
};

export default AttendanceDocument;

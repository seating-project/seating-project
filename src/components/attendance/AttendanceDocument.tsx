import React from "react";
import Image from "next/image";

import {
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

  const colSpan = 4 + findNumberOfDays(currentDateRange ?? []);
  console.log("COLSPAN", colSpan);

  const departments = await api.department.getDepartments.query();
  const years = await api.year.getYears.query();

  const allDates = findAllDates(currentDateRange ?? []);

  return (
    <div>
      <Page>
        <Table>
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
              <TableCell className="border text-center text-black" colSpan={1}>
                S.No
              </TableCell>
              <TableCell className="border text-center text-black" colSpan={1}>
                Reg. No.
              </TableCell>
              <TableCell className="border text-center text-black" colSpan={1}>
                Name
              </TableCell>
              <TableCell className="border text-center text-black" colSpan={1}>
                Dept
              </TableCell>
              {allDates.map((date, index) => {
                return (
                  <TableCell
                    className="border text-center text-black"
                    colSpan={1}
                    key={index}
                  >
                    {date.toLocaleDateString()}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHeader>
          {Object.keys(attendance)?.map((key, index) => {
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
                      <TableCell className="border text-center text-black p-0">
                        {index + 1}
                      </TableCell>
                      <TableCell className="border text-center text-black">
                        {student.registerNumber}
                      </TableCell>
                      <TableCell className="border text-center text-black">
                        {student.name}
                      </TableCell>
                      <TableCell className="border text-center text-black">
                        {department?.shortName ?? ""}
                      </TableCell>
                      {allDates.map((date, index) => {
                        return (
                          <TableCell
                            className="border text-center text-black"
                            key={index}
                          >
                            
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
                )}
              </TableBody>
            );
          })}
        </Table>
      </Page>
    </div>
  );
};

export default AttendanceDocument;

import React from "react";

import Page from "@/components/page/PotraitPage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { getNumberNames, getSuffix } from "@/lib/utils";
import type { RouterOutputs } from "@/trpc/react";

type Props = {
  exam: RouterOutputs["exam"]["getExamById"];
  template: RouterOutputs["template"]["getTemplate"];
  date: string;
  hallplan: RouterOutputs["allotment"]["createHallPlanForAll"];
  departments: RouterOutputs["department"]["getDepartments"];
  years: RouterOutputs["year"]["getYears"];
  rooms: RouterOutputs["room"]["getRooms"];
};

const HallPlanTemplate = ({
  exam,
  template,
  date,
  hallplan,
  departments,
  years,
  rooms,
}: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  let overallTotalCount = 0;

  const departmentOrder = exam.departmentOrderArray;

  const departmentsInThisOrder = departmentOrder.flatMap((deptShortName) =>
    exam.Years.map((year) => {
      const d = departments.find((dept) => dept.shortName === deptShortName);
      return `${d?.id} ${year.year}`;
    }),
  );

  const hallPlanKeys = Object.keys(hallplan);
  // Sort based on departmentsInThisOrder
  hallPlanKeys.sort((a, b) => {
    return (
      departmentsInThisOrder.indexOf(a) - departmentsInThisOrder.indexOf(b)
    );
  });

  return (
    <div>
      <Page>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="border border-black text-center text-2xl text-black"
                colSpan={5}
              >
                <div className="flex w-full items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`${env.BASE_URL}/${template.Logo.image}`}
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
                className="border border-black text-center text-2xl text-black"
                colSpan={5}
              >
                {exam.name}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border border-black text-center text-lg text-black"
                colSpan={2}
              >
                Hall Arrangement
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
              >
                Date:{" "}
                {new Date(date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={2}
              >
                Timings:{" "}
                {template?.startTime &&
                template.startTime instanceof Date &&
                template?.endTime &&
                template.endTime instanceof Date
                  ? template?.startTime
                      ?.toLocaleTimeString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })
                      .toUpperCase() +
                    " to " +
                    template?.endTime
                      ?.toLocaleTimeString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })
                      .toUpperCase()
                  : new Date(template?.startTime)
                      ?.toLocaleTimeString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })
                      .toUpperCase() +
                    " to " +
                    new Date(template?.endTime)
                      ?.toLocaleTimeString("en-US", {
                        timeZone: "Asia/Kolkata",
                      })
                      .toUpperCase()}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
                rowSpan={2}
              >
                S.No
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
                rowSpan={2}
              >
                Room
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={2}
              >
                Register Number Range
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
                rowSpan={2}
              >
                Strength
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
              >
                Starting
              </TableHead>
              <TableHead
                className="border border-black text-center text-black"
                colSpan={1}
              >
                Ending
              </TableHead>
            </TableRow>
          </TableHeader>

          {hallPlanKeys?.map((departmentYear) => {
            const department = departments.find((dept) => {
              return dept.id === Number(departmentYear.split(" ")[0]);
            });
            const year = years.find((yr) => {
              return yr.id === Number(departmentYear.split(" ")[1]);
            });
            if (!department || !year) {
              return null;
            }
            let deptCount = 0;
            return (
              <TableBody key={departmentYear} className="unbreak">
                <TableRow>
                  <TableCell
                    className="border border-black text-center text-xl font-medium"
                    colSpan={5}
                  >
                    {`
                      ${department?.branch ?? ""} (${
                        department?.shortName ?? ""
                      }) ${year?.year}${getSuffix(year?.year ?? 0)} Year
                      `}
                  </TableCell>
                </TableRow>
                {hallplan[departmentYear]?.map((room, index) => {
                  const currentRoom = Object.keys(room)[0];
                  const currentRoomInfo = Object.values(room)[0];
                  const roomObject = rooms.find((roomObj) => {
                    return roomObj.number === currentRoom;
                  });
                  deptCount += currentRoomInfo?.strength ?? 0;
                  overallTotalCount += currentRoomInfo?.strength ?? 0;
                  return (
                    <>
                      <TableRow>
                        <TableCell
                          className="border border-black text-center"
                          colSpan={1}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell className="border border-black" colSpan={1}>
                          <b className="text-xl font-medium"> {currentRoom} </b>{" "}
                          <br />
                          {getNumberNames(roomObject?.floor ?? 0) +
                            " Floor"} - {roomObject?.Block.name} -{" "}
                          {roomObject?.Building.name}
                        </TableCell>
                        <TableCell
                          className="border border-black font-medium"
                          colSpan={1}
                        >
                          {currentRoomInfo?.startRegisterNumber}
                        </TableCell>
                        <TableCell
                          className="border border-black font-medium"
                          colSpan={1}
                        >
                          {currentRoomInfo?.endRegisterNumber}
                        </TableCell>
                        <TableCell
                          className="border border-black font-medium"
                          colSpan={1}
                        >
                          {currentRoomInfo?.strength}
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                <TableRow>
                  <TableCell
                    className="border border-black font-medium"
                    colSpan={4}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className="border border-black font-medium"
                    colSpan={1}
                  >
                    {deptCount}
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
          <TableBody>
            <TableRow>
              <TableCell
                className="border border-black text-center"
                colSpan={4}
              >
                <b className="text-xl font-medium"> Overall Total </b>
              </TableCell>
              <TableCell
                className="border border-black text-center text-xl font-medium"
                colSpan={1}
              >
                {overallTotalCount}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Page>
    </div>
  );
};

export default HallPlanTemplate;

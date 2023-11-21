import React from "react";
import Image from "next/image";

import Page from "@/components/page/PotraitPage";
import { getNumberNames, getSuffix } from "@/lib/utils";
import { api } from "@/trpc/server";
import type { RouterOutputs } from "@/trpc/shared";

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
  gender: "boys" | "girls";
};

const HallPlanDocument = async ({ exam, template, date, gender }: Props) => {
  if (exam === null || template === null) {
    return (
      <div>
        <p>Exam or Template not found</p>
      </div>
    );
  }

  const departments = await api.department.getDepartments.query();
  const years = await api.year.getYears.query();
  const rooms = await api.room.getRooms.query();

  const hallplan = await api.allotment.createHallPlanGenderWise.query({
    examId: exam.id,
    templateId: template.id,
    date: date,
  });

  console.log("HALLPLAN", hallplan);

  return (
    <div>
      <Page>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="border text-center text-2xl text-black"
                colSpan={5}
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
                colSpan={5}
              >
                {exam.name} - {gender.toUpperCase()}
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead
                className="border text-center text-lg text-black"
                colSpan={5}
              >
                Hall Arrangement
              </TableHead>
            </TableRow>
            <TableRow>
              <TableHead className="border text-center text-black" colSpan={2}>
                Date: {date}
              </TableHead>
              <TableHead className="border text-center text-black" colSpan={3}>
                Timings:{" "}
                {template?.startTime.toLocaleTimeString().toUpperCase() +
                  " to " +
                  template?.endTime.toLocaleTimeString().toUpperCase()}
              </TableHead>
            </TableRow>

            <TableRow>
              <TableHead className="border text-center text-black" colSpan={1}>
                S.No
              </TableHead>
              <TableHead className="border text-center text-black" colSpan={3}>
                Room
              </TableHead>

              <TableHead className="border text-center text-black" colSpan={1}>
                Strength
              </TableHead>
            </TableRow>
          </TableHeader>
          {Object.keys(hallplan[gender])?.map((departmentYear) => {
            const department = departments.find((dept) => {
              return dept.id === Number(departmentYear.split(" ")[0]);
            });
            const year = years.find((yr) => {
              return yr.id === Number(departmentYear.split(" ")[1]);
            });

            return (
              <TableBody key={departmentYear} className="unbreak">
                <TableRow>
                  <TableCell
                    className="border text-center text-xl font-medium"
                    colSpan={5}
                  >
                    {`
                        ${department?.branch ?? ""} (${
                          department?.shortName ?? ""
                        }) ${year?.year}${getSuffix(year?.year ?? 0)} Year
                        `}
                  </TableCell>
                </TableRow>
                {hallplan[gender][departmentYear]?.map((room, index) => {
                  const currentRoom = Object.keys(room)[0];
                  const currentRoomInfo = Object.values(room)[0];
                  const roomObject = rooms.find((roomObj) => {
                    return roomObj.number === currentRoom;
                  });

                  return (
                    <>
                      <TableRow>
                        <TableCell className="border text-center" colSpan={1}>
                          {index + 1}
                        </TableCell>
                        <TableCell className="border " colSpan={3}>
                          <b className="text-xl font-medium"> {currentRoom} </b>{" "}
                          <br />
                          {getNumberNames(roomObject?.floor ?? 0) +
                            " Floor"} - {roomObject?.Block.name} -{" "}
                          {roomObject?.Building.name}
                        </TableCell>
                        <TableCell className="border font-medium" colSpan={1}>
                          {currentRoomInfo?.strength}
                        </TableCell>
                      </TableRow>
                    </>
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

export default HallPlanDocument;

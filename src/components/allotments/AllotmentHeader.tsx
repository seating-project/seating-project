import React from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

type Props = {
  image: string;
  examName: string | undefined;
  roomNumber: string | undefined;
  date: string;
  startTime: Date | undefined;
  endTime: Date | undefined;
};

const AllotmentHeader = ({
  image,
  examName,
  roomNumber,
  date,
  startTime,
  endTime,
}: Props) => {
  console.log(
    startTime?.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  let session = "FN";
  if (
    startTime
      ?.toLocaleTimeString("en-US", { timeZone: "Asia/Kolkata" })
      ?.includes("PM")
  ) {
    session = "AN";
  }

  return (
    <div className="space-y-2">
      <div className="flex w-full items-center justify-between  ">
        <Image
          src={image}
          width={400}
          height={400}
          alt="dasd"
          className="object-contain pr-4"
        />
        <div className="">
          <p className="text-center text-xl font-bold">
            {examName?.toUpperCase()}
          </p>
          <p className="text-center text-xl font-bold">Seating Arrangment</p>
        </div>
        <div className="rounded-md border border-black px-4 py-2 text-center">
          <p className="">Hall</p>
          <p className="pb-4 text-4xl font-bold">{roomNumber}</p>
        </div>
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="border border-black font-medium">
              <div className="flex">
                <p className="font-bold">Date: &nbsp;</p>
                <p>
                  {new Date(date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </TableCell>
            <TableCell className="border border-black ">
              <div className="flex">
                <p className="font-bold">Session: &nbsp;</p>
                <p>{session}</p>
              </div>
            </TableCell>
            <TableCell className="border border-black">
              <div className="flex">
                <p className="font-bold">Time: &nbsp;</p>
                <p>
                  {startTime?.toLocaleTimeString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}{" "}
                  -{" "}
                  {endTime?.toLocaleTimeString("en-US", {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AllotmentHeader;

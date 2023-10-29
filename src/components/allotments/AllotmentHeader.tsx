import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
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
  return (
    <>
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

        <div className="rounded-md border px-4 py-2 text-center">
          <p className="">Hall</p>
          <p className="pb-4 text-4xl font-bold">{roomNumber}</p>
        </div>
      </div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="border font-medium">
              <div className="flex">
                <p className="font-bold">Date: &nbsp;</p>
                <p>{date}</p>
              </div>
            </TableCell>
            <TableCell className="border ">
              <div className="flex">
                <p className="font-bold">Session: &nbsp;</p>
                <p>{(Number(startTime?.getUTCHours())) > 12 ? "PM" : "AM"}</p>
              </div>
            </TableCell>
            <TableCell className="border">
              <div className="flex">
                <p className="font-bold">Time: &nbsp;</p>
                <p>
                  {(Number(startTime?.getUTCHours())) > 12
                    ? (Number(startTime?.getUTCHours())) - 12
                    : startTime?.getUTCHours()}
                  {startTime?.getUTCMinutes() !== 0 &&
                    ":" + String(startTime?.getUTCMinutes())}
                  {(Number(startTime?.getUTCHours())) > 12 ? " PM" : " AM"} -{" "}
                  {(Number(endTime?.getUTCHours())) > 12
                    ? (Number(endTime?.getUTCHours())) - 12
                    : endTime?.getUTCHours()}
                  {endTime?.getUTCMinutes() !== 0 &&
                    ":" + String(endTime?.getUTCMinutes())}
                  {(Number(endTime?.getUTCHours())) > 12 ? " PM" : " AM"}
                </p>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default AllotmentHeader;

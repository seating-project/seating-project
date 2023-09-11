"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Exam,  Template } from "@prisma/client";
import Page from "@/components/page/LandscapePage";
import DownloadButton from "../client/DownloadButton";
import jsPDF from "jspdf";
import AllotmentHeader from "../allotments/AllotmentHeader";
import type { BoysGirlsStudents, Students } from "@/types";

type Props = {
  exam: Exam | null;
  template: Template | null;
  roomsOrder:
    | {
        id: number;
        number: string;
        floor: number;
        strength: number;
        buildingId: number;
        blockId: number;
      }[]
    | undefined;
  date: string;
  students: Students
};

const AllotmentTable = ({ exam, template, roomsOrder, date, students }: Props) => {
  const createPDF = async () => {
    const pdf = new jsPDF("landscape", "px", "a4");
    const data = document.querySelector("#seating") as HTMLElement;
    await pdf
      .html(data, {
        html2canvas: {
          scale: 0.57,
        },
      })
      .then(() => {
        pdf.save("shipping_label.pdf");
      });
  };

  console.log("=========================")
  console.log("STUDENT", students.one.boys as BoysGirlsStudents);
  console.log("=========================")

  const [pageNumber, setPageNumber] = React.useState(1);
  const [studentCount, setStudentCount] = React.useState(0);  
  const [snakeRow, setSnakeRow] = React.useState(0);

  const createTable = ({
    studentCount,
    setStudentCount,
    roomStrength,
    students
  } : {
    studentCount: number;
    setStudentCount: React.Dispatch<React.SetStateAction<number>>;
    roomStrength: number | undefined;
    students: Students;
  }) => {
    
    const row: React.ReactNode[] = []
    const table: React.ReactNode[] = []

    for (let i = 0; i < Number(roomStrength); i++) {


      row.push(
        <TableRow key={i}>
          <TableCell className="border text-white"> {} </TableCell>
          <TableCell className="border">{i + 1 + studentCount}</TableCell>
        </TableRow>
      );
    }
    
    return row;

  }

  return (
    <div className="flex flex-col items-center justify-center">
      <DownloadButton createPDF={createPDF} />
      <div className="w-full max-w-fit space-y-4">
        {roomsOrder?.map((room) => {
          
          console.log(room);
          const roomStrength = exam?.isCommonRoomStrength ? template?.roomStrength : room.strength;

          return (
            <Page id="seating" key={room.number}>
              <div className="flex w-full items-center justify-between">
                <div className="flex w-full flex-col items-center justify-between space-y-4">
                  <AllotmentHeader
                    image={"/logos/citlogo.png"}
                    examName={exam?.name}
                    roomNumber={room.number}
                    date={date}
                    startTime={template?.startTime}
                    endTime={template?.endTime}
                  />
                  <div className="flex">
                  {/* <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="border"> Register No:</TableHead>
                        <TableHead className="border">{exam?.secondColumnOptions === "PresentAbsent" ? "P/A" : exam?.secondColumnOptions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>

                      </TableRow>
                    </TableBody>
                  </Table> */}
                  {createTable({studentCount, setStudentCount, roomStrength, students})}


                  {/* <Table>
                    <TableCaption className="pb-2">
                      A list of your recent invoices.
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="border">
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                        <TableHead className=" border">Register No</TableHead>
                        <TableHead className="w-[40px] border">P/A</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="border font-medium">
                          INV001
                        </TableCell>
                        <TableCell className="border">Paid</TableCell>
                        <TableCell className="border">Credit Card</TableCell>
                        <TableCell className="border text-right"></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="border font-medium">
                          INV001
                        </TableCell>
                        <TableCell className="border">Paid</TableCell>
                        <TableCell className="border">Credit Card</TableCell>
                        <TableCell className="border text-right">
                          $250.00
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="border font-medium">
                          INV001
                        </TableCell>
                        <TableCell className="border">Paid</TableCell>
                        <TableCell className="border">Credit Card</TableCell>
                        <TableCell className="border text-right">
                          $250.00
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table> */}
                  </div>
                </div>
              </div>
            </Page>
          );
        })}
      </div>
    </div>
  );
};


// const createTable = () => {

// }


export default AllotmentTable;

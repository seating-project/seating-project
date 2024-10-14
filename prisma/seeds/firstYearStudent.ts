import { Gender, type PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

export default async function seedFromExcel(prisma: PrismaClient) {
  // Load the Excel file
  // const workbook = XLSX.readFile(
  //   "D:\\new-seating\\prisma\\14.10.2024 Register No for (2024-2025) Students.xlsx",
  // );

  // console.log(workbook.SheetNames);

  // Choose the first sheet (assuming you want data from the first sheet)
  // const sheetName = workbook.SheetNames[40];
  // if (!sheetName) {
  //   throw new Error("Sheet not found");
  // }
  // const sheet: XLSX.WorkSheet | undefined = workbook.Sheets[sheetName];

  // if (!sheet) {
  //   throw new Error("Sheet not found");
  // }

  // // // Parse the data from the sheet
  // const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // // // Access the data
  // // console.log(data);
  // await Promise.all(
  //   data
  //     .filter((row) => row.length > 2 && row[0] !== "S .NO" && row[1] !== "STUDENT NAME")
  //     .map(async (row) => {
  //       // console.log(row);
  //       const regNo: string = row[9] ?? "";
  //       const rollNo: string = row[11] ?? "";
  //       const name: string = row[1];
  //       const gender = row[2] === "M" ? Gender.Male : Gender.Female;

  //       // const regNo = row[0];
  //       // const name = row[1];
  //       // const gender = row[3] === "M" ? Gender.Male : Gender.Female;

  //       console.log(regNo, rollNo, name, gender);

  //       // await prisma.student.create({
  //       //   data: {
  //       //     registerNumber: regNo ?? "",
  //       //     name: name ?? "",
  //       //     gender: gender,
  //       //     collegeId: 1,
  //       //     departmentId: 1,
  //       //     yearId: 1,
  //       //     degreeId: 1,
  //       //   },
  //       // });
  //       await prisma.student.update({
  //         where: {
  //           registerNumber: regNo,
  //           name: name,
  //         },
  //         data: {
  //           rollNumber: rollNo,
  //         },
  //       });
  //     }),
  // );
  // console.log(sheetName);

  // console.log(actualstuff)
}

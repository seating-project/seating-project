import { Gender, type PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

export default function seedFromExcel(prisma: PrismaClient) {
  // Load the Excel file
  // const workbook = XLSX.readFile("D:\\new-seating\\prisma\\STUDENTS DETAILS.xlsx");

  // Choose the first sheet (assuming you want data from the first sheet)
  // const sheetName = workbook.SheetNames[10];
  // const sheet = workbook.Sheets[sheetName];

  // // Parse the data from the sheet
  // const data: any[] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  // // Access the data
  // // console.log(data);
  // await Promise.all(
  //   data
  //     .filter((row) => row.length > 2 && row[0] !== "S.NO" && row[2] == "C")
  //     .map(async (row) => {
  //       console.log(row);
  //       // const regNo: string = row[row.length - 1] ?? "";
  //       // const name: string = row[1];
  //       // const gender = row[2] === "M" ? Gender.Male : Gender.Female;

  //       const regNo = row[0];
  //       const name = row[1];
  //       const gender = row[3] === "M" ? Gender.Male : Gender.Female;

  //       console.log(regNo, name, gender);

  //       await prisma.student.create({
  //         data: {
  //           registerNumber: regNo ?? "",
  //           name: name ?? "",
  //           gender: gender,
  //           collegeId: 1,
  //           departmentId: 7,
  //           yearId: 1,
  //           degreeId: 1,
  //         },
  //       });
  //     }),
  // );
  // console.log(sheetName)

  // console.log(actualstuff)
}

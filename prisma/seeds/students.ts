import { type PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type StudentsInCSV = {
  name: string;
  registerNumber: string;
  gender: string;
  type: string;
  phone: string;
  degree: string;
  department: string;
  year: number;
};

async function readCSVFile(filePath: string): Promise<StudentsInCSV[]> {
  const results: StudentsInCSV[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: StudentsInCSV) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export default async function seedStudents(prisma: PrismaClient) {

  const filePath = path.join(__dirname, "..", "studentsData.csv");
  const students = await readCSVFile(filePath);

  students.map(async (student) => {

    const gender = student.gender === "M" ? "Male" : "Female";

    try {
      const newStudent = await prisma.student.create({
        data: {
          name: student.name,
          registerNumber: student.registerNumber,
          gender: gender,
          Department: {
            connect: {
              shortName: student.department.toUpperCase(),
            },
          },
          Degree: {
            connect: {
              degree: student.degree.toUpperCase(),
            },
          },
          Year: {
            connect: {
              year: Number(student.year),
            },
          },
        },
      });
      console.log("✔ Student created: ", newStudent);
    } catch (error) {
      console.log("❌ Student not created: ", student);
      console.log("❌ Error: ", error);
    }
  });

  //   const students: Prisma.StudentCreateInput[] = [
  //     {
  //       name: "Roshan J",
  //       gender: "Male",
  //       Degree: {
  //         connect: {
  //           degree: "UG",
  //         },
  //       },
  //       Year: {
  //         connect: {
  //           year: 3,
  //         },
  //       },
  //       Department: {
  //         connect: {
  //           shortName: "CSE",
  //         },
  //       },
  //       registerNumber: "210421104067",
  //     },
  //     {
  //       name: "Abhirami G S",
  //       gender: "Female",
  //       Degree: {
  //         connect: {
  //           degree: "UG",
  //         },
  //       },
  //       Year: {
  //         connect: {
  //           year: 3,
  //         },
  //       },
  //       Department: {
  //         connect: {
  //           shortName: "CSE",
  //         },
  //       },
  //       registerNumber: "210421104001",
  //     },
  //     {
  //       name: "Yashwanth",
  //       gender: "Male",
  //       Degree: {
  //         connect: {
  //           degree: "UG",
  //         },
  //       },
  //       Year: {
  //         connect: {
  //           year: 3,
  //         },
  //       },
  //       Department: {
  //         connect: {
  //           shortName: "MECH",
  //         },
  //       },
  //       registerNumber: "210421114003",
  //     },
  //   ];

  //   students.map(async (student) => {
  //     const newStudent = await prisma.student.create({
  //       data: student,
  //     });
  //     console.log("✔ Student created: ", newStudent);
  //   });

  console.log("✔ Students created: ", students);
}

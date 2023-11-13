import { type PrismaClient } from "@prisma/client";

export default async function seedDepartments(prisma: PrismaClient) {
  const departments = await prisma.department.createMany({
    data: [
      {
        branch: "Computer Science Engineering",
        shortName: "CSE",
        code: "CSE",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Electronics and Communication Engineering",
        shortName: "ECE",
        code: "ECE",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Electrical and Electronics Engineering",
        shortName: "EEE",
        code: "EEE",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Mechanical Engineering",
        shortName: "MECH",
        code: "ME",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Civil Engineering",
        shortName: "CIVIL",
        code: "CE",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Information Technology",
        shortName: "IT",
        code: "IT",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Artificial Intelligence and Data Science",
        shortName: "AIDS",
        code: "AIDS",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Artificial Intelligence and Machine Learning",
        shortName: "AIML",
        code: "AIML",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Computer Science and Business Systems",
        shortName: "CSBS",
        code: "CSBS",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Computer Science and Engineering (Cyber Security)",
        shortName: "CYBER",
        code: "CZ",
        degreeId: 1,
        type: "Circuit",
      },
      {
        branch: "Biomedical Engineering",
        shortName: "BME",
        code: "BME",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Mechatronics Engineering",
        shortName: "MCT",
        code: "MCT",
        degreeId: 1,
        type: "NonCircuit",
      },
      {
        branch: "Computer Science Engineering (Masters)",
        shortName: "CSEM",
        code: "CS",
        degreeId: 2,
        type: "Circuit",
      },
      {
        branch: "Applied Electronics",
        shortName: "AE",
        code: "AE",
        degreeId: 2,
        type: "NonCircuit",
      },
      {
        branch: "CAD/CAM",
        shortName: "CAD/CAM",
        code: "CC",
        degreeId: 2,
        type: "NonCircuit",
      },
    ],
  });

  console.log("✔ Departments created: ", departments);
}

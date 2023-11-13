import { type PrismaClient } from "@prisma/client";

export default async function updateStudent(prisma: PrismaClient) {
  const fourthYear = await prisma.student.updateMany({
    where: {
      Year: {
        year: 4,
      },
    },
    data: {
      yearId: 5,
    },
  });

  const thirdYear = await prisma.student.updateMany({
    where: {
      Year: {
        year: 3,
      },
    },
    data: {
      yearId: 4,
    },
  });

  const secondYear = await prisma.student.updateMany({
    where: {
      Year: {
        year: 2,
      },
    },
    data: {
      yearId: 3,
    },
  });

  const firstYear = await prisma.student.updateMany({
    where: {
      Year: {
        year: 1,
      },
    },
    data: {
      yearId: 2,
    },
  });

  console.log(
    "✔ Updated students: ",
    firstYear,
    secondYear,
    thirdYear,
    fourthYear
  )
}

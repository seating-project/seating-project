import { type PrismaClient } from "@prisma/client";

export default async function seedDegrees(prisma: PrismaClient) {
  const degrees = await prisma.degree.createMany({
    data: [
      {
        degree: "UG",
        fullName: "Undergraduate",
        duration: 4,
        type: "Bachelors",
      },
      {
        degree: "PG",
        fullName: "Postgraduate",
        duration: 2,
        type: "Masters",
      },
      {
        degree: "PhD",
        fullName: "Doctorate",
        duration: 3,
        type: "PhD",
      },
    ],
  });
  console.log("✔ Degrees created: ", degrees);
}

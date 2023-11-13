import { type PrismaClient } from "@prisma/client";

export default async function seedColleges(prisma: PrismaClient) {
  const cit = await prisma.college.create({
    data: {
      name: "Chennai Institute of Technology",
      shortName: "CIT",
    },
  });

  const citar = await prisma.college.create({
    data: {
      name: "Chennai Institute of Technology and Applied Research",
      shortName: "CITAR",
    },
  });

  console.log("Created colleges", cit, citar);
}

import { type PrismaClient } from "@prisma/client";

export default async function seedLogos(prisma: PrismaClient) {
  const logo = await prisma.logo.create({
    data: {
      name: "Cit Logo",
      image: "/images/citlogo.png",
    },
  });

    console.log("✔ Logo created: ", logo);
}

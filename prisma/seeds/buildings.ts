import { type PrismaClient } from "@prisma/client";

export default async function seedBuildings(prisma: PrismaClient) { 

    const buildings = await prisma.building.createMany({
        data: [
            {name: "Main Building"},
            {name: "New Building"},
        ]
    })

    console.log("✔ Buildings created: ", buildings)

}
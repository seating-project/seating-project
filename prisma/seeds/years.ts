import { type PrismaClient } from "@prisma/client";

export default async function seedYears(prisma: PrismaClient) {
    const years = await prisma.year.createMany({
        data: [
            {year: 1},
            {year: 2},
            {year: 3},
            {year: 4},
            {year: 5},
        ],
    })
    
    console.log("✔ Years created: ", years)
}
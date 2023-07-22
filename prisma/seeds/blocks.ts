import { type Prisma, type PrismaClient } from "@prisma/client";

export default function seedBlocks(prisma: PrismaClient) {
  const blocks: Prisma.BlockCreateInput[] = [
    {
      name: "Block A",
      Building: {
        connect: {
          name: "New Building",
        },
      },
    },
    {
      name: "Block B",
      Building: {
        connect: {
          name: "New Building",
        },
      },
    },
    {
      name: "Block Main",
      Building: {
        connect: {
          name: "Main Building",
        },
      },
    },
    {
      name: "Block C",
      Building: {
        connect: {
          name: "New Building",
        },
      },
    },
  ];

  blocks.map(async (block) => {
    try {
      const newBlock = await prisma.block.create({
        data: block,
      });
      console.log("✔ Block created: ", newBlock);
    } catch (error) {
      console.log("❌ Error creating block: ", error);
      console.log("❌ Block: ", block);
    }
  });

  console.log("✔ Blocks created: ", blocks);

  //   const blocks = await prisma.block.createMany({
  //     data: [
  //       {
  //         name: "Block A",
  //         buildingId: 2,
  //       },
  //       {
  //         name: "Block B",
  //         buildingId: 2,
  //       },
  //       {
  //         name: "Block Main",
  //         buildingId: 1,
  //       },
  //     ],
  //   });

  console.log("✔ Blocks created: ", blocks);
}

import { type Prisma, type PrismaClient } from "@prisma/client";

export default function seedTemplates(prisma: PrismaClient) {
  const templates: Prisma.TemplateCreateInput[] = [
    {
      name: "Assessment",
      numberOfRows: 5,
      numberOfColumns: 6,
      roomStrength: 60,
      Rooms: {
        connect: [
          {
            number: "F1",
          },
          {
            number: "F2",
          },
          {
            number: "F3",
          },
          {
            number: "F4",
          },
          {
            number: "F5",
          },
          {
            number: "F6",
          },
          {
            number: "F7",
          },
        ],
      },
      isAlternateDepartmentSeated: false,
      isBoysGirlsSeparate: true,
      isRandomizedDepartments: false,
      isSingleSeater: false,
      startTime: new Date("2021-01-01T09:00:00.000Z"),
      endTime: new Date("2021-01-01T17:00:00.000Z"),
      Logo: {
        connect: {
          name: "Cit Logo",
        },
      },
    },
  ];

  templates.map(async (template) => {
    try {
      const newTemplate = await prisma.template.create({
        data: template,
      });
      console.log("✔ Template created: ", newTemplate);
    } catch (error) {
      console.log("❌ Error creating template: ", error);
      console.log("❌ Template: ", template);
    }
  });
}

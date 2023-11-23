import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const templateRouter = createTRPCRouter({
  getTemplatesIncludingRooms: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.template.findMany({
      include: {
        Rooms: true,
      },
    });
  }),

  getTemplate: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.template.findUnique({
        where: { id: input.id },
        include: {
          Rooms: true,
          Buildings: true,
          Logo: true,
        },
      });
    }),

  getTemplateName: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.template.findUnique({
        where: { id: input.id },
        select: { name: true },
      });
    }),

  getTemplates: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.template.findMany();
  }),

  getTemplatesAdminTable: protectedProcedure.query(async ({ ctx }) => {
    const templates = await ctx.db.template.findMany();

    return templates.map((template) => ({
      id: template.id,
      name: template.name,
      roomStrength: template.roomStrength,
      startTime: template.startTime.toTimeString(),
      endTime: template.endTime.toTimeString(),
    }));
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.delete({
        where: { id: input.id },
      });
    }),

  createTemplate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        numberOfRows: z.number(),
        numberOfColumns: z.number(),
        roomStrength: z.number(),
        isSingleSeater: z.boolean(),
        isBoysGirlsSeparate: z.boolean(),
        isAlternateDepartmentSeated: z.boolean(),
        isRandomizedDepartments: z.boolean(),
        buildings: z.array(z.string()),
        rooms: z.array(z.string()),
        startTime: z.date(),
        endTime: z.date(),
        logo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.create({
        data: {
          name: input.name,
          numberOfRows: input.numberOfRows,
          numberOfColumns: input.numberOfColumns,
          startTime: input.startTime,
          endTime: input.endTime,
          roomStrength: input.roomStrength,
          isSingleSeater: input.isSingleSeater,
          isBoysGirlsSeparate: input.isBoysGirlsSeparate,
          isAlternateDepartmentSeated: input.isAlternateDepartmentSeated,
          isRandomizedDepartments: input.isRandomizedDepartments,
          Logo: {
            connect: {
              id: Number(input.logo),
            },
          },
          Buildings: {
            connect: input.buildings.map((building) => ({
              name: building,
            })),
          },
          Rooms: {
            connect: input.rooms.map((room) => ({
              number: room,
            })),
          },
        },
      });
    }),

  updateTemplate: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        numberOfRows: z.number(),
        numberOfColumns: z.number(),
        roomStrength: z.number(),
        isSingleSeater: z.boolean(),
        isBoysGirlsSeparate: z.boolean(),
        isAlternateDepartmentSeated: z.boolean(),
        isRandomizedDepartments: z.boolean(),
        buildings: z.array(z.string()),
        rooms: z.array(z.string()),
        startTime: z.date(),
        endTime: z.date(),
        logo: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.update({
        where: { id: input.id },
        data: {
          name: input.name,
          numberOfRows: input.numberOfRows,
          numberOfColumns: input.numberOfColumns,
          startTime: input.startTime,
          endTime: input.endTime,
          roomStrength: input.roomStrength,
          isSingleSeater: input.isSingleSeater,
          isBoysGirlsSeparate: input.isBoysGirlsSeparate,
          isAlternateDepartmentSeated: input.isAlternateDepartmentSeated,
          isRandomizedDepartments: input.isRandomizedDepartments,
          Logo: {
            connect: {
              id: Number(input.logo),
            },
          },
          Buildings: {
            connect: input.buildings.map((building) => ({
              name: building,
            })),
          },
          Rooms: {
            connect: input.rooms.map((room) => ({
              number: room,
            })),
          },
        },
      });
    }),

  getLogo: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const logo = await ctx.db.logo.findUnique({
        where: { id: input.id },
      });
      return logo;
    }),

  getLogos: protectedProcedure.query(async ({ ctx }) => {
    const logos = await ctx.db.logo.findMany();
    return logos;
  }),
});

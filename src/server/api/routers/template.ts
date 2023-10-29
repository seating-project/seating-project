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
      startTime: template.startTime,
      endTime: template.endTime,
    }));
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.template.delete({
        where: { id: input.id },
      });
    }),
});

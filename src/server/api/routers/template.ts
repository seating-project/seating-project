import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const templateRouter = createTRPCRouter({
  getTemplatesIncludingRooms: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.template.findMany({
      include: {
        Rooms: true,
      },
    });
  }),

  getTemplate: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.template.findUnique({
        where: { id: input.id },
      });
    }),

  getTemplateName: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.template.findUnique({
        where: { id: input.id },
        select: { name: true },
      });
    }),

  getTemplates: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.template.findMany();
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.template.delete({
        where: { id: input.id },
      });
    }),
});

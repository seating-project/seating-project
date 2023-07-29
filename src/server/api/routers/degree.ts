import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const degreeRouter = createTRPCRouter({
  getDegrees: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.degree.findMany({});
  }),
  getDegree: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.degree.findUnique({
        where: { id: input.id },
      });
    }),
});

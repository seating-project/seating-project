import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const yearRouter = createTRPCRouter({
  getYears: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.year.findMany({
      where: {
        NOT: {
          year: 5,
        },
      }
    });
  }),
  getYear: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.year.findUnique({
        where: { id: input.id },
      });
    }),
});

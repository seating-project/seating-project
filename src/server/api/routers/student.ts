import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const studentRouter = createTRPCRouter({
  getStudents: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.student.findMany({
      include: {
        Degree: true,
        Department: true,
        Year: true,
      },
    });
  }),
  getStudent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.student.findUnique({
        where: { id: input.id },
      });
    }),
});

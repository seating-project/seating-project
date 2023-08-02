import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const examRouter = createTRPCRouter({
  getLatestExams: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.exam.findMany(
      {
        include: { Departments: true, Template: true },
      }
    );
  }),
  
  delete: protectedProcedure
  .input(z.object({ id: z.number() }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.exam.delete({
      where: { id: input.id },
      include: { Template: true }
    });
  }),
});

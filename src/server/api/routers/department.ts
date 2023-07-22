import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartments: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.department.findMany({
        include: {
            Degree: true
        }
    });
  }),
  getDepartment: protectedProcedure

    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.department.findUnique({
        where: { id: input.id },
      });
    }),
});

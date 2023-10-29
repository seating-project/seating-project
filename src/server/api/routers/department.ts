import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const departmentRouter = createTRPCRouter({
  getDepartments: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.department.findMany({
      include: {
        Degree: true,
      },
    });
  }),

  getDepartmentsAdminTable: protectedProcedure.query(async ({ ctx }) => {
    const departments = await ctx.db.department.findMany({
      include: {
        Degree: true,
      },
    });

    return departments.map((department) => ({
      id: department.id,
      branch: department.branch,
      code: department.code,
      degree: department.Degree.degree,
      type: department.type,
      shortName: department.shortName,
    }));
  }),

  getDepartment: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.department.findUnique({
        where: { id: input.id },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.department.delete({
        where: { id: input.id },
      });
    }),
});

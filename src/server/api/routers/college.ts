import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const collegeRouter = createTRPCRouter({
  getColleges: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.college.findMany({});
  }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.college.delete({
        where: {
          id: input.id,
        },
      });
    }),

  getCollege: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.college.findUnique({
        where: { id: input.id },
        include: {
          Students: true,
        }
      });
    }),
});

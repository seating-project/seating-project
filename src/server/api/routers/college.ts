import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const collegeRouter = createTRPCRouter({
  getColleges: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.college.findMany({});
  }),
});

import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const examRouter = createTRPCRouter({
  getLatestExams: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.exam.findMany({});
  }),
});

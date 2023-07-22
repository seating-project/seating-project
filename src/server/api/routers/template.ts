import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const templateRouter = createTRPCRouter({
  getTemplates: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.template.findMany({});
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.template.delete({
        where: { id: input.id },
      });
    }),
});

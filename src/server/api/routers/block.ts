import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const blockRouter = createTRPCRouter({


  getBlocks: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.block.findMany({
        include: {
            Building: true,
        }
    });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.block.delete({
        where: {
          id: input.id,
        },
      });
    }),

    
  // getRoomsOrderForExam: protectedProcedure
  //   .input(z.object({ examId: z.number() }))
  //   .query(async ({ ctx, input }) => {
  //     const exam = await ctx.prisma.exam.findUnique({
  //       where: { id: input.examId },
  //       include: {
  //         RoomsOrder: true
  //        },
  //     });
  //     return exam?.RoomsOrder;
  //   }),
});

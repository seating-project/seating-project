import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  getRoomsFromTemplate: protectedProcedure
    .input(z.object({ templateName: z.string() }))
    .query(async ({ ctx, input }) => {
      const template = await ctx.db.template.findUnique({
        where: {
          name: input.templateName,
        },
        include: {
          Rooms: true,
        },
      });
      return template?.Rooms;
    }),

  getRoom: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findUnique({
        where: { id: input.id },
      });
    }),

  getRooms: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.room.findMany({
      include: {
        Building: true,
        Block: true,
      },
    });
  }),

  // getRoomsOrderForExam: protectedProcedure
  //   .input(z.object({ examId: z.number() }))
  //   .query(async ({ ctx, input }) => {
  //     const exam = await ctx.db.exam.findUnique({
  //       where: { id: input.examId },
  //       include: { 
  //         RoomsOrder: true
  //        },
  //     });
  //     return exam?.RoomsOrder;
  //   }),
});

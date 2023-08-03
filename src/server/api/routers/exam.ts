import { z } from "zod";
import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { type SecondColumnOptions } from "@prisma/client";

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

  createExam: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        examDates: z.object({
          from: z.date(),
          to: z.date(),
        }),
        template: z.string(),
        isPhd: z.boolean(),
        isMe: z.boolean(),
        isYearsTogether: z.boolean(),
        isDepartmentsTogether: z.boolean(),
        isSendWhatsappMessage: z.boolean(),
        timeToSendWhatsappMessage: z.date().optional(),
        secondColumnOptions: z.string(),
        years: z.array(z.string()),
        departments: z.array(z.string()),
        departmentsLeftBoys: z.array(z.string()).optional(),
        departmentsRightBoys: z.array(z.string()).optional(),
        departmentsLeftGirls: z.array(z.string()).optional(),
        departmentsRightGirls: z.array(z.string()).optional(),
        minimumStudentsInRoom: z.number(),
        randomizeEveryNRooms: z.number(),
        roomsOrder: z.array(z.string()),
        strictlyDivideBuildings: z.boolean(),
        isCommonRoomStrength: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.exam.create({
        data: {
          startDate: input.examDates.from,
          endDate: input.examDates.to,
          isPhD: input.isPhd,
          Template: {
            connect: {
              name: input.template,
            },
          },
          name: input.name,
          isMe: input.isMe,
          isYearsTogether: input.isYearsTogether,
          isDepartmentsTogether: input.isDepartmentsTogether,
          isSendWhatsappMessage: input.isSendWhatsappMessage,
          timeToSendWhatsappMessage: input.timeToSendWhatsappMessage,
          secondColumnOptions: input.secondColumnOptions as SecondColumnOptions,
          minimumStudentsInRoom: input.minimumStudentsInRoom,
          randomizeEveryNRooms: input.randomizeEveryNRooms,
          strictlyDivideBuildings: input.strictlyDivideBuildings,
          isCommonRoomStrength: input.isCommonRoomStrength,
          Years: {
            connect: input.years.map((year) => ({
              year: Number(year),
            })),
          },
          Departments: {
            connect: input.departments.map((department) => ({
              branch: department,
            })),
          },
          DepartmentsLeftBoys: {
            connect: input.departmentsLeftBoys?.map((department) => ({
              branch: department, 
            })),
          },
          DepartmentsRightBoys: {
            connect: input.departmentsRightBoys?.map((department) => ({
              branch: department,
            })),
          },
          DepartmentsLeftGirls: {
            connect: input.departmentsLeftGirls?.map((department) => ({
              branch: department,
            })),
          },
          DepartmentsRightGirls: {
            connect: input.departmentsRightGirls?.map((department) => ({
              branch: department,
            })),
          },
          RoomsOrder: {
            connect: input.roomsOrder.map((room) => ({
              number: room,
            })),
          },
        },
      });
    }),
});

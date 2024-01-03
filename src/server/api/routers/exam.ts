import { type SecondColumnOptions } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const examRouter = createTRPCRouter({
  getLatestExams: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.exam.findMany({
      include: { Departments: true, Template: true, Years: true },
    });
  }),

  getLatestExamsAdminTable: protectedProcedure.query(async ({ ctx }) => {
    const exams = await ctx.db.exam.findMany({
      include: { Departments: true, Template: true, Years: true },
    });

    return exams.map((exam) => ({
      id: exam.id,
      name: exam.name,
      template: exam.Template,
      startDate: exam.startDate,
      endDate: exam.endDate,
      departments: exam.Departments,
    }));
  }),

  getExamByName: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.exam.findUnique({
        where: { name: input.name },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          RoomsOrder: true,
        },
      });
    }),

  getExamById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.exam.findUnique({
        where: { id: input.id },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          RoomsOrder: true,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.exam.delete({
        where: { id: input.id },
        include: { Template: true },
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
        college: z.string(),
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
        // timeTable: z.object(),
        timeTable: z.record(
          z.string(),
          z.record(z.string(), z.record(z.string(), z.string())),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      console.log("TIMETABLE HERE", input.timeTable);
      return ctx.db.exam.create({
        data: {
          startDate: input.examDates.from,
          endDate: input.examDates.to,
          isPhD: input.isPhd,
          Template: {
            connect: {
              name: input.template,
            },
          },
          College: {
            connect: {
              name: input.college,
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
              shortName: department,
            })),
          },
          DepartmentsLeftBoys: {
            connect: input.departmentsLeftBoys?.map((department) => ({
              shortName: department,
            })),
          },
          DepartmentsRightBoys: {
            connect: input.departmentsRightBoys?.map((department) => ({
              shortName: department,
            })),
          },
          DepartmentsLeftGirls: {
            connect: input.departmentsLeftGirls?.map((department) => ({
              shortName: department,
            })),
          },
          DepartmentsRightGirls: {
            connect: input.departmentsRightGirls?.map((department) => ({
              shortName: department,
            })),
          },
          RoomsOrder: {
            connect: input.roomsOrder.map((room) => ({
              number: room,
            })),
          },
          Timetable: input.timeTable,
          roomOrderArray: input.roomsOrder,
          deptLeftBoysArray: input.departmentsLeftBoys,
          deptRightBoysArray: input.departmentsRightBoys,
          deptLeftGirlsArray: input.departmentsLeftGirls,
          deptRightGirlsArray: input.departmentsRightGirls,
        },
      });
    }),
});

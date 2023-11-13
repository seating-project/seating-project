import { type Gender } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const studentRouter = createTRPCRouter({
  getStudents: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.student.findMany({
      include: {
        Degree: true,
        Department: true,
        Year: true,
      },
    });
  }),

  getStudentsAdminTable: protectedProcedure.query(async ({ ctx }) => {
    const students = await ctx.db.student.findMany({
      include: {
        Degree: true,
        Department: true,
        Year: true,
      },
    });

    return students.map((student) => ({
      id: student.id,
      name: student.name,
      registerNumber: student.registerNumber,
      gender: student.gender,
      department: student.Department.shortName,
      year: student.Year.year,
      degree: student.Degree.degree,
    }));
  }),

  getStudent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.student.findUnique({
        where: { id: input.id },
        include: {
          Degree: true,
          Department: true,
          Year: true,
        },
      });
    }),

  getStudentsByYear: protectedProcedure
    .input(z.object({ year: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.student.findMany({
        where: { Year: { year: input.year } },
        include: {
          Degree: true,
          Department: true,
          Year: true,
        },
      });
    }),

  createStudent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        registerNumber: z.string(),
        gender: z.string(),
        department: z.string(),
        degree: z.string(),
        college: z.string(),
        year: z.number(),
        phoneNumber: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createStudent = await ctx.db.student.create({
        data: {
          name: input.name,
          registerNumber: input.registerNumber,
          Department: {
            connect: {
              branch: input.department,
            },
          },
          Degree: {
            connect: {
              degree: input.degree,
            },
          },
          College: {
            connect: {
              name: input.college,
            },
          },
          Year: {
            connect: {
              year: input.year,
            },
          },
          phone_number: input.phoneNumber,
          gender: input.gender as Gender,
        },
      });
      return createStudent;
    }),
  updateStudent: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        registerNumber: z.string(),
        gender: z.string(),
        department: z.string(),
        degree: z.string(),
        year: z.number(),
        phoneNumber: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const updateStudent = await ctx.db.student.update({
        where: { id: input.id },
        data: {
          name: input.name,
          registerNumber: input.registerNumber,
          Department: {
            connect: {
              branch: input.department,
            },
          },
          Degree: {
            connect: {
              degree: input.degree,
            },
          },
          Year: {
            connect: {
              year: input.year,
            },
          },
          phone_number: input.phoneNumber,
          gender: input.gender as Gender,
        },
      });
      return updateStudent;
    }),

  deleteStudent: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deleteStudent = await ctx.db.student.delete({
        where: { id: input.id },
      });
      return deleteStudent;
    }),

  getStudentsByYearAndDepartmentsAndGender: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        department: z.array(z.number()),
        gender: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = await ctx.db.student.findMany({
        where: {
          Year: {
            year: input.year,
          },
          Department: {
            id: {
              in: input.department,
            },
          },
          gender: input.gender as Gender,
        },
        include: {
          Degree: true,
          Department: true,
          Year: true,
        },
      });
      return students;
    }),

  getStudentsByYearAndGender: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        gender: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = await ctx.db.student.findMany({
        where: {
          Year: {
            year: input.year,
          },
          gender: input.gender as Gender,
        },
        include: {
          Degree: true,
          Department: true,
          Year: true,
        },
      });
      return students;
    }),

  getStudentsByYearAndDepartments: protectedProcedure
    .input(
      z.object({
        year: z.number(),
        department: z.array(z.number()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const students = await ctx.db.student.findMany({
        where: {
          Year: {
            year: input.year,
          },
          Department: {
            id: {
              in: input.department,
            },
          },
        },
        include: {
          Degree: true,
          Department: true,
          Year: true,
        },
      });
      return students;
    }),
});

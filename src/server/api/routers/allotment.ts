import { Student } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { getAllotments } from "../helpers";

export const allotmentRouter = createTRPCRouter({
  createAllotment: protectedProcedure
    .input(
      z.object({
        examId: z.number(),
        templateId: z.number(),
        date: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const students = await getAllotments({
        examId: input.examId,
        templateId: input.templateId,
        date: input.date,
      });
      return students;
    }),

  createHallPlanForAll: protectedProcedure
    .input(
      z.object({
        examId: z.number(),
        templateId: z.number(),
        date: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Getting the exam data
      const exam = await ctx.db.exam.findUnique({
        where: { id: input.examId },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          DepartmentsLeftSingleYear: true,
          DepartmentsRightSingleYear: true,
          RoomsOrder: true,
        },
      });

      // Getting the template data
      const template = await ctx.db.template.findUnique({
        where: { id: input.templateId },
        include: {
          Buildings: true,
          Rooms: true,
        },
      });

      // If the exam or template is not found, throw an error
      if (!exam || !template) {
        throw new Error("Not found");
      }

      // Getting the allotments
      const allotments = await getAllotments({
        examId: input.examId,
        templateId: input.templateId,
        date: input.date,
      });

      const hallplans: Record<
        string,
        Record<
          string,
          {
            startRegisterNumber: string;
            endRegisterNumber: string;
            strength: number;
          }
        >[]
      > = {};

      // const sample = {
      //   "1": {
      //     "F1": {
      //       startRegisterNumber: "19BCE0001",
      //       endRegisterNumber: "19BCE0010",
      //       strength: 10,
      //     },
      //   }
      // }

      Object.keys(allotments).forEach((room) => {
        allotments[room]?.forEach((student) => {
          if (template.isSingleSeater) {
            if (
              !Object.keys(hallplans).includes(
                String(student[0]?.departmentId + " " + student[0]?.yearId),
              )
            ) {
              hallplans[
                String(student[0]?.departmentId + " " + student[0]?.yearId)
              ] = [
                {
                  [room]: {
                    startRegisterNumber: student[0]?.registerNumber ?? "",
                    endRegisterNumber:
                      student[student.length - 1]?.registerNumber ?? "",
                    strength: 1,
                  },
                },
              ];
            } else {
              if (
                !(
                  hallplans[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.filter((hall) => Object.keys(hall)[0] === room)?.length ??
                  0 > 0
                )
              ) {
                hallplans[
                  String(student[0]?.departmentId + " " + student[0]?.yearId)
                ]?.push({
                  [room]: {
                    startRegisterNumber: student[0]?.registerNumber ?? "",
                    endRegisterNumber:
                      student[student.length - 1]?.registerNumber ?? "",
                    strength: 1,
                  },
                });
              } else {
                Object.values(
                  hallplans[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                )[0]!.strength += 1;
                Object.values(
                  hallplans[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                )[0]!.endRegisterNumber = student[0]?.registerNumber ?? "";
              }
            }
          } else {
            if (student[0]) {
              if (
                !Object.keys(hallplans).includes(
                  String(student[0]?.departmentId + " " + student[0]?.yearId),
                )
              ) {
                hallplans[
                  String(student[0]?.departmentId + " " + student[0]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !(
                    hallplans[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)
                      ?.length ?? 0 > 0
                  )
                ) {
                  hallplans[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.push({
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  });
                } else {
                  Object.values(
                    hallplans[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.strength += 1;
                  Object.values(
                    hallplans[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.endRegisterNumber = student[0]?.registerNumber ?? "";
                }
              }
            }

            if (student[1]) {
              if (
                !Object.keys(hallplans).includes(
                  String(student[1]?.departmentId + " " + student[1]?.yearId),
                )
              ) {
                hallplans[
                  String(student[1]?.departmentId + " " + student[1]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !hallplans[
                    String(student[1]?.departmentId + " " + student[1]?.yearId)
                  ]?.includes({
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  })
                ) {
                  if (
                    !(
                      hallplans[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)
                        ?.length ?? 0 > 0
                    )
                  ) {
                    hallplans[
                      String(
                        student[1]?.departmentId + " " + student[1]?.yearId,
                      )
                    ]?.push({
                      [room]: {
                        startRegisterNumber: student[1]?.registerNumber ?? "",
                        endRegisterNumber:
                          student[student.length - 1]?.registerNumber ?? "",
                        strength: student.length,
                      },
                    });
                  } else {
                    Object.values(
                      hallplans[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.strength += 1;
                    Object.values(
                      hallplans[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.endRegisterNumber = student[1]?.registerNumber ?? "";
                  }
                }
              }
            }
          }
        });
      });
      return hallplans;
    }),

  createHallPlanGenderWise: protectedProcedure
    .input(
      z.object({
        examId: z.number(),
        templateId: z.number(),
        date: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Getting the exam data
      const exam = await ctx.db.exam.findUnique({
        where: { id: input.examId },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          DepartmentsLeftSingleYear: true,
          DepartmentsRightSingleYear: true,
          RoomsOrder: true,
        },
      });

      // Getting the template data
      const template = await ctx.db.template.findUnique({
        where: { id: input.templateId },
        include: {
          Buildings: true,
          Rooms: true,
        },
      });

      // If the exam or template is not found, throw an error
      if (!exam || !template) {
        throw new Error("Not found");
      }

      // Getting the allotments
      const allotments = await getAllotments({
        examId: input.examId,
        templateId: input.templateId,
        date: input.date,
      });

      const hallplans: Record<
        "boys" | "girls",
        Record<
          string,
          Record<
            string,
            {
              startRegisterNumber: string;
              endRegisterNumber: string;
              strength: number;
            }
          >[]
        >
      > = {
        boys: {},
        girls: {},
      };

      const girlsRooms = Object.keys(allotments).filter((room) => {
        if (
          allotments[room]?.[0]?.[0]?.gender === "Female" ||
          allotments[room]?.[0]?.[1]?.gender === "Female"
        ) {
          return true;
        } else {
          return false;
        }
      });

      Object.keys(allotments).forEach((room) => {
        if (girlsRooms.includes(room)) {
          allotments[room]?.forEach((student) => {
            if (student[0]) {
              if (
                !Object.keys(hallplans.girls).includes(
                  String(student[0]?.departmentId + " " + student[0]?.yearId),
                )
              ) {
                hallplans.girls[
                  String(student[0]?.departmentId + " " + student[0]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !(
                    hallplans.girls[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)
                      ?.length ?? 0 > 0
                  )
                ) {
                  hallplans.girls[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.push({
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  });
                } else {
                  Object.values(
                    hallplans.girls[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.strength += 1;
                  Object.values(
                    hallplans.girls[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.endRegisterNumber = student[0]?.registerNumber ?? "";
                }
              }
            }

            if (student[1]) {
              if (
                !Object.keys(hallplans.girls).includes(
                  String(student[1]?.departmentId + " " + student[1]?.yearId),
                )
              ) {
                hallplans.girls[
                  String(student[1]?.departmentId + " " + student[1]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !hallplans.girls[
                    String(student[1]?.departmentId + " " + student[1]?.yearId)
                  ]?.includes({
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  })
                ) {
                  if (
                    !(
                      hallplans.girls[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)
                        ?.length ?? 0 > 0
                    )
                  ) {
                    hallplans.girls[
                      String(
                        student[1]?.departmentId + " " + student[1]?.yearId,
                      )
                    ]?.push({
                      [room]: {
                        startRegisterNumber: student[1]?.registerNumber ?? "",
                        endRegisterNumber:
                          student[student.length - 1]?.registerNumber ?? "",
                        strength: student.length,
                      },
                    });
                  } else {
                    Object.values(
                      hallplans.girls[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.strength += 1;
                    Object.values(
                      hallplans.girls[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.endRegisterNumber = student[1]?.registerNumber ?? "";
                  }
                }
              }
            }
          });
        } else {
          allotments[room]?.forEach((student) => {
            if (student[0]) {
              if (
                !Object.keys(hallplans.boys).includes(
                  String(student[0]?.departmentId + " " + student[0]?.yearId),
                )
              ) {
                hallplans.boys[
                  String(student[0]?.departmentId + " " + student[0]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !(
                    hallplans.boys[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)
                      ?.length ?? 0 > 0
                  )
                ) {
                  hallplans.boys[
                    String(student[0]?.departmentId + " " + student[0]?.yearId)
                  ]?.push({
                    [room]: {
                      startRegisterNumber: student[0]?.registerNumber ?? "",
                      endRegisterNumber: student[0]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  });
                } else {
                  Object.values(
                    hallplans.boys[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.strength += 1;
                  Object.values(
                    hallplans.boys[
                      String(
                        student[0]?.departmentId + " " + student[0]?.yearId,
                      )
                    ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ?? {},
                  )[0]!.endRegisterNumber = student[0]?.registerNumber ?? "";
                }
              }
            }

            if (student[1]) {
              if (
                !Object.keys(hallplans.boys).includes(
                  String(student[1]?.departmentId + " " + student[1]?.yearId),
                )
              ) {
                hallplans.boys[
                  String(student[1]?.departmentId + " " + student[1]?.yearId)
                ] = [
                  {
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  },
                ];
              } else {
                if (
                  !hallplans.boys[
                    String(student[1]?.departmentId + " " + student[1]?.yearId)
                  ]?.includes({
                    [room]: {
                      startRegisterNumber: student[1]?.registerNumber ?? "",
                      endRegisterNumber:
                        student[student.length - 1]?.registerNumber ?? "",
                      strength: student.length,
                    },
                  })
                ) {
                  if (
                    !(
                      hallplans.boys[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)
                        ?.length ?? 0 > 0
                    )
                  ) {
                    hallplans.boys[
                      String(
                        student[1]?.departmentId + " " + student[1]?.yearId,
                      )
                    ]?.push({
                      [room]: {
                        startRegisterNumber: student[1]?.registerNumber ?? "",
                        endRegisterNumber:
                          student[student.length - 1]?.registerNumber ?? "",
                        strength: student.length,
                      },
                    });
                  } else {
                    Object.values(
                      hallplans.boys[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.strength += 1;
                    Object.values(
                      hallplans.boys[
                        String(
                          student[1]?.departmentId + " " + student[1]?.yearId,
                        )
                      ]?.filter((hall) => Object.keys(hall)[0] === room)[0] ??
                        {},
                    )[0]!.endRegisterNumber = student[1]?.registerNumber ?? "";
                  }
                }
              }
            }
          });
        }
      });

      return hallplans;
    }),

  getAttendanceRooms: protectedProcedure
    .input(z.object({ examId: z.number(), date: z.string() }))
    .query(async ({ ctx, input }) => {
      // Getting the exam data
      const exam = await ctx.db.exam.findUnique({
        where: { id: input.examId },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          DepartmentsLeftSingleYear: true,
          DepartmentsRightSingleYear: true,
          RoomsOrder: true,
        },
      });

      // Getting the template data
      const template = exam?.Template;

      // If the exam or template is not found, throw an error
      if (!exam || !template) {
        throw new Error("Not found");
      }

      // Getting the allotments
      const allotments = await getAllotments({
        examId: input.examId,
        templateId: template.id,
        date: input.date,
      });

      const rooms = Object.keys(allotments);
      return rooms;
    }),

  createAttendance: protectedProcedure
    .input(
      z.object({
        examId: z.number(),
        templateId: z.number(),
        date: z.string(),
        room: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Getting the exam data
      const exam = await ctx.db.exam.findUnique({
        where: { id: input.examId },
        include: {
          Departments: true,
          Template: true,
          Years: true,
          DepartmentsLeftBoys: true,
          DepartmentsLeftGirls: true,
          DepartmentsRightBoys: true,
          DepartmentsRightGirls: true,
          DepartmentsLeftSingleYear: true,
          DepartmentsRightSingleYear: true,
          RoomsOrder: true,
        },
      });

      // Getting the template data
      const template = exam?.Template;

      // If the exam or template is not found, throw an error
      if (!exam || !template) {
        throw new Error("Not found");
      }

      // Getting the allotments
      const allotments = await getAllotments({
        examId: input.examId,
        templateId: template.id,
        date: input.date,
      });

      const students = allotments[input.room];

      const attendance: Record<string, Student[]> = {};
      students?.forEach((student) => {
        student.forEach((s) => {
          if (s?.departmentId && s?.yearId) {
            if (
              !Object.keys(attendance).includes(
                String(s.departmentId + " " + s.yearId),
              )
            ) {
              attendance[String(s.departmentId + " " + s.yearId)] = [s];
            } else {
              attendance[String(s.departmentId + " " + s.yearId)]?.push(s);
            }
          }
        });
      });

      return attendance;
    }),
});

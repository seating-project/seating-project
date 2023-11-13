import { z } from "zod";

export const examFormSchema = z.object({
  name: z.string(),
  examDates: z.object({
    from: z.date(),
    to: z.date(),
  }),
  college: z.string(),
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
  departmentsLeftSingleYear: z.array(z.string()).optional(),
  departmentsRightSingleYear: z.array(z.string()).optional(),
  minimumStudentsInRoom: z.number(),
  randomizeEveryNRooms: z.number(),
  roomsOrder: z.array(z.string()),
  strictlyDivideBuildings: z.boolean(),
  isCommonRoomStrength: z.boolean(),
});

export const studentFormSchema = z.object({
  name: z.string(),
  registerNumber: z.string(),
  gender: z.string(),
  department: z.string(),
  year: z.string(),
  degree: z.string(),
  phoneNumber: z.string().optional(),
});

export const templateFormSchema = z.object({
  name: z.string(),
  numberOfRows: z.number(),
  numberOfColumns: z.number(),
  rooms: z.array(z.string()),
  roomStrength: z.number(),
  isSingleSeater: z.boolean(),
  isBoysGirlsSeparate: z.boolean(),
  isAlternateDepartmentSeated: z.boolean(),
  isRandomizedDepartments: z.boolean(),
  buildings: z.array(z.string()),
  startTime: z.date(),
  endTime: z.date(),
  logo: z.string(),
});

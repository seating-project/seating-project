import { createTRPCRouter } from "@/server/api/trpc";
import { examRouter } from "./routers/exam";
import { templateRouter } from "./routers/template";
import { studentRouter } from "./routers/student";
import { departmentRouter } from "./routers/department";
import { yearRouter } from "./routers/year";
import { degreeRouter } from "./routers/degree";
import { roomRouter } from "./routers/room";
import { blockRouter } from "./routers/block";
import { buildingRouter } from "./routers/building";
import { messageRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exam: examRouter,
  template: templateRouter,
  student: studentRouter,
  department: departmentRouter,
  year: yearRouter,
  degree: degreeRouter,
  room: roomRouter, 
  block: blockRouter,
  building: buildingRouter,
  message: messageRouter, 
});

// export type definition of API
export type AppRouter = typeof appRouter;

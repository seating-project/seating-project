import { allotmentRouter } from "@/server/api/routers/allotment";
import { blockRouter } from "@/server/api/routers/block";
import { buildingRouter } from "@/server/api/routers/building";
import { collegeRouter } from "@/server/api/routers/college";
import { degreeRouter } from "@/server/api/routers/degree";
import { departmentRouter } from "@/server/api/routers/department";
import { examRouter } from "@/server/api/routers/exam";
import { roomRouter } from "@/server/api/routers/room";
import { studentRouter } from "@/server/api/routers/student";
import { templateRouter } from "@/server/api/routers/template";
import { yearRouter } from "@/server/api/routers/year";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

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
  allotment: allotmentRouter,
  college: collegeRouter,
  building: buildingRouter,
  block: blockRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);

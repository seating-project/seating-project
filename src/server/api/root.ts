import { allotmentRouter } from "@/server/api/routers/allotment";
import { buildingRouter } from "@/server/api/routers/building";
import { collegeRouter } from "@/server/api/routers/college";
import { degreeRouter } from "@/server/api/routers/degree";
import { departmentRouter } from "@/server/api/routers/department";
import { examRouter } from "@/server/api/routers/exam";
import { roomRouter } from "@/server/api/routers/room";
import { studentRouter } from "@/server/api/routers/student";
import { templateRouter } from "@/server/api/routers/template";
import { yearRouter } from "@/server/api/routers/year";
import { createTRPCRouter } from "@/server/api/trpc";

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
});

// export type definition of API
export type AppRouter = typeof appRouter;

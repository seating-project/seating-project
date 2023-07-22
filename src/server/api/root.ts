import { createTRPCRouter } from "@/server/api/trpc";
import { examRouter } from "./routers/exams";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exam: examRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

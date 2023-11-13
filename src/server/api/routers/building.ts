import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const buildingRouter = createTRPCRouter({
  getBuildings: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.building.findMany({});
  }),
});

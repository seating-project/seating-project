import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const buildingRouter = createTRPCRouter({
  getBuildings: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.building.findMany({});
  }),
});

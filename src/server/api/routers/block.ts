import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const blockRouter = createTRPCRouter({
  findAllBlocks: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.block.findMany();
  }),
});

import { z } from "zod";

import {
  createTRPCRouter,
  // publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  getRoomsFromTemplate: protectedProcedure
    .input(z.object({ templateName: z.string() }))
    .query(async ({ ctx, input }) => {
      const template = await ctx.db.template.findUnique({
        where: {
          name: input.templateName,
        },
        include: {
          Rooms: true,
        },
      });
      return template?.Rooms;
    }),

  getRoom: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.room.findUnique({
        where: { id: input.id },
        include: {
          Building: true,
          Block: true,
        },
      });
    }),

  getRooms: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.room.findMany({
      include: {
        Building: true,
        Block: true,
      },
    });
  }),

  getRoomsAdminTable: protectedProcedure.query(async ({ ctx }) => {
    const rooms = await ctx.db.room.findMany({
      include: {
        Building: true,
        Block: true,
      },
    });

    return rooms
      .map((room) => ({
        id: room.id,
        number: room.number,
        capacity: room.strength,
        building: room.Building.name,
        block: room.Block.name,
        floor: room.floor,
      }))
      .sort((a, b) => {
        if (a.number.length === b.number.length) {
          if (a.number > b.number) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return a.number.length - b.number.length;
        }
      });
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.delete({
        where: { id: input.id },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        number: z.string(),
        strength: z.number(),
        buildingId: z.number(),
        blockId: z.number(),
        floor: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.create({
        data: {
          number: input.number,
          strength: input.strength,
          Building: {
            connect: {
              id: input.buildingId,
            },
          },
          Block: {
            connect: {
              id: input.blockId,
            },
          },
          floor: input.floor,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        number: z.string(),
        strength: z.number(),
        buildingId: z.number(),
        blockId: z.number(),
        floor: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.update({
        where: { id: input.id },
        data: {
          number: input.number,
          strength: input.strength,
          Building: {
            connect: {
              id: input.buildingId,
            },
          },
          Block: {
            connect: {
              id: input.blockId,
            },
          },
          floor: input.floor,
        },
      });
    }),
});

import { type PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

type RoomsInCSV = {
  room: string;
  room_floor: number;
  room_capacity: number;
  room_block: string;
  room_building: string;
};

async function readCSVFile(filePath: string): Promise<RoomsInCSV[]> {
  const results: RoomsInCSV[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data: RoomsInCSV) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

export default async function seedRooms(prisma: PrismaClient) {
  const filePath = path.join(__dirname, "..", "roomsNew.csv");
  const rooms = await readCSVFile(filePath);

  rooms.map(async (room) => {
    try {
      const newRoom = await prisma.room.create({
        data: {
          number: room.room,
          floor: Number(room.room_floor),
          strength: Number(room.room_capacity),
          Block: {
            connect: {
              name: room.room_block,
            },
          },
          Building: {
            connect: {
              name: room.room_building,
            },
          },
        },
      });
      console.log("✔ Room created: ", newRoom);
    } catch (error) {
      console.log("❌ Error creating room: ", error);
      console.log("❌ Room: ", room);
    }
  });

  console.log("✔ Rooms created: ", rooms);
}

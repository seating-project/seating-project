import React from "react";

import UpdateRoomForm from "@/components/forms/UpdateRoomForm";
import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const RoomPage = async (props: Props) => {
  const params = await props.params;
  const buildings = await api.building.getBuildings();
  const requiredBuildings = buildings.map((building) => ({
    value: String(building.id),
    label: building.name,
  }));

  const blocks = await api.block.findAllBlocks();
  const requiredBlocks = blocks.map((block) => ({
    value: String(block.id),
    label: block.name,
  }));

  const room = await api.room.getRoom({
    id: Number(decodeURIComponent(params.id)),
  });

  return (
    <div className="w-full p-8">
      <p className="mb-8 text-4xl font-bold">
        Room {room?.number} (ID: {room?.id})
      </p>
      <UpdateRoomForm
        buildings={requiredBuildings}
        blocks={requiredBlocks}
        room={room}
      />
    </div>
  );
};

export default RoomPage;

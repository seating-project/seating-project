import React from "react";

import UpdateRoomForm from "@/components/forms/UpdateRoomForm";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

const RoomPage = async (props: Props) => {
  const buildings = await api.building.getBuildings.query();
  const requiredBuildings = buildings.map((building) => ({
    value: String(building.id),
    label: building.name,
  }));

  const blocks = await api.block.findAllBlocks.query();
  const requiredBlocks = blocks.map((block) => ({
    value: String(block.id),
    label: block.name,
  }));

  const room = await api.room.getRoom.query({
    id: Number(decodeURIComponent(props.params.id)),
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

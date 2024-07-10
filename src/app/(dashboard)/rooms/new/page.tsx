import RoomForm from "@/components/forms/RoomForm";
import { api } from "@/trpc/server";

const NewRoomPage = async () => {
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

  return (
    <div className="w-full p-8">
      <p className="mb-8 text-4xl font-bold">Create new room</p>
      <RoomForm buildings={requiredBuildings} blocks={requiredBlocks} />
    </div>
  );
};

export default NewRoomPage;

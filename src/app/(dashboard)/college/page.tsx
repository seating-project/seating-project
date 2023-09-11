import BuildingsTable from "@/components/tables/BuildingsTable";
import RoomsTable from "@/components/tables/RoomsTable";
import BlocksTable from "@/components/tables/BlocksTable";
import { api } from "@/trpc/server";

export default async function ExamPage() {
  const rooms = await api.room.getRooms.query();
  const blocks = await api.block.getBlocks.query();
  const buildings = await api.building.getBuildings.query();

  const requiredRoomData = rooms.map((room) => {
    return {
      id: room.id,
      number: room.number,
      floor: room.floor,
      strength: room.strength,
      building: room.Building.name,
      block: room.Block.name,
    };
  });

  const requiredBlockData = blocks.map((block) => {
    return {
      id: block.id,
      name: block.name,
      building: block.Building.name,
    };
  });

  const requiredBuildingData = buildings.map((building) => {
    return {
      id: building.id,
      name: building.name,
    };
  });


  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-4xl my-4 font-bold">
          College Details
        </p>
        <div>
          <p className="text-2xl font-bold">Rooms</p>
          <div className="my-4">
            <RoomsTable data={requiredRoomData} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">Blocks</p>
          <div className="my-4">
            <BlocksTable data={requiredBlockData} />
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold">Buildings</p>
          <div className="my-4">
            <BuildingsTable data={requiredBuildingData} />
          </div>
        </div>
      </div>
    </div>
  );
}

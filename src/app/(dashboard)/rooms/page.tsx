import React from "react";

import RoomsTable from "@/components/tables/RoomsTable";
import { api } from "@/trpc/server";

const RoomsPage = async () => {
  const rooms = await api.room.getRoomsAdminTable.query();

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Rooms</p>
        <div className="my-4">
          <RoomsTable data={rooms} />
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;

import React from "react";

import { api } from "@/trpc/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
const CollegePage = async (props: Props) => {
  const params = await props.params;
  const college = await api.college.getCollege({
    id: Number(params.id),
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">{college?.name}</p>
        <div className="my-4 rounded border p-4">
          <p>Short Name: {college?.shortName}</p>
          <p>Number of Students: {college?.Students.length}</p>
        </div>
      </div>
    </div>
  );
};

export default CollegePage;

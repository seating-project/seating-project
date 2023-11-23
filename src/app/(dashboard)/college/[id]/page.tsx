import React from "react";

import { api } from "@/trpc/server";

interface Props {
  params: {
    id: string;
  };
}
const CollegePage = async (props: Props) => {
  const college = await api.college.getCollege.query({
    id: Number(props.params.id),
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

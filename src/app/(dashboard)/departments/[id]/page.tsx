import React from "react";

import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

const DepartmentPage = async (props: Props) => {
  const department = await api.department.getDepartment.query({
    id: Number(props.params.id),
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">{department?.branch}</p>
        <div className="my-4">
          <p className="text-xl ">Students: {department?.Students.length}</p>
          <p className="text-xl ">ShortName: {department?.shortName}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;

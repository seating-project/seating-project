import React from "react";

import { api } from "@/trpc/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const DepartmentPage = async (props: Props) => {
  const params = await props.params;
  const department = await api.department.getDepartment({
    id: Number(params.id),
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">{department?.branch}</p>
        <div className="my-4">
          <p className="text-xl">Students: {department?.Students.length}</p>
          <p className="text-xl">ShortName: {department?.shortName}</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentPage;

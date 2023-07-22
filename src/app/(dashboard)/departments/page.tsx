import DepartmentTable from "@/components/client/DepartmentsTable";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function DepartmentPage() {
  const departments = await api.department.getDepartments.query();

  const requiredDepartmentData = departments.map((department) => {
    return {
      id: department.id,
      branch: department.branch,
      code: department.code,
      degree: department.Degree.degree,
      type: department.type,
      shortName: department.shortName,
    };
  });

  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Departments</p>
        <div className="my-4">
          <DepartmentTable data={requiredDepartmentData} />
        </div>
      </div>
    </div>
  );
}

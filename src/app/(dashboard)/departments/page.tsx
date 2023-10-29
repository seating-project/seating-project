import DepartmentTable from "@/components/tables/DepartmentsTable";
import { api } from "@/trpc/server";

export default async function DepartmentPage() {
  const departments = await api.department.getDepartmentsAdminTable.query();

  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Departments</p>
        <div className="my-4">
          <DepartmentTable data={departments} />
        </div>
      </div>
    </div>
  );
}

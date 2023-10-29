import StudentTable from "@/components/tables/StudentsTable";
import { api } from "@/trpc/server";

export default async function StudentsPage() {
  const students = await api.student.getStudentsAdminTable.query();
  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <div className="my-4">
          <StudentTable data={students} />
        </div>
      </div>
    </div>
  );
}

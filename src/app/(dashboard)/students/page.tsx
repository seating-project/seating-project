import StudentTable from "@/components/tables/StudentsTable";
import { api } from "@/trpc/server";

export default async function StudentsPage() {
  const students = await api.student.getStudents.query();

  const requiredStudentData = students.map((student) => {
    return {
      id: student.id,
      name: student.name,
      registerNumber: student.registerNumber,
      gender: student.gender,
      department: student.Department.shortName,
      year: student.Year.year,
      degree: student.Degree.degree,
    };
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <div className="my-4">
          <StudentTable data={requiredStudentData} />
        </div>
      </div>
    </div>
  );
}

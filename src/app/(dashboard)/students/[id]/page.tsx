import DeleteStudentButton from "@/components/client/DeleteStudentButton";
import UpdateStudentForm from "@/components/forms/UpdateStudentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function StudentPage({ params }: Props) {
  const studentCurrent = await api.student.getStudent.query({
    id: Number(params.id),
  });

  const requiredStudentData = {
    id: studentCurrent?.id ?? 0,
    name: studentCurrent?.name ?? "",
    registerNumber: studentCurrent?.registerNumber ?? "",
    gender: studentCurrent?.gender ?? "",
    phoneNumber: studentCurrent?.phone_number ?? "",
    department: studentCurrent?.Department.branch ?? "",
    year: String(studentCurrent?.Year.year),
    degree: studentCurrent?.Degree.degree ?? "",
    gateStudent: studentCurrent?.gateStudent ?? false,
  };

  const departments = await api.department.getDepartments.query();
  const requiredDepartments = departments.map((department) => {
    return {
      label: department.branch,
      value: department.branch,
    };
  });

  const years = await api.year.getYears.query();
  const requiredYears = years.map((year) => {
    return {
      label: String(year.year),
      value: String(year.year),
    };
  });

  const degrees = await api.degree.getDegrees.query();
  const requiredDegrees = degrees.map((degree) => {
    return {
      label: degree.degree,
      value: degree.degree,
    };
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <Card className="my-4">
          <CardHeader className="w-full space-y-1 ">
            <div className="flex justify-between">
              <div>
                <div className="flex items-center justify-between space-x-2">
                  <CardTitle className="text-2xl">Update student</CardTitle>
                </div>
                <CardDescription>
                  Update the student information, or delete it
                </CardDescription>
              </div>
              <div className="">
                <DeleteStudentButton id={requiredStudentData.id} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <UpdateStudentForm
              student={requiredStudentData}
              departments={requiredDepartments}
              years={requiredYears}
              degrees={requiredDegrees}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

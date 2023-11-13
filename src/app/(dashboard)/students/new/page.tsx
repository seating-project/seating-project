import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/server";
import AddStudentForm from "@/components/forms/AddStudentForm";

export default async function AddStudentPage() {
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
      label: year.year,
      value: year.year,
    };
  });

  const degrees = await api.degree.getDegrees.query();
  const requiredDegrees = degrees.map((degree) => {
    return {
      label: degree.degree,
      value: degree.degree,
    };
  });

  const colleges = await api.college.getColleges.query();
  const requiredColleges = colleges.map((college) => {
    return {
      label: college.name,
      value: college.name,
    };
  });

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Students</p>
        <Card className="my-4">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between space-x-2">
              <CardTitle className="text-2xl">Add student</CardTitle>
            </div>
            <CardDescription>
              Add a new student to the database.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddStudentForm
              departments={requiredDepartments}
              years={requiredYears}
              degrees={requiredDegrees}
              colleges={requiredColleges}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

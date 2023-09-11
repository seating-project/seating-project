import AllotmentTable from "@/components/tables/AllotmentTable";
import { api } from "@/trpc/server";
import type { Students } from "@/types";

type Props = {
  params: {
    examId: string;
    date: string;
  };
};

export default async function AllotmentDatePage(props: Props) {
  const examId = decodeURIComponent(props.params.examId);
  const date = decodeURIComponent(props.params.date);

  const exam = await api.exam.getExamById.query({
    id: Number(examId),
  });

  const template = await api.template.getTemplate.query({
    id: exam?.templateId as number,
  });

  console.log("=========================")
  console.log("EXAM", exam);
  console.log("=========================")

  console.log("=========================")
  console.log("TEMPLATE", template);
  console.log("=========================")

  const roomsInExam = exam?.RoomsOrder;

  // const students: Students = {};
  // const students: Students = {examName: exam?.name as string,}
  const tempStudents: Students = {};

  if (exam?.isDepartmentsTogether) {
    for (const year of exam?.Years as { id: number; year: number }[]) {
      const deptBoysRight =
        await api.student.getStudentsByYearAndDepartmentsAndGender.query({
          year: year.year,
          department: exam.DepartmentsRightBoys.map((dept) => dept.id),
          gender: "Male",
        });

      const deptBoysLeft =
        await api.student.getStudentsByYearAndDepartmentsAndGender.query({
          year: year.year,
          department: exam.DepartmentsLeftBoys.map((dept) => dept.id),
          gender: "Male",
        });

      const deptGirlsRight =
        await api.student.getStudentsByYearAndDepartmentsAndGender.query({
          year: year.year,
          department: exam.DepartmentsRightGirls.map((dept) => dept.id),
          gender: "Female",
        });

      const deptGirlsLeft =
        await api.student.getStudentsByYearAndDepartmentsAndGender.query({
          year: year.year,
          department: exam.DepartmentsLeftGirls.map((dept) => dept.id),
          gender: "Female",
        });

      const deptRight = await api.student.getStudentsByYearAndDepartments.query(
        {
          year: year.year,
          department: exam.DepartmentsRightBoys.map((dept) => dept.id),
        }
      );

      const deptLeft = await api.student.getStudentsByYearAndDepartments.query({
        year: year.year,
        department: exam.DepartmentsLeftBoys.map((dept) => dept.id),
      });

      template?.isBoysGirlsSeparate
        ? (tempStudents[String(year.year)] = {
            boys: {
              left: deptBoysLeft,
              right: deptBoysRight,
            },
            girls: {
              left: deptGirlsLeft,
              right: deptGirlsRight,
            },
          })
        : (tempStudents[String(year.year)] = {
            left: deptLeft,
            right: deptRight,
          });
    }
  } else if (exam?.isYearsTogether) {
    for (const year of exam?.Years as { id: number; year: number }[]) {
      const boys = await api.student.getStudentsByYearAndGender.query({
        year: year.year,
        gender: "Male",
      });
      const girls = await api.student.getStudentsByYearAndGender.query({
        year: year.year,
        gender: "Female",
      });

      const studentsWhole = await api.student.getStudentsByYear.query({
        year: year.year,
      });

      template?.isBoysGirlsSeparate
        ? (tempStudents[String(year.year)] = {
            boys: boys,
            girls: girls,
          })
        : (tempStudents[String(year.year)] = studentsWhole);
    }
  }

  return (
    <div className="p-8">
      <p className="my-4 text-4xl font-bold">
        Allotments for {exam?.name} on {date}
      </p>
      <AllotmentTable
        exam={exam}
        template={template}
        roomsOrder={roomsInExam}
        date={date}
        students={tempStudents}
      />
    </div>
  );
}

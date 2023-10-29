import ExamTable from "@/components/tables/ExamsTable";
import { api } from "@/trpc/server";

export default async function ExamPage() {
  const exams = await api.exam.getLatestExamsAdminTable.query();

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Exams</p>
        <div className="my-4">
          <ExamTable data={exams} />
        </div>
      </div>
    </div>
  );
}

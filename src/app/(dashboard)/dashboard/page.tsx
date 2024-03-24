import { Button, buttonVariants } from "@/components/ui/button";
import { getServerAuthSession } from "@/server/auth";
import Link from "next/link";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const exams = await api.exam.getLatestExams.query();

  return (
    <div className="w-full">
      <div className="p-8">
        <p className="text-2xl font-bold">Current Exams</p>
        <div className="">
          <div className="flex w-full gap-y-2 space-x-4">
            {exams.map((exam) => (
              <div key={exam.id}>
                <Link href={`/exam/${exam.id}`} className={buttonVariants()}>
                  {exam.name}
                </Link>
              </div>
            ))}
          </div>
          <Button className="my-4">
            <Link href="/create-new">Create Exam</Link>
          </Button>
          <Button className="my-4 mx-4">
            <Link href="/create-new-with-practicals">Create Exam With Practicals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

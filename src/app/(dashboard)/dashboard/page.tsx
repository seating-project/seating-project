import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  // const exams = await api.exam.getLatestExams.query();

  return (
    <div className="w-full ">
      <div className="p-8">
        <p className="text-2xl font-bold">Current Exams</p>
        <div className="">
          {/* {exams.length === 0 ? (
            <div>
              <p>No exams</p> 
            </div>
          ) : (
            <div>
              <p>length {exams.length}</p>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

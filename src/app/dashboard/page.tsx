import { getServerAuthSession } from "@/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <div>
        <p>Not logged in</p>
      </div>
    );
  }

  return (
    <div className="w-full ">
      <div className=" p-8">
        <p className="text-2xl font-bold">Welcome to Seats</p>
        <p className="text-lg font-light">
          Seats is a simple app that allows you to create a seating arrangement
          for exams.
        </p>
      </div>

      {/* A column full of showing current exams and a create exam button */}
    </div>
  );
}

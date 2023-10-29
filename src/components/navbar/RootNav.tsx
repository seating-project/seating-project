import React from "react";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

const RootNav = async () => {
  const session = await getServerAuthSession();
  return (
    <div className=" flex items-center justify-between border-b p-4">
      <div className="rounded-md bg-black p-2 font-mono text-2xl dark:bg-white">
        <Link href="/" passHref>
          <p className=" font-bold text-white dark:text-black ">Seats</p>
        </Link>
      </div>
      <div>
        {session?.user.id && (
          <Link href="/dashboard" passHref>
            <p className=" font-bold text-white dark:text-black ">Dashboard</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default RootNav;

import React from "react";
import Link from "next/link";

import Navbar from "@/components/navbar/NavMenu";
import UserProfile from "@/components/navbar/UserProfile";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { getServerAuthSession } from "@/server/auth";

const MainNav = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-20 w-full items-center justify-between space-x-4 border-b p-4 dark:bg-[#020817]">
      <div className="flex space-x-4">
        <div className="rounded-md bg-black p-2 font-mono text-2xl dark:bg-white">
          {session?.user.id ? (
            <Link href="/dashboard" passHref>
              <p className=" font-bold text-white dark:text-black ">Seats</p>
            </Link>
          ) : (
            <Link href="/" passHref>
              <p className=" font-bold text-white dark:text-black ">Seats</p>
            </Link>
          )}
        </div>
        <Navbar />
      </div>

      <div className="flex items-center space-x-4">
        <ModeToggle />
        <UserProfile />
      </div>
    </div>
  );
};

export default MainNav;

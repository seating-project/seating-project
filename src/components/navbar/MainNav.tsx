import React from "react";
import Navbar from "@/components/navbar/NavMenu";
import UserProfile from "./UserProfile";
import { type Session } from "next-auth";
import Link from "next/link";
import { ModeToggle } from "@/components/theme/ModeToggle";

type Props = {
  session: Session | null;
};

const MainNav = ({ session }: Props) => {
  return (
    <div className="flex w-full h-20 items-center justify-between space-x-4 border-b p-4 dark:bg-[#020817]">
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
        <UserProfile session={session} />
      </div>
    </div>
  );
};

export default MainNav;

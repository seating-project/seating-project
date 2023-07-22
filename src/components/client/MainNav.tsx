import React from "react";
import Navbar from "@/components/client/NavMenu";
import UserProfile from "./UserProfile";
import { type Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const MainNav = ({ session }: Props) => {
  return (
    <div className="flex w-full items-center justify-between space-x-4 border-b p-4 darK:bg-primary">
      <div className="flex space-x-4">
        <div className="rounded-md bg-black p-2 font-mono text-2xl dark:bg-white">
          <Link href="/" passHref>
            <p className=" font-bold text-white dark:text-black ">Seats</p>
          </Link>
        </div>
        <Navbar />
      </div>
      <div>
        <UserProfile session={session} />
      </div>
    </div>
  );
};

export default MainNav;

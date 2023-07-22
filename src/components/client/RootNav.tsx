import { type Session } from "next-auth";
import React from "react";
import Link from "next/link";

type Props = {
  session: Session | null;
};

const RootNav = ({ session }: Props) => {
  return (
    <div className=" flex items-center border-b p-4">
      <div className="rounded-md bg-black p-2 font-mono text-2xl dark:bg-white">
        <Link href="/" passHref>
          <p className=" font-bold text-white dark:text-black ">Seats</p>
        </Link>
      </div>
    </div>
  );
};

export default RootNav;

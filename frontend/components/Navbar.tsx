"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex flex-col items-center min-w-[280px] w-1/5 justify-around p-4 h-full  rounded-r-3xl border-r-2 border-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="flex items-center ">
          <Image
            src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            width={40}
            height={40}
            className="rounded-full border-black border-2"
            alt="logo"
          />
          <h1 className=" text-6xl font-extrabold pl-2   ">Seats</h1>
        </div>
        <hr className="w-full border-black border-1 mt-4" />
      </div>

      <div className="flex flex-col items-center pb-2">
        
        <Link href="/" className="text-xl font-semibold py-3">
          Home
        </Link>
        <Link href="/createexamtemplate" className="text-xl font-semibold py-3">
          Exam Templates
        </Link>
        <Link href="/roomdata" className="text-xl font-semibold py-3">
          Room Data
        </Link>
        <Link href="/examdata" className="text-xl font-semibold py-3">
          Exam Data
        </Link>
        <Link href="/examtemplate" className="text-xl font-semibold py-3">
          Exam Template
        </Link>
        <Link href="/exam" className="text-xl font-semibold py-3">
          Exam
        </Link>
      </div>

      <div className="flex flex-col items-center">
        <Link href="/test" className="text-xl font-semibold py-3">
          Test
        </Link>
        <Link href="/signup" className="text-xl font-semibold">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

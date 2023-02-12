"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex p-8 justify-between bg-white shadow-md absolute w-full">
      <div className="ml-8 flex justify-between items-center mr-8">
        {/* <div className="flex "> */}
        <Link href="/" className="flex">
          {/* <Image
            src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            width={40}
            height={40}
            className="rounded-full border-black border-2 items-center "
            alt="logo"
          /> */}
          <h1 className=" text-6xl font-mono font-semibold text-dark-blue ml-2 items-center border-b-4">Seats</h1>
        </Link>
        {/* </div> */}
        {/* <hr className="w-full border-black border-1 mt-4" /> */}
        
      </div>
      <div className="flex justify-between items-center inline-block relative text-blue after:content-[''] after:absolute after:w-full 
          after:scale-x-0 after:h-[2px] after:bottom-0 after:left-0 after:bg-dark-blue after:origin-bottom-right after:transition-transform
          after:duration-300 ease-out hover:after:scale-x-100 hover:after:origin-bottom-left">
      <Link href="/templates" className="text-xl font-semibold px-6 font-mono  ">
          Templates
        </Link>
      </div>
      <div className="flex pb-2 mr-8">
        <Link href="/test" className="text-xl font-semibold py-3 px-3 font-mono">
          Test
        </Link>
        <Link href="/signup" className="text-xl font-semibold py-3 px-3 font-mono">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

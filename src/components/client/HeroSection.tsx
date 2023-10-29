import React from "react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";

const HeroSection = async () => {
  const session = await getServerAuthSession();

  return (
    <section className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Create Seat Plans in no time
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400 sm:px-16 lg:px-48 lg:text-xl">
          Experience the magic of Seats: effortlessly craft elegant seating
          arrangements for college exams. Streamline your process, saving
          precious time and energy. Embrace simplicity and efficiency with
          Seats, captivating your interest from the very first interaction.
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
          {session?.user ? (
            <Link
              href="/dashboard"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "default", size: "lg" })}
            >
              Contact Us
            </Link>
          )}
          {session?.user ? (
            <Link
              href="Learn More"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Learn More
            </Link>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

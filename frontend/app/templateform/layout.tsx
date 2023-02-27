"use client";
import "../../styles/globals.css";
import Navbar from "../../components/Navbar";

export default function TemplateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="mt-36 mx-8">{children}</div>
        {/* <div className="mt-4 h-screen w-full">
            <SplineBackground />
          </div> */}
      </div>
    </div>
  );
}

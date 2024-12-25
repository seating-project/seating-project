import React from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
};

const Page = ({ children, id }: Props) => {
  return (
    <div
      className="relative mx-auto h-[297mm] w-[210mm] border border-solid border-opacity-10 bg-white p-8 text-black shadow-md"
      id={id}
    >
      {children}
    </div>
  );
};

export default Page;

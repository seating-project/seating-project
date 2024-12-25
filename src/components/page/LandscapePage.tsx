import React from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
};

const Page = ({ children, id }: Props) => {
  return (
    <div
      className="relative mx-auto h-[210mm] w-[297mm] border border-solid border-black bg-white p-6 text-black shadow-md"
      id={id}
    >
      {children}
    </div>
  );
};

export default Page;

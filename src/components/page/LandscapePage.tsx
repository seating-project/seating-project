"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
  id?: string;
};

const Page = ({ children, id }: Props) => {
  return (
    <div className="page w-[297mm] h-[210mm] relative mx-auto border border-solid border-opacity-10 bg-white text-black p-6 shadow-md" id={id}>
      <style jsx>
        {`
          @page {
            size: A4;
            margin: 0;
          }
        `}
      </style>
      {children}
    </div>
  );
};

export default Page;

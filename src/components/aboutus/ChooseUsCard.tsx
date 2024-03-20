"use client";

import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  desc: string;
};
export default function ({icon,title,desc}: Props) {
  return (
    <div className="text-center sm:flex sm:text-left lg:block lg:text-center border border-[#D1D5DB] rounded-lg p-8">
      <div className="sm:flex-shrink-0 flex justify-center items-center">
        <div className="bg-[#F5F5F5] rounded-full w-fit h-fit p-4">{icon}</div>
      </div>
      <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
        <h3 className="text-lg text-gray-900 font-semibold mb-2">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}

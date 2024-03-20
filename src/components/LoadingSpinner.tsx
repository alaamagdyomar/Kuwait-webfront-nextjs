"use client";
// import { Spinner } from "flowbite-react";

export default function ({ isLoading }: { isLoading: boolean }) {
  return (
    <div
      className={`${
        !isLoading ? `hidden` : ``
      } w-full h-full flex justify-center items-center py-8`}>
      <div
        className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
        role='status'>
        <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
          Loading...
        </span>
      </div>
    </div>
  );
}

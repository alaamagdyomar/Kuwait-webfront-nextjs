import DOMPurify from "isomorphic-dompurify";
import React from "react";

type Props = {
  title: string;
  content: string;
};

export default function ({ title, content }: Props): React.ReactNode {
  return (
    <div className='px-4 pt-8  mx-auto xl:px-[8%] w-full'>
      <div className=' text-center'>
        <h2 className='text-2xl font-bold tracking-tight text-black sm:text-4xl capitalize'>
          {title}
        </h2>
        <div className='mt-6 text-lg leading-8 text-gray-800 '>
          <div
            className='whitespace-pre-line text-ellipsis overflow-hidden'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content),
            }}></div>
        </div>
      </div>
    </div>
  );
}

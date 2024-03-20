"use client";
import type { Locale } from "@/i18n.config";
import { useParams } from "next/navigation";
import Logo from "@/appImages/logo_dark.svg";
import ContentLayout from "@/src/components/layouts/MainContentLayout";

type Props = {
  params: { lang: Locale };
};

export default function Loading() {
  const { lang }: any = useParams();

  return (
    <ContentLayout>
      <div className='h-auto min-h-screen w-auto flex  justify-center items-center bg-opacity-10 bg-white'>
        <div className='w-1/3 md:w-20 xl:w-24 p-2'>
          <Logo className='h-8 w-36 text-white' />
        </div>
      </div>
    </ContentLayout>
  );
}

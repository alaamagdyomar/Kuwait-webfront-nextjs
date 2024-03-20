import ContentLayout from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import NotFoundImg from "@/appImages/not_found.svg";

export default async function NotFound() {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
  const country: any = cookieStore.get("NEXT_COUNTRY_NAME")?.value;
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <ContentLayout>
      <div className='min-h-fit flex flex-col my-[10%] justify-start items-center '>
        <NotFoundImg className='w-[300px] h-auto' />
        <div className='flex flex-col justify-center items-center gap-y-2'>
          <p className='text-center capitalize text-xl'>
            {trans.results_not_found}
          </p>
          <p className='text-center text-gray-400 text-md '>
            {trans.results_not_found_message}
          </p>
          <Link href={`/${lang}/${country}`} className='btn-gray mt-4 w-32'>
            {trans.browse_picks}
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
}

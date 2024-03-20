import ContentLayout from "@/layouts/MainContentLayout";
import { getDictionary } from "@/lib/dictionary";
import Link from "next/link";
import { cookies } from "next/headers";
import Image from "next/image";
import NotFoundImg from "@/appImages/not_found.svg";

export default async function NotFound() {
  const cookieStore = cookies();
  const lang: any = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <ContentLayout>
      <div className='min-h-fit flex flex-col my-[10%] justify-start items-center '>
        <NotFoundImg className='w-[300px] h-auto' />
        <div className='flex flex-col justify-center items-center  gap-y-8'>
          <p className='capitalize'>{trans.not_found}</p>
          <Link href={`/${lang}`} className='btn-gray w-32'>
            browse picks
          </Link>
        </div>
      </div>
    </ContentLayout>
  );
}

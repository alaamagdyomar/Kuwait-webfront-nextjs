import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import DownloadAppSection from "@/src/components/home/DownloadAppSection";

type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.terms,
    description: trans.terms,
    openGraph: {
      title: trans.terms,
      description: trans.terms,
      locale: params.lang,
      type: "website",
    },
  };
}

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <ContentLayout>
      <PageHeader img={``} title={trans.terms} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <h1 className='capitalize text-2xl'>terms</h1>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>
        <p className='py-4 text-gray-500 leading-loose text-justify'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
          delectus molestias impedit facere, nesciunt esse earum aspernatur
          ipsam tempora dignissimos excepturi laboriosam odit alias sed
          reprehenderit minima fuga quas aliquid?
        </p>
      </div>
    </ContentLayout>
  );
}

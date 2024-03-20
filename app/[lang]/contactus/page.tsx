import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import ContactusImg from "@/appImages/contactus.png";
import ContactusForm from "@/src/components/contactus/ContactusForm";
type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.contactus,
    description: trans.contactus,
    openGraph: {
      title: trans.contactus,
      description: trans.contactus,
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
    <ContentLayout showMiddleNav={false}>
      <PageHeader img={ContactusImg.src} title={trans.contactus} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <ContactusForm />
      </div>
    </ContentLayout>
  );
}

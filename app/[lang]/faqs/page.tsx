import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { getCountryNameCookie } from "@/app/actions";
import { AppQueryResult, Faq } from "@/src/types/queries";
import { getFaqs } from "@/utils/faq";
import FaqCard from "@/src/components/faq/FaqCard";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import PageHeader from "@/src/components/PageHeader";
import FaqImg from "@/appImages/faqs.png";

type Props = {
  params: { lang: Locale["lang"] };
};

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.faqs,
    description: trans.faqs,
    openGraph: {
      title: trans.faqs,
      description: trans.faqs,
      locale: params.lang,
      type: "website",
    },
  };
}

export default async function ({ params: { lang } }: Props) {
  const country: any = await getCountryNameCookie();
  const [{ trans }, faqs]: [{ trans: any }, AppQueryResult<Faq[]>] =
    await Promise.all([getDictionary(lang), getFaqs()]);

  return (
    <ContentLayout>
      <PageHeader img={FaqImg.src} title={`faqs`} />
      <div className='bg-white'>
        <div className='mx-auto max-w-7xl px-6 py-14 sm:py-22 lg:px-8 lg:py-40'>
          <div className='mx-auto max-w-4xl divide-y divide-gray-900/10'>
            <h2 className='text-2xl font-bold leading-10 tracking-tight text-gray-900'>
              Frequently asked questions
            </h2>
            <dl className='mt-10 space-y-6 divide-y divide-gray-900/10'>
              {faqs.data.map((faq, i) => (
                <FaqCard faq={faq} key={i} />
              ))}
            </dl>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
}

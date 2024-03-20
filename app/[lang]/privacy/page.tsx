import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import DownloadAppSection from "@/src/components/home/DownloadAppSection";
import PrivacyImg from "@/appImages/privacy_img.png";
type Props = {
  params: { lang: Locale["lang"] };
};

const incentives = [
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
  {
    name: "Free shipping",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-shipping-simple.svg",
    description:
      "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
  },
  {
    name: "10-year warranty",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-warranty-simple.svg",
    description:
      "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
  },
  {
    name: "Exchanges",
    imageSrc:
      "https://tailwindui.com/img/ecommerce/icons/icon-exchange-simple.svg",
    description:
      "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
  },
];

export async function generateMetadata({ params }: Props) {
  const { trans } = await getDictionary(params.lang);
  return {
    title: trans.aboutus,
    description: trans.aboutus,
    openGraph: {
      title: trans.aboutus,
      description: trans.aboutus,
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
      <PageHeader img={PrivacyImg.src} title={trans.privacy_policy} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <h1 className='capitalize text-2xl'>
          what information do we collect ?
        </h1>
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

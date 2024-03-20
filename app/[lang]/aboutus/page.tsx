import { Locale } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getCountryNameCookie } from "@/app/actions";
import Image from "next/image";
import PageHeader from "@/src/components/PageHeader";
import DownloadAppSection from "@/src/components/home/DownloadAppSection";
import AboutusImg from "@/appImages/about_us.png";
import ChooseUsCard from "@/src/components/aboutus/ChooseUsCard";
import Exclusive_offers from "@/appIcons/aboutus/exclusive_offers.svg";
import Customer_service from "@/appIcons/aboutus/customer_service.svg";
import Order_faster from "@/appIcons/aboutus/order_faster.svg";
import Order_tracking from "@/appIcons/aboutus/order_tracking.svg";
import Order_ways from "@/appIcons/aboutus/order_ways.svg";
import Payment_methods from "@/appIcons/aboutus/payment_methods.svg";
import CustomerCarsoul from "@/src/components/aboutus/CustomerCarsoul";

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
      <PageHeader img={AboutusImg.src} title={trans.aboutus} />
      <div className='mt-20 text-black px-4 md:px-8 min-h-screen'>
        <h1 className='capitalize text-2xl'>
          what is <span className='text-picks-dark'>pick</span> App ?
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

        <div className='bg-white'>
          <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8'>
            <div className='rounded-2xl px-6 py-6 sm:p-16'>
              <div className='mx-auto max-w-xl lg:max-w-none'>
                <div className='text-center'>
                  <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                    {trans.why_us}{" "}
                    <span className='text-picks-dark'>{trans.choose}</span>{" "}
                    {trans.us}
                  </h2>
                  <p className='text-picks-text-grey2'>
                    {
                      trans.learn_about_the_most_important_features_of_the_Picks_app
                    }
                  </p>
                </div>

                <div className='mx-auto mt-12 grid max-w-sm grid-cols-1 gap-x-8 gap-y-10 sm:max-w-none lg:grid-cols-3'>
                  <ChooseUsCard
                    icon={<Order_ways height={40} width={40} />}
                    title='Different ways to order'
                    desc='You can have the order delivered to your address or pick it up from the store.'
                  />
                  <ChooseUsCard
                    icon={<Exclusive_offers height={40} width={40} />}
                    title='Many exclusive offers'
                    desc='Shop many offers and discounts on the most famous brands everywhere around you.'
                  />
                  <ChooseUsCard
                    icon={<Order_faster height={40} width={40} />}
                    title='Order faster and easier'
                    desc='Now you will be able to order whatever you want in quick and easy steps than before.'
                  />
                  <ChooseUsCard
                    icon={<Customer_service height={40} width={40} />}
                    title='Customer Service'
                    desc='Help is available 24/7 through online chat or social accounts.'
                  />
                  <ChooseUsCard
                    icon={<Payment_methods height={40} width={40} />}
                    title='Various payment methods'
                    desc='We provide many different payment methods, such as cash upon delivery or online payment cards.'
                  />
                  <ChooseUsCard
                    icon={<Order_tracking height={40} width={40} />}
                    title='Order tracking service'
                    desc='You can track your order first until it reaches you online via the application or website.'
                  />
                  {/* {incentives.map((incentive) => (
                    <div
                      key={incentive.name}
                      className="text-center sm:flex sm:text-left lg:block lg:text-center"
                    >
                      <div className="sm:flex-shrink-0">
                        <div className="flow-root">
                          <img
                            className="mx-auto h-16 w-16"
                            src={incentive.imageSrc}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="mt-3 sm:ml-6 sm:mt-0 lg:ml-0 lg:mt-6">
                        <h3 className="text-sm font-medium text-gray-900">
                          {incentive.name}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500">
                          {incentive.description}
                        </p>
                      </div>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* customers */}
        {/* <div className="bg-gray-50 -mx-8">
          <div className="mx-auto max-w-7xl py-24 sm:px-2 sm:py-32 lg:px-4">
            <div className="mx-auto max-w-2xl px-4 lg:max-w-none">
              <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 lg:grid-cols-2">
                <div>
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    We built our business on great customer service
                  </h2>
                  <p className="mt-4 text-gray-500">
                    At the beginning at least, but then we realized we could
                    make a lot more money if we kinda stopped caring about that.
                    Our new strategy is to write a bunch of things that look
                    really good in the headlines, then clarify in the small
                    print but hope people don't actually read it.
                  </p>
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/incentives-07-hero.jpg"
                    alt=""
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <CustomerCarsoul />

        <DownloadAppSection />
      </div>
    </ContentLayout>
  );
}

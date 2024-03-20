import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { getVendor } from "@/utils/user";
import { AppQueryResult, User } from "@/src/types/queries";
import { notFound } from "next/navigation";
import VendorHeader from "@/src/components/user/VendorHeader";
import VendorContent from "@/src/components/user/VendorContent";
import RatingAndReviewsCard from "@/src/components/user/RatingAndReviewsCard";
import Breadcrumbs from "@/components/BreadCrumbs";
import ProductsSlider from "@/src/components/sliders/ProductsSlider";
import SwitchDeliveryPickup from "@/src/components/user/SwitchDeliveryPickup";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  params: {
    id: string;
    lang: Locale["lang"];
    country: countriesList;
  };
  searchParams: { slug?: string; branch_id?: string };
};

export default async function ({
  params: { lang, country, id },
  searchParams,
}: Props) {
  const [{ trans }, vendor]: [{ trans: any }, AppQueryResult<User>] =
    await Promise.all([
      getDictionary(lang),
      getVendor({ id, branch_id: searchParams?.branch_id ?? `` }),
    ]);

  if (!vendor || !vendor.data.vendor) notFound();
  const { logo, store_name, description, image, category, favorite } =
    vendor.data.vendor;

  return (
    <ContentLayout showMiddleNav={true}>
      <div className='mt-8 px-4'>
        <Breadcrumbs title={store_name} />
        <VendorHeader
          id={id}
          favorite={favorite}
          title={store_name}
          logo={logo}
          bg={image}
        />
        <div className='px-4 grid grid-cols-1 md:grid-cols-3 mt-12 gap-y-4 w-full'>
          <div className='col-span-full lg:col-span-2 '>
            <h1 className='text-3xl pb-4'>{store_name}</h1>
            <div className='flex flex-1 mb-3'>
              <p className='text-gray-400 rtl:pl-2 ltr:pr-2 ltr:border-r rtl:border-l border-gray-400'>
                {category}
              </p>
            </div>
            {vendor.data.vendor.status === "open" ? (
              <div className='flex flex-row gap-x-3 justify-start items-center'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'>
                    <path
                      d='M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                      stroke='#12B76A'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div className='capitalize '>
                  <span className='text-[#12B76A]'>{trans.open_now}</span>
                  <span></span>
                </div>
              </div>
            ) : (
              <div className='flex flex-row gap-x-3 justify-start items-center'>
                <div>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'>
                    <path
                      d='M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z'
                      stroke='#F04438'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div className='capitalize '>
                  <span className='text-[#F04438]'>{trans.closed_now}</span>
                  <span></span>
                </div>
              </div>
            )}

            {/* <RatingAndReviewsCard
              rate={vendor.data.vendor.rate}
              ratings={vendor.data.vendor.ratings}
            /> */}
          </div>
          <div className='col-span-full lg:col-span-1 flex flex-row justify-end items-center w-full '>
            <div className='relative w-full rounded-full shadow-sm me-4'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                <MagnifyingGlassIcon
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              </div>
              <input
                type='text'
                name='search'
                id='search'
                className='input-default ltr:pl-10 rtl:pr-10 rounded-full capitalize w-full'
                placeholder={`${trans.search_in_menu}`}
              />
            </div>
          </div>
        </div>
        {/* delivery & pickup & branch */}
        <SwitchDeliveryPickup vendor={vendor.data.vendor} />
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <ProductsSlider
            products={vendor.data.items}
            title={trans.big_deals}
          />
        )}
        {vendor.data.items && vendor.data.items?.length > 0 && (
          <VendorContent products={vendor.data.items} />
        )}
      </div>
    </ContentLayout>
  );
}

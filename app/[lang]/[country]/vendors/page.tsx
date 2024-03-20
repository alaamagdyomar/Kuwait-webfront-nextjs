import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getProducts } from "@/utils/product";
import {
  AppQueryResult,
  Category,
  ElementPagination,
  Product,
  Slide,
  User,
} from "@/src/types/queries";
import { convertSearchParamsToString, throttleLimit } from "@/utils/helpers";
import Pagination from "@/src/components/Pagination";
import { getCategories } from "@/utils/category";
import { getVendors } from "@/utils/user";
import { getSlides } from "@/utils/slide";
import { notFound } from "next/navigation";
import CategoriesSlider from "@/src/components/sliders/CategoriesSlider";
import AdsSlider from "@/src/components/sliders/AdsSlider";
import CustomSlider from "@/src/components/sliders/VendorsSlider";
import ProductsSlider from "@/src/components/sliders/ProductsSlider";
import VendorsList from "@/src/components/lists/VendorsList";
import ProductsList from "@/src/components/lists/ProductsList";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; search: string };
  searchParams: { [key: string]: string } | string;
};

export default async function (props: Props) {
  const cookieStore = cookies();
  const {
    params: { lang, country },
    searchParams,
  }: any = props;
  const token: any = cookieStore.get("token");
  const transFn = throttleLimit(() => getDictionary(lang));
  const categoriesFn = throttleLimit(() => getCategories());
  const slidesFn = throttleLimit(() =>
    getSlides(`category_id=${searchParams?.category_id}&screen_type=category`)
  );
  const vendorsFn = throttleLimit(() =>
    getVendors(convertSearchParamsToString(searchParams))
  );
  const [{ trans }, categories, slides, vendors]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<User[]>
  ] = await Promise.all([transFn(), categoriesFn(), slidesFn(), vendorsFn()]);

  return (
    <ContentLayout showMiddleNav={true}>
      {categories?.data?.length > 0 && (
        <CategoriesSlider categories={categories.data} />
      )}
      <div className='px-2 md:px-8'>
        {slides?.data?.length > 0 && <AdsSlider slides={slides.data} />}

        {/* {vendors?.data?.length > 0 && (
          <CustomSlider vendors={vendors.data} title={"vendors"} />
        )} */}
        {vendors?.data?.length > 0 && (
          <VendorsList elements={vendors.data} title={trans.vendors} />
        )}
        <Pagination links={vendors.pagination?.links} />
      </div>
    </ContentLayout>
  );
}

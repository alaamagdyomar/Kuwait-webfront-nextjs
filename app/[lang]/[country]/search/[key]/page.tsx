import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { cookies } from "next/headers";
import { getProducts, getSearchItems } from "@/utils/product";
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
import ProductsList from "@/src/components/lists/ProductsList";
import VendorsList from "@/src/components/lists/VendorsList";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList; key: string };
  searchParams: { [key: string]: string } | string;
};

export default async function (props: Props) {
  const cookieStore = cookies();
  const {
    params: { lang, country, key },
    searchParams,
  }: any = props;
  console.log("key =======>", key);
  const transFn = throttleLimit(() => getDictionary(lang));
  const categoriesFn = throttleLimit(() => getCategories());
  const slidesFn = throttleLimit(() =>
    getSlides(`category_id=${searchParams?.category_id}&screen_type=category`)
  );
  const itemsFn = throttleLimit(() => getSearchItems(key));
  const [{ trans }, categories, slides, items]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<any>
  ] = await Promise.all([transFn(), categoriesFn(), slidesFn(), itemsFn()]);
  console.log("items ------>", items?.data?.store?.data);
  console.log(
    "case =====>",
    items?.data?.offer?.count === 0 && items?.data?.store?.count === 0
  );
  if (
    items?.data?.offer?.count === 0 &&
    items?.data?.store?.count === 0 &&
    !key
  )
    return notFound();
  return (
    <ContentLayout showMiddleNav={true}>
      {categories?.data?.length > 0 && (
        <CategoriesSlider categories={categories.data} />
      )}
      <div className='px-2 md:px-8'>
        {slides?.data?.length > 0 && <AdsSlider slides={slides.data} />}
        {/* {items?.data?.offer?.data?.length > 1 && (
          <ProductsSlider products={items?.data?.offer?.data} title={"Top "} />
        )} */}
        {items?.data?.offer?.data.length > 0 && (
          <ProductsList
            elements={items?.data?.offer?.data}
            title={trans.offers}
          />
        )}
        {/* {items?.data?.store?.data.length > 1 && (
          <CustomSlider vendors={items?.data?.store?.data} title={"vendors"} />
        )} */}
        {items?.data?.store?.data.length > 0 && (
          <VendorsList
            elements={items?.data?.store?.data}
            title={trans.vendors}
          />
        )}
      </div>
    </ContentLayout>
  );
}

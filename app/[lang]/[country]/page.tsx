import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import {
  AppQueryResult,
  Category,
  ElementPagination,
  Product,
  Slide,
  User,
} from "@/types/queries";
import { getCategories } from "@/utils/category";
import { getSlides } from "@/utils/slide";
import { getProducts } from "@/utils/product";
import { getVendorFeatured, getVendors } from "@/utils/user";
import HomeContent from "@/src/components/home/HomeContent";
import LoadingSpinner from "@/src/components/LoadingSpinner";
import { throttleLimit } from "@/utils/helpers";

type Props = {
  params: { lang: Locale["lang"]; country: countriesList };
};

export default async function ({ params: { lang, country } }: Props) {
  const transFn = throttleLimit(() => getDictionary(lang));
  const categoriesFn = throttleLimit(() => getCategories());
  const slidersFn = throttleLimit(() => getSlides(`screen_type=home&limit=10`));
  const productsFn = throttleLimit(() => getProducts(`limit=10`));
  const vendorsFn = throttleLimit(() => getVendors(`limit=10`));
  const featuredVendorsFn = throttleLimit(() => getVendorFeatured(`limit=10`));
  const [{ trans }, categories, sliders, products, vendors, featuredVendors]: [
    { trans: any },
    AppQueryResult<Category[]>,
    AppQueryResult<Slide[]>,
    ElementPagination<Product[]>,
    AppQueryResult<User[]>,
    AppQueryResult<User[]>
  ] = await Promise.all([
    transFn(),
    categoriesFn(),
    slidersFn(),
    productsFn(),
    vendorsFn(),
    featuredVendorsFn(),
  ]);

  return (
    <ContentLayout showMiddleNav={true}>
      <HomeContent
        lang={lang}
        country={country}
        categories={categories.data}
        slides={sliders.data}
        products={products.data}
        vendors={vendors.data}
        featuredVendors={featuredVendors.data}
      />
    </ContentLayout>
  );
}

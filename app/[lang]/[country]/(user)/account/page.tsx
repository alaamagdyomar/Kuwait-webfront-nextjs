import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";
import { AppQueryResult, Product } from "@/src/types/queries";
import { notFound } from "next/navigation";
import { getProduct } from "@/utils/product";

type Props = {
  params: {
    lang: Locale["lang"];
    country: countriesList;
  };
};

export default async function ({ params: { lang, country } }: Props) {
  const [{ trans }]: [{ trans: any }] = await Promise.all([
    getDictionary(lang),
  ]);

  return (
    <ContentLayout showMiddleNav={true}>
      <h1>Account </h1>
    </ContentLayout>
  );
}

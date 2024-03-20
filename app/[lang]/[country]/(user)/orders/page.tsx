import { Locale, countriesList } from "@/types/index";
import { getDictionary } from "@/lib/dictionary";
import ContentLayout from "@/layouts/MainContentLayout";

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
    <ContentLayout>
      <h1>orders </h1>
    </ContentLayout>
  );
}

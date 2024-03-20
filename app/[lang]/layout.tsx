import "@/styles/globals.css";
import { Locale } from "@/types/index";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";
import { getSetting } from "@/utils/setting";
import { globalMaxWidth, removeTags } from "@/utils/helpers";

type Props = {
  params: { lang: Locale["lang"] };
};
// or Dynamic metadata
export async function generateMetadata({ params }: Props) {}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale["lang"] };
}) {
  return (
    <html
      className={`min-h-screen ${globalMaxWidth} mx-auto `}
      lang={params.lang}
      dir={params.lang === "ar" ? "rtl" : "ltr"}>
      <body
        className={`font-expo-medium`}
        dir={params.lang === "ar" ? "rtl" : "ltr"}>
        <Providers>
          <MainLayout lang={params.lang}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}

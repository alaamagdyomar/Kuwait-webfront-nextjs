import "@/styles/globals.css";
import { Locale } from "@/types/index";
import Providers from "@/src/redux/provider";
import MainLayout from "@/src/components/layouts/MainLayout";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slick.css";
import { globalMaxWidth } from "@/utils/helpers";

type Props = {
  lang: Locale["lang"];
};
export async function generateMetadata({ lang }: Props) {
  return {
    title: "picks",
    description: "picks description",
    lang: lang,
    openGraph: {
      title: "picks",
      description: "picks description",
      url: "instagram",
      siteName: "picks",
      images: [
        {
          url: "image",
          width: 800,
          height: 600,
        },
        {
          url: "image here",
          width: 1800,
          height: 1600,
          alt: "picks",
        },
      ],
      locale: lang,
      type: "website",
    },
    generator: "picks",
    applicationName: "picks",
    keywords: "keywords picks",
    authors: [{ name: "picks" }, { name: "picks", url: " url" }],
    creator: "picks",
    publisher: "picks",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL,
    alternates: {
      canonical: "/",
      languages: {
        "ar-SA": "/ar",
        "en-US": "/en",
      },
    },
    icons: {
      icon: "image here",
      shortcut: "image here",
      apple: "image here",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "image here",
      },
    },
    twitter: {
      card: "picks",
      title: "picks",
      description: "picks description",
      // siteId: "1467726470533754880",
      creator: "picks",
      // creatorId: "1467726470533754880",
      images: ["image here"],
    },
  };
}
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Props;
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

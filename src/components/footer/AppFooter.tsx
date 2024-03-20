"use client";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { useParams } from "next/navigation";
import Link from "next/link";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import LogoLight from "@/appImages/logo_light.svg";
import { globalMaxWidth } from "@/utils/helpers";
import { useGetFooterPagesQuery, useGetFooterUrlsQuery } from "@/src/redux/api";
import Image from "next/image";
import { useGetAreasQuery } from "@/src/redux/api/areaApi";
import { map, take } from "lodash";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/src/redux/hooks";

export default function (): React.ReactNode {
  const { t } = useTranslation("trans");
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const {
    country: { country_code },
  } = useAppSelector((state) => state);
  const { data: pages } = useGetFooterPagesQuery();
  const { data: footerUrls } = useGetFooterUrlsQuery();
  const { data: areas, isSuccess: areasSuccess } = useGetAreasQuery(undefined);

  return (
    <footer
      aria-labelledby='footer-heading'
      className='relative bottom-0 bg-[#032A37] w-full'>
      <h2 id='footer-heading' className='sr-only'>
        Footer
      </h2>
      <div className={`mx-auto ${globalMaxWidth}  px-4 sm:px-6 lg:px-8`}>
        <div className='pt-10 pb-8 mb-8 border-b border-opacity-20 border-gray-50  grid grid-cols-2 md:grid-cols-6 gap-8 md:space-y-0'>
          <div>
            <Link
              href={appLinks.aboutus(lang)}
              className='text-sm font-medium text-white truncate capitalize'>
              {t("aboutus")}
            </Link>
          </div>
          <div>
            <Link
              href={appLinks.faqs(lang)}
              className='text-sm font-medium text-white truncate capitalize'>
              {t("faqs")}
            </Link>
          </div>
          <div>
            <Link
              href={appLinks.terms(lang)}
              className='text-sm font-medium text-white truncate capitalize'>
              {t("privacy_policy")}
            </Link>
          </div>
          <div>
            <Link
              href={appLinks.terms(lang)}
              className='text-sm font-medium text-white truncate capitalize'>
              {t("terms")}
            </Link>
          </div>
          <div>
            <Link
              href={appLinks.contactus(lang)}
              className='text-sm font-medium text-white truncate capitalize'>
              {t("contactus")}
            </Link>
          </div>
        </div>
        <div className=' xl:grid xl:grid-cols-3 xl:gap-8'>
          <div className='grid grid-cols-2 gap-8 xl:col-span-2 '>
            <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
              <div>
                <h3 className='text-sm font-medium text-white'>Shop</h3>
                <ul role='list' className='mt-6 space-y-2'>
                  <li className='text-sm'>
                    <Link
                      href={`${appLinks.aboutus(lang)}`}
                      className='text-gray-300 hover:text-white'>
                      <LogoLight className='w-[12vh] h-[5vh]' />
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      href={`${appLinks.aboutus(lang)}`}
                      className='text-gray-300 hover:text-white'>
                      <AppGallery className='w-[14vh] h-[5vh]' />
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      href={`${appLinks.aboutus(lang)}`}
                      className='text-gray-300 hover:text-white'>
                      <GooglePlay className='w-[14vh] h-[5vh]' />
                    </Link>
                  </li>
                  <li className='text-sm'>
                    <Link
                      href={`${appLinks.aboutus(lang)}`}
                      className='text-gray-300 hover:text-white'>
                      <AppGallery className='w-[14vh] h-[5vh]' />
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-sm font-medium text-white capitalize'>
                  {t("restaurants")}
                </h3>
                <ul role='list' className='mt-6 space-y-6'>
                  {pages?.data?.restaurants?.map((item: any, i: number) => (
                    <li key={i} className='text-sm'>
                      <Link
                        href={appLinks.vendor(
                          lang,
                          country_code,
                          item.id,
                          item.store_name.en
                        )}
                        className='text-gray-300 hover:text-white capitalize'>
                        {item.store_name[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className='space-y-12 md:grid md:grid-cols-2 md:gap-8 md:space-y-0'>
              <div>
                <h3 className='text-sm font-medium text-white capitalize'>
                  {t("cuisines")}
                </h3>
                <ul role='list' className='mt-6 space-y-6'>
                  {pages?.data?.cuisines?.map((item: any, i: number) => (
                    <li key={i} className='text-sm'>
                      <Link
                        href={appLinks.offers(
                          lang,
                          country_code,
                          `category_id=${item.id}`
                        )}
                        className='text-gray-300 hover:text-white capitalize'>
                        {item.name[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className='text-sm font-medium text-white capitalize'>
                  {t("popular_areas")}
                </h3>
                {params?.country && (
                  <ul role='list' className='mt-6 space-y-6'>
                    {areasSuccess &&
                      map(take(areas.data, 4), (item: any, i: number) => (
                        <li key={i} className='text-sm'>
                          <Link
                            href={appLinks.home(lang, params?.country)}
                            className='text-gray-300 hover:text-white capitalize'>
                            {item.web_name[lang]}
                          </Link>
                        </li>
                      ))}
                    <li className='text-sm'>
                      <Link
                        href={appLinks.home(lang, params?.country)}
                        className='text-gray-300 hover:text-white capitalize truncate'>
                        {t("more_areas")}...
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mx-auto ${globalMaxWidth} px-4 py-8 mt-8 md:flex md:items-center md:justify-between lg:px-8 border-t border-opacity-20 border-gray-50`}>
          <div className='flex justify-center gap-x-6 md:order-2 '>
            {footerUrls?.data?.links?.map((item: any, i: number) => (
              <a
                key={i}
                href={item.link}
                className='text-gray-400 hover:text-gray-500'>
                <span className='sr-only'>{item.name}</span>
                <Image
                  className='h-6 w-6'
                  src={item.icon}
                  width={10}
                  height={10}
                  aria-hidden='true'
                  alt={item.name}
                />
              </a>
            ))}
          </div>
          <div className='mt-8 md:order-1 md:mt-0'>
            <p className='text-center text-xs leading-5 text-gray-500'>
              &copy; {moment().format("Y")} {t("copy_right")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

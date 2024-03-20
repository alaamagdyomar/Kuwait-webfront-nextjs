"use client";
import { ReactNode, useContext } from "react";
import downloadApp from "@/appImages/landing_download_app.png";
import Image, { StaticImageData } from "next/image";
import No_order_calls from "@/appIcons/landing/no_order_calls.svg";
import Flash_offers from "@/appIcons/landing/flash_offers.svg";
import Tracking_orders from "@/appIcons/landing/tracking_orders.svg";
import GooglePlay from "@/appIcons/landing/download_google_play.svg";
import AppleStore from "@/appIcons/landing/download_apple_store.svg";
import AppGallery from "@/appIcons/landing/download_app_gallery.svg";
import { useTranslation } from "react-i18next";
type Props = {};

export default function DownloadAppSection({}: Props) {
  const { t } = useTranslation("trans");

  const FeatureComponent = ({
    icon,
    title,
    text,
  }: {
    icon: ReactNode;
    title: string;
    text: string;
  }) => {
    return (
      <div className='flex gap-x-8 mb-7'>
        {icon}
        <div className='w-2/3'>
          <p className='font-semibold'>{t(title)}</p>
          <p className='text-sm md:text-md text-gray-600 my-1 leading-loose'>
            {t(text)}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1  md:grid-cols-2 place-items-center  gap-x-3 max-h-[auto]  md:max-h-[100vh]'>
      {/* text */}
      <div className='col-span-1 order-2 md:order-1'>
        <div className='order-2 md:order-1 h-full flex flex-col justify-center max-w-[50rem]'>
          <p className='text-3xl font-semibold mb-10'>
            {t("discover_the_new")}{" "}
            <span className='text-picks-dark'>{t("picks")}</span> {t("app")}
          </p>
          <FeatureComponent
            icon={<Flash_offers className='w-14 h-14' />}
            title='flash_daliy_offers'
            text='flash_offer_desc'
          />

          <FeatureComponent
            icon={<No_order_calls className='w-14 h-14' />}
            title='no_order_calls'
            text='order_calls_desc'
          />

          <FeatureComponent
            icon={<Tracking_orders className='w-14 h-14' />}
            title='tracking_orders'
            text='tracking_orders_desc'
          />

          <div className='flex gap-x-3 sm:justify-center lg:justify-start items-center w-full'>
            <button>
              <GooglePlay className='w-full h-36' />
            </button>
            <button>
              <AppleStore className='w-full h-36' />
            </button>
            <button>
              <AppGallery className='w-full h-36' />
            </button>
          </div>
        </div>
      </div>

      {/* image */}
      <div className='col-span-1 order-1 md:order-2 flex justify-center md:justify-end'>
        <Image
          alt='download app'
          src={downloadApp}
          width={1000}
          height={1000}
          className='w-auto h-[100vh] object-cover'
        />
      </div>
    </div>
  );
}

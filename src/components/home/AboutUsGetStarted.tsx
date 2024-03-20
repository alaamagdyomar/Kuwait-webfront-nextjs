import Image, { StaticImageData } from "next/image";
import RightArrow from "@/appIcons/landing/right_arrow.svg";
import about_us from "@/appImages/about_us.png";
import get_started from "@/appImages/get_started.jpg";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

type Props = {};

export default function AboutUsGetStarted({}: Props) {
  const { t } = useTranslation("trans");

  const CardComponent = ({
    title,
    text,
    imageSrc,
    btnText,
  }: {
    title: string;
    text: string;
    imageSrc: StaticImageData;
    btnText: string;
  }) => {
    return (
      <div className='text-white w-full h-auto aspect-[1/1] max-w-[50rem] max-h-[25rem] rounded-lg relative'>
        <Image
          alt='about_us'
          src={imageSrc}
          width={1000}
          height={1000}
          className='w-full h-full rounded-lg'
          unoptimized
        />
        {/* overlay */}
        <div className='flex items-end rounded-lg absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50'>
          <div className='p-5 h-fit'>
            <p className='text-lg font-semibold'>{t(title)}</p>
            <p className='text-sm py-2'>{t(text)}</p>
            <button className='flex items-center gap-x-2 rounded-lg p-2 bg-white text-black'>
              <span className='whitespace-nowrap'>{t(btnText)}</span>
              <RightArrow stroke='#02C9C0' className='rtl:rotate-180' />
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {/* aboutus getstarted */}
      <div className='grid grid-cols-1 gap-y-10 md:grid-cols-2 gap-x-5 place-items-center'>
        <CardComponent
          title='partner_with_us'
          imageSrc={get_started}
          text='join_us_desc'
          btnText='get_started'
        />
        <CardComponent
          title='everything_you_crave_delivered'
          imageSrc={about_us}
          text='about_us_desc'
          btnText='about_us'
        />
      </div>
    </div>
  );
}

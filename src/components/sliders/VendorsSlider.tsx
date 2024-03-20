"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { User } from "@/types/queries";
import VendorWidget from "@/components/widgets/VendorWidget";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  vendors: User[];

  title: string;
};

export default function ({ vendors, title }: Props) {
  const { t } = useTranslation("trans");
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang, country } = params;
  const refSlider = useRef<Slider | null>(null);

  const settings: any = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const RenderArrows = () => {
    return (
      <div className='slider-arrow flex gap-x-2'>
        <button
          className='arrow-btn prev bg-[#EEE]'
          onClick={() => refSlider?.current?.slickPrev()}>
          <KeyboardArrowLeft className='' />
        </button>
        <button
          className='arrow-btn next bg-[#EEE]'
          onClick={() => refSlider?.current?.slickNext()}>
          <KeyboardArrowRight className='' />
        </button>
      </div>
    );
  };
  return (
    <div className='my-5'>
      <div className='flex justify-between mb-3'>
        <p className='slider-title'>{t(title)}</p>
        <div className='flex items-center gap-x-3 text-sm capitalize'>
          <Link href={appLinks.vendors(lang, country)}>{t("see_all")}</Link>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider
          {...settings}
          ref={(c) => (refSlider.current = c)}
          rtl={lang === "ar"}>
          {vendors &&
            vendors.map((itm, i) => <VendorWidget vendor={itm} key={i} />)}
        </Slider>
      </div>
    </div>
  );
}

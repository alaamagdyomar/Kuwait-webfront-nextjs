"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Flash3 from "@/appIcons/landing/picks_flash.svg";
import Flash2 from "@/appIcons/landing/orange_flash.svg";
import Flash1 from "@/appIcons/landing/yellow_flash.svg";
import { Product } from "@/src/types/queries";
import OfferWidget from "@/components/widgets/OfferWidget";
import { Locale, countriesList } from "@/src/types";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

type Props = {
  products: Product[];
};

export default function FlashOffers({ products }: Props) {
  const { t } = useTranslation("trans");
  const refSlider = useRef<Slider | null>(null);
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
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
    <div className='bg-picks-gray p-5 rounded-lg my-10'>
      <div className='flex gap-x-2 justify-between'>
        <div className='flex gap-x-1 items-center'>
          <Flash1 className='w-8 h-8' />
          <p className='text-lg font-semibold capitalize'>
            {t("️flash_offers")}
          </p>
        </div>
        <RenderArrows />
      </div>

      <div className='my-5'>
        <Slider {...settings} ref={(c) => (refSlider.current = c)}>
          {products &&
            products.map((itm, i) => <OfferWidget product={itm} key={i} />)}
        </Slider>
      </div>

      <div className='flex justify-between'>
        <Flash3 className='w-10 h-10' />
        <Flash2 className='w-10 h-10' />
      </div>
    </div>
  );
}

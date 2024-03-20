"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { Locale, countriesList } from "@/src/types";
import { Product } from "@/types/queries";
import ProductWidget from "@/components/widgets/ProductWidget";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { appLinks } from "@/src/links";

type Props = {
  products: Product[];

  title: string;
};

export default function ({ products, title }: Props) {
  const { t } = useTranslation("trans");
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang, country } = params;
  const refSlider = useRef<Slider | null>(null);

  const settings: any = {
    dots: false,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    arrows: false,
    rtl: lang === "ar",
    responsive: [
      {
        breakpoint: 5000,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 4,
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
          <KeyboardArrowLeft />
        </button>
        <button
          className='arrow-btn next bg-[#EEE]'
          onClick={() => refSlider?.current?.slickNext()}>
          <KeyboardArrowRight />
        </button>
      </div>
    );
  };
  return (
    <div className='my-5'>
      <div className='flex justify-between mb-3'>
        <p className='capitalize'>{title}</p>
        <div className='flex items-center gap-x-3'>
          <Link
            href={appLinks.offers(lang, country, "")}
            className='capitalize'>
            {t("see_all")}
          </Link>
          <RenderArrows />
        </div>
      </div>
      <div>
        <Slider {...settings} ref={(c) => (refSlider.current = c)}>
          {products &&
            products.map((itm: Product, i: number) => (
              <ProductWidget product={itm} key={i} />
            ))}
        </Slider>
      </div>
    </div>
  );
}

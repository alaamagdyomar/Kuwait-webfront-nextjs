"use client";
import React from "react";
import { Slide } from "@/types/queries";
import { isEmpty, isNull } from "lodash";
import Slider from "react-slick";
import Image from "next/image";
import { Locale, countriesList } from "@/src/types";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { useParams } from "next/navigation";

type Props = {
  slides: Slide[];
};

export default function AdsSlider({ slides }: Props) {
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const settings: any = {
    dots: false,
    speed: 500,
    infinite: false,
    slidesToScroll: 1,
    arrows: true,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className='py-4'>
      {!isEmpty(slides) && (
        <Slider {...settings}>
          {slides.map((s: Slide, i: number) => (
            <Link
              key={i}
              href={
                s.screen_type === "home" && !isNull(s.vendor_id)
                  ? appLinks.vendor(
                      lang,
                      params?.country,
                      s.vendor_id.toString()
                    )
                  : !isNull(s.category_id)
                  ? appLinks.offers(
                      lang,
                      params?.country,
                      `category_id=${s.category_id?.toString()}`
                    )
                  : `/${lang}/${params?.country}`
              }>
              <Image
                alt={"slider"}
                src={s.image}
                width={1000}
                height={1000}
                className='w-full  h-auto aspect-[2/1] object-fill object-bottom'
              />
            </Link>
          ))}
        </Slider>
      )}
    </div>
  );
}

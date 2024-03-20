"use client";
import React from "react";
import Slider from "react-slick";
import CategoryWidget from "@/components/widgets/CategoryWidget";
import { Category } from "@/types/queries";
import { Locale, countriesList } from "@/types/index";
import { categoriesSliderSettings } from "@/src/constants";
import { useParams } from "next/navigation";

type Props = {
  categories: Category[];
};

export default function CategoriesSlider({ categories }: Props) {
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  return (
    <div className='py-3 relative mt-14 page-padding bg-picks-gray border-b border-picks-border'>
      <Slider {...categoriesSliderSettings}>
        {categories &&
          categories.map((itm: Category, i) => (
            <CategoryWidget category={itm} key={i} />
          ))}
      </Slider>
    </div>
  );
}

"use client";
import { Category, Product, Slide, User } from "@/src/types/queries";
import React from "react";
import { setOrderType } from "@/app/actions";
import { changeOrderType } from "@/src/redux/slices/productSlice";
import { useAppDispatch } from "@/src/redux/hooks";
import { Locale, countriesList } from "@/src/types";
import CategoriesSlider from "@/components/sliders/CategoriesSlider";
import AdsSlider from "@/components/sliders/AdsSlider";
import FlashOffers from "./FlashOffers";
import VendorsSlider from "@/components/sliders/VendorsSlider";
import { useParams } from "next/navigation";

type Props = {
  categories: Category[];
  slides: Slide[];
  products: Product[];
  vendors: User[];
  lang: Locale["lang"];
  country: countriesList;
  featuredVendors: User[];
};
export default function ({
  categories,
  slides,
  vendors,
  products,
  featuredVendors,
}: Props) {
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  return (
    <div className=''>
      <CategoriesSlider categories={categories} />
      {/* filters and   items*/}
      <div className='page-padding'>
        {/* filters */}
        <div></div>
        {/* slider  */}
        <div className='my-10'>
          <AdsSlider slides={slides} />
        </div>
        {/* new to picks */}
        <VendorsSlider vendors={vendors} title='new_picks' />
        {/* flash offers */}
        <FlashOffers products={products} />

        {/* new to picks */}
        <VendorsSlider vendors={featuredVendors} title='featured_stores' />
      </div>
    </div>
  );
}

"use client";
import Flash from "@/appIcons/landing/flash.svg";
import { Product } from "@/src/types/queries";
import Image from "next/image";
import React from "react";
import FavouriteWidget from "@/components/widgets/FavouriteWidget";
import { Locale, countriesList } from "@/src/types";
import Link from "next/link";
import { appLinks } from "@/src/links";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/redux/hooks";
import { showProductModal } from "@/src/redux/slices/productSlice";

type Props = {
  product: Product;
};

export default function ({ product }: Props) {
  const router = useRouter();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;
  const dispatch = useAppDispatch();

  const handleClick = () =>
    router.push(
      appLinks.offer(lang, params?.country, product.id.toString(), product.name)
    );
  return (
    <div>
      <div className='relative rtl:text-right ltr:text-left'>
        <Image
          alt={product.name || ""}
          src={product.image}
          width={1000}
          height={1000}
          className='w-full h-auto aspect-[2/1] object-cover rounded-lg'
        />
        <div className='w-full h-auto aspect-[2/1] absolute bg-black bg-opacity-20 top-0 bottom-0 left-0 right-0 rounded-lg py-3 px-2'>
          <div className='flex flex-col justify-between items-end h-[80%]'>
            <div className='flex justify-between items-center w-full'>
              <div>
                <div>
                  {/* timer */}
                  {/* <p>{product.}</p> */}
                </div>
                <div>
                  <p className='rounded-full bg-[#FF8A59] text-xs text-white px-2 py-px pt-1'>
                    {product.percentage}
                  </p>
                </div>
              </div>
              <FavouriteWidget
                isFav={product.favorite}
                id={product.id}
                type='offer'
              />
            </div>

            {/* offer type */}
            <button
              // href={appLinks.offer(
              //   lang,
              //   params?.country,
              //   product.id.toString(),
              //   product.name
              // )}
              onClick={() => dispatch(showProductModal(product.id))}
              className='flex items-center gap-x-1 rounded-full bg-[#232323] text-xs text-white px-2 py-px pt-1 w-fit'>
              <Flash />
              <p>Flash Offer</p>
            </button>
          </div>
        </div>
        <button
          onClick={() => dispatch(showProductModal(product.id))}
          className='bg-white -mt-[10%] rounded-lg p-3 relative w-full'>
          <p className='card-title'>{product.name}</p>
          <p className='card-desc'>{product.description}</p>
          {/* price */}
          <div>
            <p>{product.price_format}</p>
          </div>
        </button>
      </div>
    </div>
  );
}

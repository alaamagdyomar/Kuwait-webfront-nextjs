"use client";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { Category } from "@/src/types/queries";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {
  category: Category;
};

export default function ({ category }: Props) {
  const searchParams = useSearchParams();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const { lang } = params;

  return (
    <Link
      href={appLinks.offers(
        lang,
        params?.country,
        `category_id=${category.id}`
      )}
      className='px-5'>
      <div
        className={`flex items-center gap-x-2 bg-white rounded-full py-2 px-3 w-fit ${
          searchParams?.get("category_id") == category.id &&
          "ring-1 ring-picks-dark"
        }`}>
        <Image
          alt={category.name}
          src={category.image ?? `https://placehold.co/100x100`}
          width={1000}
          height={1000}
          className='w-5 h-5'
        />
        <p className='text-black'>{category.name}</p>
      </div>
    </Link>
  );
}

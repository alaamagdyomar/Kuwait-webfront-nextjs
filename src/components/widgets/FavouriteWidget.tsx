"use client";
import Favourite from "@/appIcons/landing/favourite.svg";
import NotFavourite from "@/appIcons/landing/not_favourite.svg";
import { useLazyAddToWishListQuery } from "@/src/redux/api";
import React, { useState } from "react";

type Props = {
  isFav: boolean;
  type: "offer" | "vendor";
  id: number | string;
};

export default function ({ isFav, id, type }: Props) {
  const [isFavourite, setIsFavourite] = useState<boolean>(isFav);
  const [triggerAddToWishList] = useLazyAddToWishListQuery();

  const handleFavourite = async () => {
    const currentFav = !isFavourite;
    await triggerAddToWishList({
      action: currentFav ? "active" : "inactive",
      type,
      item_id: id,
    });
    setIsFavourite(currentFav);
  };

  return (
    <button
      key={id}
      onClick={() => handleFavourite()}
      className='absolute ltr:right-0 rtl:left-0 z-40 px-2'>
      {isFavourite ? (
        <Favourite className='h-7 w-7' />
      ) : (
        <NotFavourite className='h-7 w-7' />
      )}
    </button>
  );
}

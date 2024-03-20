import test from "@/appImages/test.webp";
import Image from "next/image";
import React from "react";
import QuantityMeter from "../QuantityMeter";
import { CartProduct, Product } from "@/src/types/queries";

type Props = {
  product: CartProduct;
};

export default function ProductCart({ product }: Props) {
  return (
    <div className="py-5">
      <div className="flex justify-between gap-x-5 overflow-hidden">
        <div className="max-w-[70%]">
          <p className="text-semibold truncate">{product.offer.name}</p>
          <p className="text-picks-text-gray text-xs">
            {product.choices.map((itm) => itm.name).join(" , ")}
          </p>
          {product.quantity > product.offer.stock ? (
            <p className="text-xs text-picks-red">out of Stock!</p>
          ) : null}
          {product.notes ? (
            <p className="text-picks-text-gray text-xs truncate">
              {product.notes}
            </p>
          ) : null}
        </div>
        <Image
          className="w-[70px] h-[70px] aspect-[auto 70 / 70]"
          src={product.image}
          alt={product.offer.name}
          width={100}
          height={100}
        />
      </div>

      <div className="flex justify-between items-center pt-5">
        <QuantityMeter
          id={product.id}
          product={{ quantity: product.quantity }}
          disabled={product.quantity > product.offer.stock}
        />
        <p>{product.price}</p>
      </div>
    </div>
  );
}

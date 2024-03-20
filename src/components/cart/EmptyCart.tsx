import Image from "next/image";
import React from "react";
import Empty from "@/appImages/cart/empty_cart.png";

type Props = {};

export default function EmptyCart({}: Props) {
  return (
    <div className="flex flex-col justify-center items-center gap-y-5 px-10  text-center h-full">
      <Image
        width={100}
        height={100}
        src={Empty}
        alt="empty cart"
        className="w-52 h-auto"
      />
      <div>
        <p>Oh No , Your Cart Is Empty</p>
        <p className="text-sm text-picks-text-gray mt-1">
          Start Shopping now !
        </p>
      </div>
      <button
        // onClick={() => handleSetArea(a)}
        className={`bg-picks-dark text-white 
         rounded-md px-2 py-2 text-sm w-full`}
      >
        View Categories
      </button>
    </div>
  );
}

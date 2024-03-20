import React from "react";
import Delete from "@/appIcons/cart/delete.svg";
import {
  useDeleteCartProductMutation,
  useUpdateCartProductMutation,
} from "../redux/api/cartApi";
import { isAuthenticated } from "../redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useRouter } from "next/navigation";
import { toNumber } from "lodash";
import { setSessionId } from "../redux/slices/productSlice";

type Props = {
  id: number | string;
  product: { quantity: number };
  disabled?: boolean;
  cart_legnth?: number;
};

export default function quantityMeter({
  product,
  disabled,
  id,
  cart_legnth,
}: Props) {
  const {
    appSetting: { showCartMenu },
    product: { session_id },
    auth: { user },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAppSelector(isAuthenticated);
  const [triggerUpdateCartProduct] = useUpdateCartProductMutation();
  const [triggerDeleteCartProduct] = useDeleteCartProductMutation();

  const handleIncDecRmvrement = async ({ type }: { type: "inc" | "dec" }) => {
    // remove
    if (type === "dec" && toNumber(product.quantity) === 1) {
      await triggerDeleteCartProduct({
        ...(isAuth ? { user_id: user?.id } : { session_id: session_id }),
        cart_item_id: id,
      }).then((r) => {
        // cause if session id still exist
        // when i fetch cart it res with session id is not valid
        // also check if num of items is one item
        // remove session id if item is removed
        // dispatch(setSessionId(null));
        console.log({ r });
      });
    }
    // inc dec
    else {
      await triggerUpdateCartProduct({
        ...(isAuth ? { user_id: user?.id } : { session_id: session_id }),
        cart_item_id: id,
        quantity:
          type === "inc"
            ? toNumber(product.quantity) + 1
            : toNumber(product.quantity) - 1,
        type: type === "inc" ? "increment" : "decrement",
      }).then((r) => {
        console.log({ r });
      });
    }
  };
  return (
    <div
      className={`flex flex-row gap-x-2 rounded-full bg-[#F7F7F7] p-1 text-picks-dark`}
    >
      <button
        disabled={disabled}
        onClick={() => handleIncDecRmvrement({ type: "inc" })}
        // disabled={product.quantity === data.data.stock}
        className={`${
          product.quantity === 0 && `opacity-60`
        } bg-white flex justify-center items-center w-6 h-6 rounded-full`}
      >
        +
      </button>

      <div className="flex justify-center items-center text-black w-6 h-6 rounded-full">
        {product.quantity}
      </div>

      <button
        disabled={product.quantity === 0}
        onClick={() => handleIncDecRmvrement({ type: "dec" })}
        className={`${
          product.quantity === 0 && `opacity-60`
        } bg-white  flex justify-center items-center w-6 h-6 rounded-full`}
      >
        {product.quantity === 1 ? <Delete /> : "-"}
      </button>
    </div>
  );
}

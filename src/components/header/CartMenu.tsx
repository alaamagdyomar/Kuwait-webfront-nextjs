"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Locale, countriesList } from "@/types/index";
import { useRouter } from "next/navigation";
import { toggleCartMenu } from "@/src/redux/slices/settingSlice";
import ProductCart from "../cart/ProductCart";
import PaymentSummary from "../PaymentSummary";
import CheckoutBtn from "../CheckoutBtn";
import { useTranslation } from "react-i18next";
import { useGetCartProductsQuery } from "@/src/redux/api/cartApi";
import { isAuthenticated } from "@/src/redux/slices/authSlice";
import EmptyCart from "../cart/EmptyCart";
import Warning from "@/appIcons/cart/warning.svg";

export default function () {
  const { t } = useTranslation("trans");
  const {
    appSetting: { showCartMenu },
    product: { session_id },
    auth: { user },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const isAuth = useAppSelector(isAuthenticated);
  const { data, isLoading } = useGetCartProductsQuery(
    {
      ...(isAuth ? { user_id: user?.id } : { session_id: session_id }),
    },
    { refetchOnMountOrArgChange: true }
  );

  return (
    // showCartMenu
    <Transition.Root show={showCartMenu} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(toggleCartMenu(false))}>
        <div className='fixed inset-0' />
        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 ltr:right-0 rtl:left-0 flex max-w-full ltr:pl-10 rtl:pr-10'>
              <Transition.Child
                as={Fragment}
                enter='transition-opacity ease-linear duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity ease-linear duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col bg-white py-6 shadow-xl relative'>
                    <div className='overflow-y-scroll scrollbar-hide h-full px-6 sm:px-10'>
                      {/* close btn */}
                      <div className='flex items-start justify-between'>
                        <div className='flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none'
                            onClick={() => dispatch(toggleCartMenu(false))}>
                            <span className='absolute -inset-2.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>

                      {/* out of stock items */}
                      <div className='flex items-center gap-x-3 bg-picks-orange bg-opacity-20 text-picks-orange px-6 sm:px-10 py-3 text-sm -mx-6 sm:-mx-10 mt-5'>
                        <Warning className='w-8 h-8' />
                        <p>
                          Check the store before ordering; this request might
                          already be fulfilled.
                        </p>
                      </div>
                      {/* items */}
                      {data && data.data ? (
                        <>
                          <div className='relative mt-6 flex-1'>
                            {/* vendor info */}
                            <div>
                              <p className='text-xs'>Your cart from</p>
                              {/* should go to vendor details */}
                              <Link className='text-lg' href={"/"}>
                                {data.data.vendor?.name}
                              </Link>

                              <div className='flex justify-between items-center border-b text-picks-text-gray text-sm py-2'>
                                <p>{data.data.items?.length} item/s</p>
                                <p>
                                  Subtotal : <span>{data.data.subtotal}</span>
                                </p>
                              </div>
                            </div>
                            {/*products */}
                            <div className='border-b'>
                              {data.data.items?.map((item) => (
                                <ProductCart key={item.id} product={item} />
                              ))}
                            </div>

                            {/* payment summary */}
                            <div>
                              <PaymentSummary
                                summary={{
                                  subtotal: data.data.subtotal,
                                  tax: data.data.tax,
                                  total: data.data.total,
                                  delivery_fee: data.data.delivery_fee,
                                }}
                              />
                              <div className='h-52 w-full'></div>
                            </div>
                          </div>

                          <div className='absolute bottom-0 right-0 left-0'>
                            <CheckoutBtn
                              total={data.data.total}
                              // disabled={
                              //   data.data.quantity > product.offer.stock
                              // }
                            />
                          </div>
                        </>
                      ) : (
                        <EmptyCart />
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

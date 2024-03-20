"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  decreaseQty,
  hideProductModal,
  increaseQty,
  resetProductModal,
  setProduct,
  setProductOriginalGroups,
  setSessionId,
} from "@/src/redux/slices/productSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
  showWarningToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { useParams, usePathname, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Product } from "@/src/types/queries";
import Slider from "react-slick";
import { HeartIcon, ShareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  useGetProductQuery,
  useLazyAddToCartQuery,
} from "@/src/redux/api/productApi";
import Image from "next/image";
import {
  map,
  capitalize,
  isEmpty,
  isArray,
  first,
  values,
  isObject,
  isNull,
} from "lodash";
import CheckBoxInput from "@/components/modals/product/CheckBoxInput";
import RadioInput from "@/components/modals/product/RadioInput";
import MeterInput from "@/components/modals/product/MeterInput";
import { addToCartSchema } from "@/src/validations";
import { RWebShare } from "react-web-share";
import { appLinks } from "@/src/links";
import { Locale, countriesList } from "@/src/types";
import { useTranslation } from "react-i18next";
import { useLazyAddToWishListQuery } from "@/src/redux/api";
import { isAuthenticated } from "@/src/redux/slices/authSlice";

export default function () {
  const { t } = useTranslation("trans");
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const pathName = usePathname()!;
  const { lang } = params;
  const {
    product: {
      id: offer_id,
      vendor_id,
      selections,
      quantity,
      enabled,
      total,
      currency,
      confirm,
    },
    auth: { user },
  } = useAppSelector((state) => state);
  const isAuth = useAppSelector(isAuthenticated);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data, isSuccess, isFetching, error, refetch } = useGetProductQuery<{
    data: AppQueryResult<Product>;
    isSuccess: boolean;
    isFetching: boolean;
    error: any;
    refetch: () => void;
  }>(offer_id, { refetchOnMountOrArgChange: true });
  const [triggerAddToCart] = useLazyAddToCartQuery();
  const [triggerAddToWishList] = useLazyAddToWishListQuery();
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValue,
    getValues,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(addToCartSchema(data?.data?.groups, t)),
    defaultValues: useMemo(() => {
      return {
        offer_id,
        user_id: !isNull(user) && user.id ? user.id : null,
        quantity,
        vendor_id,
        groups: null,
        confirm,
        // notes: "hello",
      };
    }, [data?.data?.id]),
  });

  const settings: any = {
    dots: true,
    speed: 500,
    infinite: true,
    slidesToScroll: 1,
    arrows: true,
  };

  const onSubmit: SubmitHandler<any> = async (body) => {
    if (isEmpty(errors)) {
      await triggerAddToCart({ body }).then((r: any) => {
        if (r.data && r.data.data && r.data?.data?.session_id) {
          dispatch(setSessionId(r.data?.data?.session_id));
          dispatch(
            showSuccessToastMessage({
              content: t("added_to_cart_successfully"),
            })
          );
          dispatch(resetProductModal());
        } else {
          dispatch(showErrorToastMessage({ content: r.data.data.message }));
        }
      });
    }
  };

  useEffect(() => {
    if (!isEmpty(selections) && getValues("offer_id")) {
      setValue("groups", selections);
    }
  }, [selections]);

  useEffect(() => {
    if (isSuccess && data?.data && enabled) {
      dispatch(setProduct(data?.data));
      reset({
        offer_id: data?.data?.id,
        user_id: !isNull(user) && user.id ? user.id : null,
        quantity,
        vendor_id: data?.data?.vendor?.id,
        groups: null,
        confirm,
      });
      if (data?.data?.groups) {
        dispatch(setProductOriginalGroups(data?.data?.groups));
      }
    }
  }, [data?.data?.id, enabled]);

  const groupElement = (g: any) => {
    switch (g.input_type) {
      case "radio":
        return <RadioInput group={g} />;
      case "checkbox":
        return <CheckBoxInput group={g} />;
      case "meter":
        return <MeterInput group={g} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isEmpty(errors)) {
      if (errors && errors.groups && isArray(errors.groups)) {
        const content: any = isObject(errors.groups[0])
          ? first(values(errors.groups[0]))
          : error.groups[0];
        dispatch(showErrorToastMessage({ content: content?.message }));
      } else {
        const content: any = first(values(errors));
        dispatch(showErrorToastMessage({ content: content.message }));
      }
    }
  }, [errors]);

  useEffect(() => setValue("quantity", quantity), [quantity]);

  const handleAddToWishList = async (body: {
    action: "active" | "inactive";
    type: "offer" | "vendor";
    item_id: string;
  }) => {
    await triggerAddToWishList(body).then((r: any) => {
      if (isAuth) {
        if (r.data?.success) {
          // trigggerGetProduct(offer_id, false);
          refetch();
          dispatch(showSuccessToastMessage({ content: t("process_success") }));
        }
      } else {
        dispatch(showWarningToastMessage({ content: t("unauthenticated") }));
      }
    });
  };

  return (
    <Transition appear show={enabled} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(hideProductModal())}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>
        <div className='fixed inset-0 w-screen '>
          <div className='flex h-full items-center justify-center pt-12 md:p-12 '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full h-full  md:h-3/4 md:max-w-[80%] lg:max-w-[60%] xxl:max-w-[40%] transform rounded-t-2xl md:rounded-2xl bg-white  py-6  text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='div'
                  className='flex flex-row w-full justify-between items-center  text-lg font-medium leading-6 text-gray-900 capitalize  pb-4 px-4'>
                  <div className='flex  ltr:left-4 rtl:right-4  '>
                    <XMarkIcon
                      className='w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => dispatch(hideProductModal())}
                    />
                  </div>
                  <div
                    className={`flex  flex-row justify-between items-center w-auto gap-x-4  ltr:right-4 ltr:left-4`}>
                    <div>
                      <HeartIcon
                        onClick={() =>
                          handleAddToWishList({
                            action: data?.data?.favorite
                              ? "inactive"
                              : "active",
                            type: "offer",
                            item_id: data.data.id.toString(),
                          })
                        }
                        className={`w-6 h-6  ${
                          data?.data?.favorite
                            ? `text-red-600 fill-red-600 hover:fill-white hover:text-black`
                            : `text-black  hover:text-red-600 hover:fill-red-600`
                        }`}
                      />
                    </div>
                    <div>
                      <RWebShare
                        data={{
                          text: data?.data?.name,
                          url: `https://${
                            window?.location?.hostname
                          }${appLinks.offer(
                            lang,
                            params?.country,
                            data?.data?.vendor?.id?.toString(),
                            data?.data?.name
                          )}`,
                          title: capitalize(`${t("picks")}`),
                        }}>
                        <ShareIcon className='w-6 h-6 text-black' />
                      </RWebShare>
                    </div>
                  </div>
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='relative sm:mx-auto overflow-x-auto w-full h-full bg-white  rounded-2xl'>
                  <LoadingSpinner isLoading={isFetching && !isSuccess} />
                  {data?.data.id === offer_id && (
                    <div>
                      <div className=' overflow-y-auto h-full md:h-[60%] px-4  pb-[20%] md:pb-[10%]'>
                        <div className='justify-center items-center '>
                          <Slider {...settings}>
                            {data.data.images &&
                              map(data.data.images, (img, i) => (
                                <Image
                                  key={i}
                                  src={img}
                                  width={500}
                                  height={400}
                                  alt={data.data.name}
                                  className='w-full h-auto aspect-[5/3]'
                                />
                              ))}
                          </Slider>
                        </div>

                        <div className='pt-4'>
                          <div className='flex flex-col gap-y-2'>
                            <h1 className='text-2xl ltr:text-left rtl:text-right'>
                              {data.data.name} - {data.data.id}
                            </h1>
                            <p className='text-md text-gray-400 ltr:text-left rtl:text-right'>
                              {data.data.description}
                            </p>
                            <div className='flex flex-row justify-start items-center gap-x-4'>
                              <div className='bg-picks-dark text-white rounded-full px-4 py-2'>
                                {data.data.new_price_format}
                              </div>
                              <div className='line-through text-gray-400'>
                                {data.data.price_format}
                              </div>
                              <div className='text-orange-600 capitalize'>
                                {data.data.percentage}
                                <span className=''>{t("off")}</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col   divide-y divide-gray-200 py-2 '>
                            {data.data.groups &&
                              map(data.data.groups, (g: any, i) => (
                                <div key={i}>{groupElement(g)}</div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* footer */}
                  {data?.data?.id === offer_id && (
                    <div
                      className={`fixed bottom-0 md:-bottom-10 w-full flex flex-row justify-between items-center   rounded-b-2xl p-4 border-t border-gray-200 bg-white`}>
                      <div className={`flex flex-row gap-x-1`}>
                        <button
                          type='button'
                          disabled={quantity === 0}
                          onClick={() => dispatch(decreaseQty())}
                          className={`${
                            quantity === 0 && `opacity-60`
                          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full`}>
                          -
                        </button>
                        <div className='flex justify-center items-center text-black w-6 h-6 rounded-full'>
                          {quantity}
                        </div>
                        <button
                          type='button'
                          onClick={() => dispatch(increaseQty())}
                          disabled={quantity === data.data.stock}
                          className={`${
                            quantity === data.data.stock && `opacity-60`
                          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full`}>
                          +
                        </button>
                      </div>
                      <button
                        className='btn btn-default w-auto max-w-md flex justify-between items-center gap-x-4 px-2'
                        type={"submit"}>
                        <div>{t("add_to_cart")}</div>
                        {total > 0 && (
                          <div>
                            {total} <span className='text-xs'>{currency}</span>
                          </div>
                        )}
                      </button>
                    </div>
                  )}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
  toggleLoginModal,
  toggleRegisterModal,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, registerSchema } from "@/src/validations";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import { setAuth } from "@/app/actions";
import { useRouter } from "next/navigation";
import { useLazyRegisterQuery } from "@/src/redux/api/authApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { AppQueryResult, Country } from "@/src/types/queries";
import {
  useGetCountriesQuery,
  useLazyGetCountriesQuery,
} from "@/src/redux/api/countryApi";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { appLinks } from "@/src/links";
import Link from "next/link";
import { randomFillSync } from "crypto";
import { random } from "lodash";
import { setAuthentication } from "@/src/redux/slices/authSlice";
import { useTranslation } from "react-i18next";

type Inputs = {
  phone: string;
  phone_country_code: string;
  email: string;
  password: string;
  password_confirmation: string;
  device_token: string;
  session_id?: string;
};

export default function (): React.ReactNode {
  const { t } = useTranslation("trans");
  const {
    appSetting: { showRegisterModal, isLoading },
    product: { session_id },
    locale: { lang },
    country: { code },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [triggerRegister] = useLazyRegisterQuery();
  const { data: countries, isSuccess: countriesSuccess } =
    useGetCountriesQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  }: any = useForm<any>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      phone_country_code: code,
      phone: ``,
      email: ``,
      password: ``,
      password_confirmation: ``,
      session_id: session_id,
      device_token: random(9999, 999999),
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    // console.log({ body });
    dispatch(enableLoading());
    await triggerRegister(body, false).then((r: any) => {
      // console.log("register", r);
      if (r && r.error?.data) {
        dispatch(
          showErrorToastMessage({
            content: `${r.error.data.message}`,
          })
        );
      } else {
        // setAuth(JSON.stringify(r.data.data));
        dispatch(
          setAuthentication({
            user: { ...r.data.data, type: "register" },
            token: null,
          })
        );
        dispatch(showSuccessToastMessage({ content: t("process_success") }));
        // dispatch(toggleRegisterModal());
        dispatch(toggleVerficationModal());
        // toggle otp modal
        // return router.replace(`/${lang}`);
      }
      reset();
    });
  };

  return (
    <Transition appear show={showRegisterModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(toggleRegisterModal())}>
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
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white py-6 px-7 lg:px-0 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  <div className='capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4'>
                    {t("signup")}
                    <XMarkIcon
                      className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => dispatch(toggleRegisterModal())}
                    />
                  </div>
                </Dialog.Title>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm max-h-[70vh] overflow-y-auto scrollbar-hide'>
                  <LoadingSpinner isLoading={isLoading} />
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={`space-y-4 text-justify ${
                      isLoading && "hidden"
                    }`}>
                    <div>
                      <p className='font-semibold mb-2 text-lg'>
                        {t("welcome_to_picks")}
                      </p>
                      <p className='text-picks-text-gray text-sm'>
                        {t("enter_your_personal_information_to_continue")}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor='name'
                        className='ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize'>
                        {t("name")}
                      </label>
                      <div className='mt-2'>
                        <input
                          id='first_name'
                          {...register("name")}
                          type='text'
                          className='block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6'
                        />
                        {errors?.name?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {t(errors?.name?.message)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor='phone_country_code'
                        className='ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize'>
                        {t("phone_number")}
                      </label>
                      <div className='mt-2'>
                        <div className='flex flex-row gap-x-3'>
                          <select
                            id='phone_country_code'
                            defaultValue={code}
                            {...register("phone_country_code")}
                            autoComplete='country-name'
                            className='block w-1/3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:max-w-xs sm:text-sm sm:leading-6'>
                            {countriesSuccess &&
                              countries.data?.map((c: Country, i: number) => (
                                <option value={c.code} key={i}>
                                  {`${c.code} (${c.country_code})`}
                                </option>
                              ))}
                          </select>
                          <input
                            id='phone'
                            {...register("phone")}
                            // type="number"
                            name='phone'
                            className='block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6'
                          />
                        </div>
                        {errors?.phone?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {t(errors?.phone?.message)}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* email */}
                    <div>
                      <label
                        htmlFor='email'
                        className='ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize'>
                        {t("email")} ({t("optional")})
                      </label>
                      <div className='mt-2'>
                        <input
                          id='email'
                          {...register("email")}
                          type='text'
                          className='block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6'
                        />
                        {errors?.email?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {t(errors?.email?.message)}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* password */}
                    <div>
                      <label
                        htmlFor='password'
                        className='ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize'>
                        {t("password")}
                      </label>
                      <div className='mt-2'>
                        <input
                          id='password'
                          {...register("password")}
                          type='password'
                          className='block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6'
                        />
                        {errors?.password?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {t(errors?.password?.message)}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* password_confirmation */}
                    <div>
                      <label
                        htmlFor='password_confirmation'
                        className='ltr:text-left rtl:text-right block text-sm font-medium leading-6 text-gray-900 capitalize'>
                        {t("password_confirmation")}
                      </label>
                      <div className='mt-2'>
                        <input
                          id='password_confirmation'
                          {...register("password_confirmation")}
                          type='password'
                          className='block w-full rounded-md border-0 py-2.5 shadow-sm bg-stone-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-200 sm:text-sm sm:leading-6'
                        />
                        {errors?.password_confirmation?.message && (
                          <span className={`text-red-700 text-xs capitalize`}>
                            {t(errors?.password_confirmation?.message)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='text-sm leading-6'>
                        <p className='space-x-2 text-gray-600 text-center'>
                          <span>{t("by_tapping_sign_up")}</span>
                          <Link href={appLinks.terms(lang)}>
                            {t("terms_and_conditions")}
                          </Link>
                          <span>{t("and")}</span>
                          <Link href={appLinks.terms(lang)}>
                            {t("policies")}.
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        type='submit'
                        className='flex w-full justify-center btn-default capitalize'>
                        {t("sign_in")}
                      </button>
                    </div>
                  </form>

                  <div className='capitalize mt-10 text-center text-sm text-gray-500'>
                    {t("already_have_an_account")}
                    <button
                      onClick={() => dispatch(toggleLoginModal())}
                      className='capitalize px-2 font-semibold leading-6 text-picks-dark hover:text-gray-500'>
                      {t("login")}
                    </button>
                    {/* <button
                      onClick={() => dispatch(toggleVerficationModal())}
                      className="capitalize px-2 font-semibold leading-6 text-picks-dark hover:text-gray-500"
                    >
                      show verification
                    </button> */}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

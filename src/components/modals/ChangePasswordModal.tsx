"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleChangePasswordModal,
  toggleForgetPasswordModal,
  toggleLoginModal,
} from "@/src/redux/slices/settingSlice";

import { XMarkIcon } from "@heroicons/react/24/outline";
import ForgetPass from "@/appIcons/auth/forget_pass.svg";
import { useGetCountriesQuery } from "@/src/redux/api/countryApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pick, snakeCase, toLower } from "lodash";
import { ChangePasswordSchema, registerSchema } from "@/src/validations";
import { Country } from "@/src/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import {
  useLazyForgotPasswordQuery,
  useLazyResetPasswordQuery,
  useLazyVerifyQuery,
} from "@/src/redux/api/authApi";
import LoadingSpinner from "../LoadingSpinner";
import { setAuthentication } from "@/src/redux/slices/authSlice";
import { useTranslation } from "react-i18next";
type Inputs = {
  phone: string;
  phone_country_code: string;
  new_password: string;
  new_password_confirmation: string;
};
export default function () {
  const { t } = useTranslation("trans");
  const {
    appSetting: { showChangePasswordModal, isLoading },
    locale: { lang },
    country: { code },
    auth,
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const [triggerForgetPassword] = useLazyForgotPasswordQuery();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues: {
      new_password: "",
      new_password_confirmation: ``,
      phone: auth.user?.phone,
      phone_country_code: auth.user?.phone_country_code,
    },
  });

  // console.log(countries, countriesSuccess);

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    dispatch(enableLoading());
    await triggerForgetPassword({ ...body }, false).then((r: any) => {
      if (r.error && r.error?.data) {
        dispatch(
          showErrorToastMessage({
            content: t(`${snakeCase(r.error?.data?.message)}`),
          })
        );
        if (r.error.data.status === "301") {
          //   user not verified
          //    await triggerResendOtp({
          //      phone: body.phone,
          //      phone_country_code: body.phone_country_code,
          //      type: "register",
          //    }).then((r: any) => {
          //      // console.log({ r });
          //      if (r && r.error?.data) {
          //        dispatch(
          //          showErrorToastMessage({
          //            content: `${r.error?.data?.message}`,
          //          })
          //        );
          //      } else {
          //        dispatch(
          //          showSuccessToastMessage({
          //            content: `${r?.data?.message}`,
          //          })
          //        );
          //        dispatch(
          //          setAuthentication({
          //            user: {
          //              phone_country_code: body.phone_country_code,
          //              phone: body.phone,
          //              type: "register",
          //            },
          //            token: null,
          //          })
          //        );
          //        dispatch(toggleVerficationModal());
          //      }
          //    });
        }
      } else {
        dispatch(
          showSuccessToastMessage({
            content: t(`${snakeCase(r.data?.message)}`),
          })
        );
        dispatch(toggleLoginModal());
        reset();
      }
    });
  };

  //   console.log({ errors });

  const closeModal = () => {
    dispatch(toggleChangePasswordModal());
    reset();
  };
  return (
    <>
      <Transition appear show={showChangePasswordModal} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
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
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    <div className=' capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4 text-xl'>
                      {t("new_password")}
                      <XMarkIcon
                        className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer'
                        onClick={() => closeModal}
                      />
                    </div>
                  </Dialog.Title>
                  <LoadingSpinner isLoading={isLoading} />
                  <div
                    className={`flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 max-h-[70vh] overflow-y-auto scrollbar-hide ${
                      isLoading && "hidden"
                    }`}>
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm text-justify'>
                      <div className='mt-2'>
                        <p className='font-semibold text-xl'>
                          {t("new_password")}
                        </p>
                        <p className='text-picks-text-gray text-sm mt-1'>
                          {t(
                            "enter_the_mobile_number_of_your_account_to_send_a_password_change_OTP_messsage"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={`space-y-6 text-justify`}>
                        <div>
                          <label
                            htmlFor='new_password'
                            className='ltr:text-left rtl:text-right lable-default'>
                            {t("new_password")}
                          </label>
                          <div className='mt-2'>
                            <div className='flex flex-row gap-x-3 rtl:flex-row-reverse'>
                              <input
                                type='password'
                                id='new_password'
                                {...register("new_password")}
                                // type="number"
                                className='input-default'
                              />
                            </div>
                            {errors?.new_password?.message && (
                              <span className={`error`}>
                                {t(`${errors?.new_password?.message}`)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <label
                            htmlFor='new_password_confirmation'
                            className='ltr:text-left rtl:text-right lable-default'>
                            {t("new_password_comfirmation")}
                          </label>
                          <div className='mt-2'>
                            <div className='flex flex-row gap-x-3 rtl:flex-row-reverse'>
                              <input
                                type='password'
                                id='new_password_confirmation'
                                {...register("new_password_confirmation")}
                                // type="number"
                                name='new_password_confirmation'
                                className='input-default'
                              />
                            </div>
                            {errors?.new_password_confirmation?.message && (
                              <span className={`error`}>
                                {t(
                                  `${errors?.new_password_confirmation?.message}`
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className='mt-5'>
                          <button type='submit' className='btn-default w-full'>
                            {t("save")}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

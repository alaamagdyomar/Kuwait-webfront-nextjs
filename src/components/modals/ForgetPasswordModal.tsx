"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  enableLoading,
  toggleForgetPasswordModal,
  toggleVerficationModal,
} from "@/src/redux/slices/settingSlice";

import { XMarkIcon } from "@heroicons/react/24/outline";
import ForgetPass from "@/appIcons/auth/forget_pass.svg";
import { useGetCountriesQuery } from "@/src/redux/api/countryApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pick, snakeCase, toLower } from "lodash";
import { registerSchema } from "@/src/validations";
import { Country } from "@/src/types/queries";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import {
  useLazyResetPasswordQuery,
  useLazyVerifyQuery,
} from "@/src/redux/api/authApi";
import LoadingSpinner from "@/components/LoadingSpinner";
import { setAuthentication } from "@/src/redux/slices/authSlice";
import { useTranslation } from "react-i18next";
type Inputs = {
  phone: string;
  phone_country_code: string;
};
export default function () {
  const { t } = useTranslation("trans");
  const {
    appSetting: { showForgetPasswordModal, isLoading },
    country: { code },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const { data: countries, isSuccess: countriesSuccess } = useGetCountriesQuery(
    undefined,
    { refetchOnFocus: true, refetchOnMountOrArgChange: true }
  );
  const [triggerResetPassword] = useLazyResetPasswordQuery();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    resolver: yupResolver(registerSchema.pick(["phone", "phone_country_code"])),
    defaultValues: {
      phone_country_code: code,
      phone: ``,
    },
  });

  // console.log(countries, countriesSuccess);

  const onSubmit: SubmitHandler<Inputs> = async (body) => {
    // reset pass
    // send otp
    dispatch(enableLoading());
    await triggerResetPassword({ ...body }, false).then((r: any) => {
      if (r.error && r.error?.data) {
        dispatch(
          showErrorToastMessage({
            content: t(`${snakeCase(r.error?.data?.message)}`),
          })
        );
      } else {
        // set type and phone and country code to use it in verification
        dispatch(
          setAuthentication({ user: { ...body, type: "reset" }, token: null })
        );
        dispatch(
          showSuccessToastMessage({
            content: t(`${snakeCase(r.data?.message)}`),
          })
        );
        // dispatch(toggleForgetPasswordModal());
        dispatch(toggleVerficationModal(true));
        reset();
      }
      // console.log({ r });
    });
  };

  const closeModal = () => {
    dispatch(toggleForgetPasswordModal());
    reset();
  };
  return (
    <>
      <Transition appear show={showForgetPasswordModal} as={Fragment}>
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
                      {t("forget_password")}
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
                    <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                      <div className='flex justify-center mt-3'>
                        <ForgetPass width={100} height={100} />
                      </div>
                      <div className='text-center mt-2'>
                        <p className='font-semibold text-xl'>
                          {t("enter_account_phone_number")}
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
                            htmlFor='phone_country_code'
                            className='ltr:text-left rtl:text-right lable-default'>
                            {t("phone_number")}
                          </label>
                          <div className='mt-2'>
                            <div className='flex flex-row gap-x-3 rtl:flex-row-reverse'>
                              <select
                                id='phone_country_code'
                                defaultValue={code}
                                {...register("phone_country_code")}
                                autoComplete='country-name'
                                className='block w-1/3 rounded-md py-1.5 input-default text-sm'>
                                {countriesSuccess &&
                                  countries.data?.map(
                                    (c: Country, i: number) => (
                                      <option value={c.code} key={i}>
                                        {`${c.code} (${c.country_code})`}
                                      </option>
                                    )
                                  )}
                              </select>
                              <input
                                id='phone'
                                {...register("phone")}
                                // type="number"
                                name='phone'
                                className='input-default'
                              />
                            </div>
                            {errors?.phone?.message && (
                              <span className={`error`}>
                                {t(errors?.phone?.message)}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className='mt-5'>
                          <button type='submit' className='btn-default w-full'>
                            {t("send_otp")}
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

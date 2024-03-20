"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { contactusSchema } from "@/src/validations";
import { useLazySendContactusQuery } from "@/src/redux/api";
import { ContactusForm } from "@/src/types";
import { enableLoading } from "@/src/redux/slices/settingSlice";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/src/redux/slices/toastMessageSlice";
import LoadingSpinner from "@/components/LoadingSpinner";
import { get } from "lodash";
import InputError from "@/components/InputError";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

export default function () {
  const {
    appSetting: { isLoading },
  } = useAppSelector((state) => state);

  const { t } = useTranslation("trans");
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  }: any = useForm<any>({
    resolver: yupResolver(contactusSchema),
    defaultValues: {
      first_name: ``,
      last_name: ``,
      email: ``,
      phone: ``,
      message: ``,
    },
  });
  const dispatch = useAppDispatch();
  const [triggerSendContactus] = useLazySendContactusQuery();
  const onSubmit: SubmitHandler<ContactusForm> = async (body) => {
    console.log("body", body);
    dispatch(enableLoading());
    await triggerSendContactus(body).then((r: any) => {
      if (r && r.data && r.data.message) {
        dispatch(showSuccessToastMessage({ content: r.data.message }));
        reset();
      } else if (r && r.error && r.error.data) {
        dispatch(showErrorToastMessage({ content: r.error.data.message }));
      }
    });
  };
  return (
    <>
      <LoadingSpinner isLoading={isLoading} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`mt-16 max-w-4xl sm:mt-20 ${isLoading && "hidden"}`}>
        <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
          <div>
            <label
              htmlFor='first_name'
              className='block text-sm font-semibold leading-6 text-gray-900 capitalize'>
              {t("first_name")}
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                {...register("first_name")}
                id='first_name'
                autoComplete='first_name'
                className='input-default'
              />
            </div>
            <InputError
              message={get(errors, "first_name.message")}
              className='mt-2'
            />
          </div>
          <div>
            <label
              htmlFor='last_name'
              className='block text-sm font-semibold leading-6 text-gray-900 capitalize'>
              {t("last_name")}
            </label>
            <div className='mt-2.5'>
              <input
                type='text'
                {...register("last_name")}
                id='last-name'
                autoComplete='last-name'
                className={`input-default`}
              />
            </div>
            <InputError
              message={get(errors, "last_name.message")}
              className='mt-2'
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='email'
              className='block text-sm font-semibold leading-6 text-gray-900 capitalize'>
              {t("email")}
            </label>
            <div className='mt-2.5'>
              <input
                type='email'
                {...register("email")}
                id='email'
                autoComplete='email'
                className={`input-default`}
              />
            </div>
            <InputError
              message={get(errors, "email.message")}
              className='mt-2'
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='phone'
              className='block text-sm font-semibold leading-6 text-gray-900 capitalize'>
              {t("phone")}
            </label>
            <div className='relative mt-2.5'>
              <div className='absolute inset-y-0 left-0  items-center flex hidden'>
                <label htmlFor='country' className='sr-only'>
                  Country
                </label>
                <select
                  id='country'
                  name='country'
                  className='hidden h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm'>
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
                <ChevronDownIcon
                  className='pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400'
                  aria-hidden='true'
                />
              </div>
              <input
                type='number'
                {...register("phone")}
                id='phone'
                autoComplete='tel'
                className={`input-default`}
              />
            </div>
            <InputError
              message={get(errors, "phone.message")}
              className='mt-2'
            />
          </div>
          <div className='sm:col-span-2'>
            <label
              htmlFor='message'
              className='block text-sm font-semibold leading-6 text-gray-900 capitalize'>
              {t("message")}
            </label>
            <div className='mt-2.5'>
              <textarea
                {...register("message")}
                id='message'
                rows={4}
                className={`input-default`}
                defaultValue={""}
              />
            </div>
            <InputError
              message={get(errors, "message.message")}
              className='mt-2'
            />
          </div>
        </div>
        <div className='mt-10'>
          <button type='submit' className='btn-default w-1/4 '>
            {t("let_us_talk")}
          </button>
        </div>
      </form>
    </>
  );
}

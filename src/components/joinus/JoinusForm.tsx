"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { contactusSchema } from "@/src/validations";
import { useLazySendJoinusQuery } from "@/src/redux/api";
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
  const [triggerSendJoinus] = useLazySendJoinusQuery();
  const onSubmit: SubmitHandler<ContactusForm> = async (body) => {
    dispatch(enableLoading());
    await triggerSendJoinus(body).then((r: any) => {
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
        className={`max-w-md  ${isLoading && "hidden"}`}>
        <div className='grid grid-cols-1 gap-x-8 gap-y-4 bg-white rounded-xl p-6 border border-gray-100 shadow-sm'>
          <div className='col-span-full'>
            <div className=''>
              <input
                type='text'
                {...register("first_name")}
                id='first_name'
                autoComplete='first_name'
                className='input-default py-4 capitalize'
                placeholder={t("first_name")}
              />
            </div>
            <InputError
              message={get(errors, "first_name.message")}
              className='mt-2'
            />
          </div>
          <div className='col-span-full'>
            <div className=''>
              <input
                type='text'
                {...register("last_name")}
                id='last-name'
                autoComplete='last-name'
                className={`input-default capitalize py-4`}
                placeholder={t("last_name")}
              />
            </div>
            <InputError
              message={get(errors, "last_name.message")}
              className='mt-2'
            />
          </div>
          <div className='col-span-full'>
            <div className=''>
              <input
                type='email'
                {...register("email")}
                id='email'
                autoComplete='email'
                className={`input-default capitalize py-4`}
                placeholder={t("email")}
              />
            </div>
            <InputError
              message={get(errors, "email.message")}
              className='mt-2'
            />
          </div>
          {/* phone */}
          <div className='col-span-full'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0  items-center flex'>
                <label htmlFor='country' className='sr-only'>
                  Country
                </label>
                <select
                  id='country'
                  name='country'
                  className={
                    "h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-picks-dark sm:text-sm"
                  }>
                  <option>Kw (965)</option>
                  <option>EG (20)</option>
                  <option>UAE (966)</option>
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
                className={`input-default ps-32 capitalize py-4`}
                placeholder={t("phone")}
              />
            </div>
            <InputError
              message={get(errors, "phone.message")}
              className='mt-2'
            />
          </div>
          <div className='mt-2'>
            <button type='submit' className='btn-default w-full '>
              {t("let_us_talk")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

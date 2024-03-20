"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { EyeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useGetBranchesQuery } from "@/src/redux/api/vendorApi";
import { map } from "lodash";
import {
  hideBranchModal,
  setBranch,
  showBranchModal,
} from "@/src/redux/slices/branchSlice";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import { Branch } from "@/src/types/queries";
import Link from "next/link";
import { appLinks } from "@/src/links";

type Props = {
  vendor_id: string;
};
export default function ({ vendor_id }: Props): React.ReactNode {
  const { t } = useTranslation("trans");
  const {
    locale: { lang },
    country: { country_code },
    product: { orderType },
    branch: { modalEnabled },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams: any = useSearchParams()!;
  const [currentBranchId, setCurrentBranchId] = useState<number | string>(0);
  const { data, isSuccess } = useGetBranchesQuery(vendor_id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (currentBranchId == 0 && orderType === "pickup") {
      dispatch(showBranchModal());
    }
  }, [orderType]);

  useEffect(() => {
    if (searchParams.has("branch_id")) {
      setCurrentBranchId(searchParams.get("branch_id"));
    } else {
      setCurrentBranchId(0);
    }
  }, [searchParams.has("branch_id")]);

  return (
    <Transition appear show={modalEnabled} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        onClose={() => dispatch(hideBranchModal())}>
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
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white py-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'>
                  <div className=' capitalize flex flex-row justify-center items-center border-b border-gray-200 pb-4'>
                    {t("select_branch")}
                    <XMarkIcon
                      className='absolute ltr:left-4 rtl:right-4 w-6 h-6 text-gray-600 cursor-pointer'
                      onClick={() => dispatch(hideBranchModal())}
                    />
                  </div>
                </Dialog.Title>
                <div className='mt-4 w-full px-3'>
                  <LoadingSpinner isLoading={!isSuccess} />
                  {isSuccess &&
                    data?.data &&
                    map(data?.data, (b: Branch, i: number) => (
                      <div key={i} className='flex flex-col w-full gap-y-4'>
                        <button
                          onClick={() => setCurrentBranchId(b.id.toString())}
                          className='flex flex-row justify-between items-center  py-4 border-b border-gray-200 w-full'>
                          <div className='flex w-full justify-start items-center gap-x-4'>
                            <div>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='37'
                                height='37'
                                viewBox='0 0 37 37'
                                fill='none'>
                                <path
                                  d='M18.0312 36.5977C27.9724 36.5977 36.0312 28.5388 36.0312 18.5977C36.0312 8.65653 27.9724 0.597656 18.0312 0.597656C8.09012 0.597656 0.03125 8.65653 0.03125 18.5977C0.03125 28.5388 8.09012 36.5977 18.0312 36.5977Z'
                                  fill='#FF8A59'
                                />
                                <path
                                  d='M18.0328 9.84766C16.1782 9.8465 14.3966 10.5699 13.0678 11.8637C12.4184 12.4957 11.9016 13.2511 11.5479 14.0855C11.1942 14.9198 11.0105 15.8164 11.0078 16.7227C11.0078 22.6047 17.3938 27.0487 17.6658 27.2347C17.7739 27.3083 17.9016 27.3476 18.0323 27.3476C18.1631 27.3476 18.2908 27.3083 18.3988 27.2347C18.6708 27.0487 25.0568 22.6047 25.0568 16.7227C25.054 15.8164 24.8704 14.9198 24.5167 14.0855C24.1629 13.2511 23.6462 12.4958 22.9968 11.8637C21.6683 10.5702 19.887 9.84676 18.0328 9.84766ZM18.0328 14.2227C18.5367 14.2222 19.0297 14.3685 19.4518 14.6437C19.8699 14.9159 20.1975 15.3065 20.3928 15.7657C20.5858 16.2213 20.6364 16.7247 20.5378 17.2097C20.4379 17.6968 20.194 18.1427 19.8378 18.4897C19.478 18.8406 19.0233 19.0784 18.5298 19.1737C18.0344 19.2703 17.5217 19.2209 17.0538 19.0317C16.5895 18.8441 16.1908 18.5238 15.9078 18.1107C15.6747 17.7709 15.5308 17.3779 15.4896 16.9679C15.4484 16.5579 15.511 16.1441 15.6718 15.7647C15.801 15.4604 15.9893 15.1847 16.2258 14.9537C16.4642 14.7207 16.7458 14.5366 17.0548 14.4117C17.3655 14.2859 17.6976 14.2224 18.0328 14.2227Z'
                                  fill='white'
                                />
                              </svg>
                            </div>
                            <div>{b.name}</div>
                          </div>
                          <div>
                            {currentBranchId == b.id ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='none'>
                                <path
                                  d='M12.7812 1.08203C18.8564 1.08203 23.7812 6.0069 23.7812 12.082C23.7812 18.1572 18.8564 23.082 12.7812 23.082C6.70612 23.082 1.78125 18.1572 1.78125 12.082C1.78125 6.0069 6.70612 1.08203 12.7812 1.08203ZM12.7812 3.08203C7.81069 3.08203 3.78125 7.11147 3.78125 12.082C3.78125 17.0526 7.81069 21.082 12.7812 21.082C17.7518 21.082 21.7812 17.0526 21.7812 12.082C21.7812 7.11147 17.7518 3.08203 12.7812 3.08203ZM12.7812 5.08203C16.6472 5.08203 19.7812 8.21604 19.7812 12.082C19.7812 15.948 16.6472 19.082 12.7812 19.082C8.91526 19.082 5.78125 15.948 5.78125 12.082C5.78125 8.21604 8.91526 5.08203 12.7812 5.08203Z'
                                  fill='#02C9C0'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='25'
                                height='25'
                                viewBox='0 0 25 25'
                                fill='none'>
                                <path
                                  d='M12.7812 1.96875C18.8564 1.96875 23.7812 6.89362 23.7812 12.9688C23.7812 19.0439 18.8564 23.9688 12.7812 23.9688C6.70612 23.9688 1.78125 19.0439 1.78125 12.9688C1.78125 6.89362 6.70612 1.96875 12.7812 1.96875ZM12.7812 3.96875C7.81069 3.96875 3.78125 7.99819 3.78125 12.9688C3.78125 17.9393 7.81069 21.9688 12.7812 21.9688C17.7518 21.9688 21.7812 17.9393 21.7812 12.9688C21.7812 7.99819 17.7518 3.96875 12.7812 3.96875Z'
                                  fill='#98A1AE'
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                      </div>
                    ))}
                  <button
                    disabled={currentBranchId == 0}
                    onClick={() => {
                      router.replace(
                        appLinks.vendor(
                          lang,
                          country_code,
                          vendor_id,
                          searchParams.get("slug"),
                          currentBranchId.toString()
                        )
                      );
                      dispatch(hideBranchModal());
                    }}
                    className={` ${
                      currentBranchId == 0 && "opacity-60"
                    } btn-default w-full mt-4`}>
                    {t("start_order")}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

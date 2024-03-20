"use client";
import { setOrderType } from "@/app/actions";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { changeOrderType } from "@/src/redux/slices/productSlice";
import BranchListModal from "@/components/modals/vendor/BranchListModal";
import { showBranchModal } from "@/src/redux/slices/branchSlice";
import { useTranslation } from "react-i18next";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { appLinks } from "@/src/links";

export default function ({ vendor }: { vendor: any }) {
  const { t } = useTranslation("trans");
  const {
    product: { orderType },
  } = useAppSelector((state) => state);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params: any = useParams()!;
  const searchParams: any = useSearchParams()!;

  const handleOrderType = async (orderType: "pickup" | "delivery") => {
    console.log(
      "click",
      orderType === "pickup" && searchParams?.has("branch_id")
        ? searchParams.get("branch_id")
        : `000`
    );
    dispatch(changeOrderType(orderType));
    await setOrderType(orderType);
    router.replace(
      appLinks.vendor(
        params?.lang,
        params?.country,
        params?.id,
        searchParams.get("slug"),
        orderType === "pickup" && searchParams?.has("branch_id")
          ? searchParams.get("branch_id")
          : ``
      )
    );
  };

  return (
    <div className='col-span-full lg:col-span-1  '>
      <div className='hidden flex-row p-2 rounded-full bg-gray-100 w-full max-w-20 '>
        <button
          className={`w-1/2 px-6 py-4 text-black rounded-full capitalize ${
            orderType === "pickup" ? "bg-white" : "bg-gray-100"
          }`}
          onClick={() => handleOrderType("pickup")}>
          {t("pickup")}
        </button>
        <button
          className={`w-1/2 px-6 py-4 text-black rounded-full capitalize ${
            orderType === "delivery" ? "bg-white" : "bg-gray-100"
          }`}
          onClick={() => handleOrderType("delivery")}>
          {t("delivery")}
        </button>
      </div>
      <div className='mt-8'>
        {/* <BranchListModal vendor_id={vendor?.id} /> */}

        {vendor.branch_name && vendor.branch_area && (
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <button
              className='p-4 flex flex-row justify-start items-center gap-x-4 border border-gray-100 rounded-xl'
              onClick={() => dispatch(showBranchModal())}>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  viewBox='0 0 25 25'
                  fill='none'>
                  <path
                    d='M12.8828 12.9609C14.5397 12.9609 15.8828 11.6178 15.8828 9.96094C15.8828 8.30408 14.5397 6.96094 12.8828 6.96094C11.226 6.96094 9.88281 8.30408 9.88281 9.96094C9.88281 11.6178 11.226 12.9609 12.8828 12.9609Z'
                    stroke='#02C9C0'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                  <path
                    d='M12.8828 22.4609C14.8828 18.4609 20.8828 15.8792 20.8828 10.4609C20.8828 6.04266 17.3011 2.46094 12.8828 2.46094C8.46453 2.46094 4.88281 6.04266 4.88281 10.4609C4.88281 15.8792 10.8828 18.4609 12.8828 22.4609Z'
                    stroke='#02C9C0'
                    stroke-width='2'
                    stroke-linecap='round'
                    stroke-linejoin='round'
                  />
                </svg>
              </div>
              <div className='flex-col justify-start items-center ltr:text-left rtl:text-right'>
                <div className='capitalize '>{vendor.branch_name}</div>
                <div className='text-sm text-gray-400'>
                  {vendor.branch_area}
                </div>
              </div>
            </button>
            <div className='p-4 flex flex-row justify-start items-center gap-x-4 border border-gray-100 rounded-xl'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  viewBox='0 0 25 25'
                  fill='none'>
                  <path
                    d='M13.8828 7.46094C13.8828 6.90866 13.4351 6.46094 12.8828 6.46094C12.3305 6.46094 11.8828 6.90866 11.8828 7.46094V12.4609C11.8828 12.7261 11.9882 12.9805 12.1757 13.168L15.1757 16.168C15.5662 16.5585 16.1994 16.5585 16.5899 16.168C16.9804 15.7775 16.9804 15.1443 16.5899 14.7538L13.8828 12.0467V7.46094Z'
                    fill='#02C9C0'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M22.8828 12.4609C22.8828 17.9837 18.4056 22.4609 12.8828 22.4609C7.35996 22.4609 2.88281 17.9837 2.88281 12.4609C2.88281 6.93809 7.35996 2.46094 12.8828 2.46094C18.4056 2.46094 22.8828 6.93809 22.8828 12.4609ZM20.8828 12.4609C20.8828 16.8792 17.3011 20.4609 12.8828 20.4609C8.46453 20.4609 4.88281 16.8792 4.88281 12.4609C4.88281 8.04266 8.46453 4.46094 12.8828 4.46094C17.3011 4.46094 20.8828 8.04266 20.8828 12.4609Z'
                    fill='#02C9C0'
                  />
                </svg>
              </div>
              <div className='flex-col justify-center items-center'>
                <div className='capitalize'>{t("order_time")}</div>
                <div className='text-sm text-gray-400'>{vendor.order_time}</div>
              </div>
            </div>
            <div className='p-4 flex flex-row justify-start items-center gap-x-4 border border-gray-100 rounded-xl'>
              <div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='25'
                  height='25'
                  viewBox='0 0 25 25'
                  fill='none'>
                  <path
                    d='M13.8828 7.46094C13.8828 6.90866 13.4351 6.46094 12.8828 6.46094C12.3305 6.46094 11.8828 6.90866 11.8828 7.46094V12.4609C11.8828 12.7261 11.9882 12.9805 12.1757 13.168L15.1757 16.168C15.5662 16.5585 16.1994 16.5585 16.5899 16.168C16.9804 15.7775 16.9804 15.1443 16.5899 14.7538L13.8828 12.0467V7.46094Z'
                    fill='#02C9C0'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M22.8828 12.4609C22.8828 17.9837 18.4056 22.4609 12.8828 22.4609C7.35996 22.4609 2.88281 17.9837 2.88281 12.4609C2.88281 6.93809 7.35996 2.46094 12.8828 2.46094C18.4056 2.46094 22.8828 6.93809 22.8828 12.4609ZM20.8828 12.4609C20.8828 16.8792 17.3011 20.4609 12.8828 20.4609C8.46453 20.4609 4.88281 16.8792 4.88281 12.4609C4.88281 8.04266 8.46453 4.46094 12.8828 4.46094C17.3011 4.46094 20.8828 8.04266 20.8828 12.4609Z'
                    fill='#02C9C0'
                  />
                </svg>
              </div>
              <div className='flex-col justify-center items-center'>
                <div className='capitalize'>{t("delivery_fees")}</div>
                <div className='text-sm text-gray-400'>
                  {vendor.delivery_fees}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

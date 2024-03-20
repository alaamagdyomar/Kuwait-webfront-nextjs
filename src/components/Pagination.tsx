"use client";
import { has, isEmpty, isNull, map } from "lodash";
import Link from "next/link";
import { convertSearchParamsToString } from "@/utils/helpers";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type Props = {
  links: any;
};

export default function ({ links }: Props): React.ReactNode {
  const { t } = useTranslation("trans");
  const searchParams: any = useSearchParams();
  function getClassName(active: boolean) {
    if (active) {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-gray-200 focus:border-primary focus:text-primary bg-gray-600 text-white hover:text-gray-900 ";
    } else {
      return "mr-1 mb-1 px-4 py-3 text-sm leading-4 border rounded hover:bg-white hover:text-gray-900 focus:border-primary focus:text-primary";
    }
  }

  return (
    <div className='bg-white my-6 rounded-md flex justify-center items-center capitalize'>
      {!isEmpty(links) && links && (links.web_next || links.web_previous) && (
        <div className='flex flex-row justify-center items-center p-3 gap-x-6'>
          <Link
            aria-disabled={!links.web_previous}
            scroll={false}
            href={`?${links.web_previous}`}
            className='flex flex-row gap-x-2 btn-transparent md:w-28 justify-center items-center text-xs'>
            <div>
              <ChevronLeftIcon className='w-4 h-4 pt-1 rtl:rotate-180 ' />
            </div>
            <div>{t("previous")}</div>
          </Link>
          <Link
            scroll={false}
            aria-disabled={!links.web_next}
            className='flex flex-row gap-x-2 btn-transparent md:w-28 justify-center items-cente text-xs'
            href={`?${links.web_next}`}>
            <div>{t("next")}</div>
            <div>
              <ChevronRightIcon className='w-4 h-4 pt-1  rtl:rotate-180' />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

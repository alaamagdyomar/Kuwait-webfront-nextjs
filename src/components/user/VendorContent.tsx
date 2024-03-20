"use client";
import { Fragment, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from "@headlessui/react";
import { first, map } from "lodash";
import ProductWidget from "@/components/widgets/ProductWidget";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import OfferWidget from "@/components/widgets/OfferWidget";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ({ products }: { products: any }) {
  const { t } = useTranslation("trans");

  return (
    <div className='mx-auto'>
      {/* Product */}
      <div className='lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16'>
        <div className='mx-auto  w-full  col-span-full lg:mt-0 lg:max-w-none'>
          <Tab.Group as='div'>
            <div className='border-b border-gray-200 capitalize'>
              <div className='flex flex-row justify-between items-center'>
                <div className='line-clamp-1'>
                  <h1>{t("full_menu")}</h1>
                </div>
              </div>
              <Tab.List className='-mb-px flex gap-x-8'>
                {map(products, (c, i: number) => (
                  <Tab
                    key={i}
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? "border-picks-dark text-picks-dark"
                          : "border-transparent text-gray-700 hover:border-gray-300 hover:text-gray-800",
                        "whitespace-nowrap border-b-2 py-6 text-sm font-medium"
                      )
                    }>
                    {c.name}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels as={Fragment}>
              {map(products, (c: any, i: number) => (
                <Tab.Panel className='my-4' key={i}>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-4 lg:grid-cols-4 my-4'>
                    {map(c.offers, (p, k: number) => (
                      <div className={"col-span-1 me-2"} key={k}>
                        <OfferWidget product={p} />
                      </div>
                    ))}
                  </div>
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

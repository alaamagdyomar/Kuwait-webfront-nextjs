"use client";
import { StarIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";

import { keys, omit, round, take } from "lodash";
import { useTranslation } from "react-i18next";
const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 },
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
        <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
      `,
      author: "Emily Selman",
      avatarSrc:
        "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80",
    },
    // More reviews...
  ],
};

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function ({ rate, ratings }: { rate: any; ratings: any }) {
  const { t } = useTranslation("trans");
  const [showMore, setShowMore] = useState<number>(1);

  const handleClick = (k: number | string) => alert("rating");

  return (
    <div className='bg-white'>
      <div className=' w-full py-10 sm:pe-6  lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:pe-8 '>
        <div className='lg:col-span-12 w-2/3'>
          <h2 className='text-2xl capitalize font-bold tracking-tight text-gray-900'>
            {t("rating_and_reviews")}
          </h2>

          <div className='mt-3 flex items-center'>
            <div>
              <p className='sr-only'>{reviews.average} out of 5 stars</p>
            </div>
          </div>

          <div className='grid grid-cols-3 justify-between items-center mt-6'>
            <h3 className='sr-only'>Review data</h3>
            <div className='col-span-1'>
              <div className='flex flex-col items-center gap-y-4'>
                <h1 className='text-2xl sm:text-4xl'>{round(rate.avg, 2)}</h1>
                <div className='flex flex-row'>
                  {[0, 1, 2, 3, 4].map((rating, i) => (
                    <StarIcon
                      key={i}
                      className={classNames(
                        rate.avg > rating ? "text-yellow-400" : "text-gray-300",
                        "h-5 w-5 flex-shrink-0"
                      )}
                      aria-hidden='true'
                    />
                  ))}
                </div>
                <p className='text-xs text-gray-400 capitalize'>
                  {rate.count} {t("ratings")}
                </p>
              </div>
            </div>

            <dl className='col-span-2 space-y-3'>
              {keys(omit(rate, ["avg", "count"])).map((k, i) => (
                <div key={i} className='flex items-center text-sm '>
                  <dt className='flex flex-1 items-center'>
                    <button
                      onClick={() => handleClick(k)}
                      className='w-3 font-medium text-gray-900'>
                      {k}
                      <span className='sr-only'> star reviews</span>
                    </button>
                    <div
                      aria-hidden='true'
                      className='ml-1 flex flex-1 items-center'>
                      <StarIcon
                        onClick={() => handleClick(k)}
                        className={classNames(
                          rate[k] > 0 ? "text-yellow-400" : "text-gray-300",
                          "h-5 w-5 flex-shrink-0 hover:text-yellow-400"
                        )}
                        aria-hidden='true'
                      />
                      <div className='relative ml-3 flex-1'>
                        <div className='h-3 rounded-full border border-gray-200 bg-gray-100' />
                        {rate[k] > 0 ? (
                          <div
                            className='absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400'
                            style={{
                              width: `calc(${rate[k]} / ${rate.count} * 100%)`,
                            }}
                          />
                        ) : null}
                      </div>
                    </div>
                  </dt>
                  {rate[k] && rate.count ? (
                    <dd className='ml-3 w-10 text-right text-sm tabular-nums text-gray-900'>
                      {Math.round((rate[k] / rate.count) * 100)} %
                    </dd>
                  ) : null}
                </div>
              ))}
            </dl>
          </div>
          <div className='flow-root'>
            <div className='divide-y divide-gray-200'>
              {take(ratings, showMore).map((element: any, i: number) => (
                <div key={i} className='py-2'>
                  <div className='mt-4 text-xs space-y-6 italic text-gray-600'>
                    {element.message}
                  </div>
                  <div className='flex flex-row items-center gap-x-4'>
                    <div className=' flex flex-row items-center'>
                      {[0, 1, 2, 3, 4].map((rating, i) => (
                        <StarIcon
                          key={i}
                          className={classNames(
                            element.rate > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-3 w-3 flex-shrink-0"
                          )}
                          aria-hidden='true'
                        />
                      ))}
                    </div>
                    <div>
                      <h4 className='text-xs text-gray-400'>
                        {element.user} - {element.date}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {ratings.length > 1 && (
          <div className='col-span-full lg:mt-0'>
            <button
              onClick={() => setShowMore(showMore > 1 ? 1 : 2)}
              className='mt-3 inline-flex btn-gray '>
              {showMore > 1 ? t("hide") : t("show_more")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

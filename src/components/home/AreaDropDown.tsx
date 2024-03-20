"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import MarkerImg from "@/appIcons/marker.svg";
import { useGetAreasQuery } from "@/src/redux/api/areaApi";
import { map } from "lodash";
import { Area } from "@/src/types/queries";
import { setAreaCookie } from "@/app/actions";
import { setArea } from "@/src/redux/slices/areaSlice";

export default function () {
  const {
    area,
    country: { id },
    locale: { lang },
  } = useAppSelector((state) => state);
  const { data: areas, isSuccess } = useGetAreasQuery(id);
  const dispatch = useAppDispatch();

  const handleSetArea = async (a: Area) => {
    await setAreaCookie(JSON.stringify(a)).then(() => dispatch(setArea(a)));
  };

  return (
    <div className='relative  w-28'>
      <div className='fixed -mt-6 lg:-mt-0 w-auto text-right'>
        <Menu as='div' className='relative inline-block text-left'>
          <div className=''>
            <Menu.Button className='inline-flex gap-x-4 w-full justify-center items-center rounded-md bg-gray-100 p-3  text-md font-medium text-black hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 capitalize'>
              <MarkerImg className={`w-5 h-auto`} />
              <span className='truncate w-18'>
                {lang === "ar" ? area.web_name.ar : area.web_name.en}
              </span>
              <ChevronDownIcon className='w-4 h-4 text-black' />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
              <div className='px-1 py-1 '>
                {isSuccess &&
                  map(areas.data, (a: Area, i) => (
                    <Menu.Item key={i}>
                      {({ active }) => (
                        <button
                          onClick={() => handleSetArea(a)}
                          className={`${
                            active
                              ? "bg-picks-dark text-white"
                              : "text-gray-900"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                          {lang === "ar" ? a.web_name.ar : a.web_name.en}
                        </button>
                      )}
                    </Menu.Item>
                  ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

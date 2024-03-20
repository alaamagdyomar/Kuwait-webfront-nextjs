"use client";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import {
  addRadioChoice,
  removeRadioChoice,
} from "@/src/redux/slices/productSlice";
import { filter, flatten, indexOf, map } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

const notificationMethods = [
  { id: "email", title: "Email" },
  { id: "sms", title: "Phone (SMS)" },
  { id: "push", title: "Push notification" },
];
type Props = {
  group: any;
};
export default function ({ group }: Props): React.ReactNode {
  const { t } = useTranslation("trans");
  const dispatch = useAppDispatch();
  const {
    product: { selections, quantity },
  } = useAppSelector((state) => state);

  return (
    <div className='py-3'>
      <div className='flex flex-1 justify-between items-center'>
        <div>
          <label className='text-base font-semibold text-gray-900'>
            {group.name} - {group.id} - {group.input_type}
          </label>
          <p className='text-sm text-gray-400 ltr:text-left rtl:text-right capitalize'>
            {t("select_up_to", {
              max: group.max_number,
              min: group.min_number,
            })}
          </p>
        </div>
        <div className='bg-gray-200 p-2 text-sm rounded-2xl text-gray-600 capitalize'>
          {t(group.selection_type)}
        </div>
      </div>
      <fieldset className='mt-4'>
        <legend className='sr-only'>Notification method</legend>
        <div className='space-y-4'>
          {map(group.choices, (c: any, i) => (
            <div key={i} className='flex justify-between items-center'>
              <div className='flex flex-row justify-start items-center space-x-2'>
                <input
                  id={c.id}
                  disabled={quantity === 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(
                        addRadioChoice({
                          group_id: group.id,
                          choice_id: c.id,
                          qty: 1,
                          price: c.price,
                          multi:
                            (group.input_type === "checkbox" &&
                              group.max_number > 1) ||
                            (group.input_input_type !== "checkbox" &&
                              group.max_number > 1),
                          required: group.selection_type !== "optional",
                          min: group.min_number,
                          max: group.max_number,
                        })
                      );
                    } else {
                      dispatch(
                        removeRadioChoice({
                          group_id: group.id,
                          choice_id: c.id,
                          multi:
                            (group.input_type === "checkbox" &&
                              group.max_number > 1) ||
                            (group.input_input_type !== "checkbox" &&
                              group.max_number > 1),
                          required: group.selection_type !== "optional",
                          min: group.min_number,
                          max: group.max_number,
                        })
                      );
                    }
                  }}
                  type='checkbox'
                  checked={
                    indexOf(
                      map(
                        flatten(map(filter(selections, "choices"), "choices")),
                        "choice_id"
                      ),
                      c.id
                    ) >= 0
                  }
                  // name={
                  //   group.max_number === 1
                  //     ? `radio${group.id}`
                  //     : `checkbox${group.id}[]`
                  // }
                  // value={c.id}
                  // type={group.max_number === 1 ? "radio" : `checkbox`}
                  // defaultChecked={
                  //   indexOf(
                  //     map(
                  //       flatten(map(filter(selections, "choices"), "choices")),
                  //       "choice_id"
                  //     ),
                  //     c.id
                  //   ) >= 0
                  // }
                  className='h-4 w-4  border-gray-300 text-picks-dark focus:ring-picks-dark'
                />
                <label
                  htmlFor={c.id}
                  className='ps-2 block text-sm font-medium leading-6 text-gray-900'>
                  {c.name} - {c.id}
                </label>
              </div>
              <div>{c.price_format}</div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

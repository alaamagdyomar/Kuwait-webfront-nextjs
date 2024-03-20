"use client";
import { filter, first, flatten, map } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { useTranslation } from "react-i18next";
import {
  decreaseMeterChoice,
  increaseMeterChoice,
} from "@/src/redux/slices/productSlice";

export default function ({ group }: { group: any }): React.ReactNode {
  const { t } = useTranslation("trans");
  const dispatch = useAppDispatch();
  const {
    product: { selections, quantity },
  } = useAppSelector((state) => state);

  const meterBtn = (g: any, c: any, type: string) => {
    const currentChoice = first(
      filter(map(selections, "choices"), (choice) => choice.id === c.id)
    );
    if (type === "sub") {
      return (
        <button
          type='button'
          disabled={currentChoice?.quantity === 0 || quantity === 0}
          onClick={() =>
            dispatch(
              decreaseMeterChoice({
                choice_group_id: g.id,
                choices: [
                  {
                    choice_id: c.id,
                    quantity: 1,
                    price: c.price,
                    total: c.price,
                  },
                ],
                multi: g.max_number > 1,
                required: g.selection_type !== "optional",
                min: g.min_number,
                max: g.max_number,
              })
            )
          }
          className={`${
            currentChoice?.quantity === 0 || (quantity === 0 && `opacity-40`)
          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full hover:bg-picks-light`}>
          -
        </button>
      );
    } else {
      return (
        <button
          type='button'
          disabled={currentChoice?.quantity >= c.max_number || quantity === 0}
          onClick={() =>
            dispatch(
              increaseMeterChoice({
                choice_group_id: g.id,
                choices: [
                  {
                    choice_id: c.id,
                    quantity: 1,
                    price: c.price,
                    total: c.price,
                  },
                ],
                multi: g.max_number > 1,
                required: g.selection_type !== "optional",
                min: g.min_number,
                max: g.max_number,
              })
            )
          }
          className={`${
            currentChoice?.quantity === 0 || (quantity === 0 && `opacity-40`)
          }
          } bg-picks-dark  flex justify-center items-center text-white w-6 h-6 rounded-full hover:bg-picks-light`}>
          +
        </button>
      );
    }
  };

  return (
    <div className='py-3'>
      <div className='flex pb-2 flex-1 justify-between items-center'>
        <div className='flex flex-col '>
          <label className='text-base text-gra)y-900 ltr:text-left rtl:text-right'>
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
      {group.choices &&
        map(group.choices, (c, i) => {
          return (
            <fieldset key={i}>
              <div className='gap-y-4 py-1 flex justify-between items-center'>
                <div className='relative flex items-start'>
                  <div className='flex items-center'>
                    <div className={`flex flex-row gap-x-1`}>
                      {meterBtn(group, c, "add")}
                      <div className='flex justify-center items-center text-black w-6 h-6 rounded-full'>
                        {first(
                          filter(
                            flatten(map(selections, "choices")),
                            (choice) => choice.choice_id === c.id
                          )
                        )?.quantity ?? 0}
                      </div>
                      {meterBtn(group, c, "sub")}
                    </div>
                  </div>
                  <div className='ps-2 text-sm leading-6'>
                    <label
                      htmlFor='comments'
                      className='font-medium text-gray-900'>
                      {c.name} - {c.id}
                    </label>{" "}
                    <span className='text-gray-500 hidden'>
                      <span className='sr-only'>New comments </span>
                      so you always know what's happening.
                    </span>
                  </div>
                </div>
                <div>{c.price_format}</div>
              </div>
            </fieldset>
          );
        })}
    </div>
  );
}

import OfferWidget from "@/components/widgets/OfferWidget";
import { map } from "lodash";
export default function ({ elements, title }: any) {
  return (
    <div>
      <h1 className='capitalize text-xl my-4'>{title}</h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-4 gap-y-6'>
        {map(elements, (v, k: number) => (
          <div className={"col-span-1 me-2"} key={k}>
            <OfferWidget product={v} />
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

type Props = {
  summary: {
    subtotal: string | number;
    tax: string | number;
    total: string | number;
    delivery_fee: string | number | null;
  };
};

export default function PaymentSummary({ summary }: Props) {
  return (
    <div className="divide-y-2 divide-dashed">
      <div className="flex flex-col gap-y-3 py-3">
        <div className="flex justify-between items-center">
          <p>Subtotal</p>
          <p>{summary.subtotal}</p>
        </div>
        
        {summary.delivery_fee ? (
          <div className="flex justify-between items-center">
            <p>Delivery Fee</p>
            <p>{summary.delivery_fee}</p>
          </div>
        ) : null}

        {summary.tax ? (
          <div className="flex justify-between items-center">
            <p>Fees & Estimated Tax</p>
            <p>{summary.tax}</p>
          </div>
        ) : null}
      </div>

      <div className="flex justify-between items-center font-semibold pt-3">
        <p>Total</p>
        <p>{summary.total}</p>
      </div>
    </div>
  );
}

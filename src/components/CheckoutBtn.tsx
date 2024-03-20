import { LinearProgress } from "@mui/material";
import React from "react";

type Props = {
  total: string;
  disabled?: boolean;
};

export default function CheckoutBtn({
  total,
  disabled = false,
}: Props): React.ReactNode {
  return (
    <div className="bg-white">
      <LinearProgress
        variant="determinate"
        // classes={{
        //   root: `!picks-dark`,
        // }}
        sx={{
          "& .MuiLinearProgress-determinate": {
            backgroundColor: "#6E7887",
            // opacity: 0.5,
          },
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#02C9C0",
          },
        }}
        value={25}
      />

      {/* // opacity-50 */}
      <div className="p-5 pt-3 text-center">
        <p className="py-2">
          Add <span>5.00 KD</span> to Start order
        </p>
        <div
          className={`bg-picks-dark ${
            disabled ? "opacity-20" : ""
          } w-full p-3 flex justify-between items-center rounded-lg text-white`}
        >
          <p>Checkout</p>
          <p>{total}</p>
        </div>
      </div>
    </div>
  );
}

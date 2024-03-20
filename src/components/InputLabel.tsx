"use client";
import { LabelHTMLAttributes } from "react";

export default function InputLabel({
  value,
  className = "",
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
  return (
    <label
      {...props}
      className={
        `block font-medium text-sm text-gray-700 capitalize` + className
      }>
      {value ? value : children}
      {props["aria-required"] && (
        <span className='text-red-800 text-xl'>* </span>
      )}
    </label>
  );
}

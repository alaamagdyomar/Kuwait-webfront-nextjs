"use client";
import React from "react";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
// import SunEditor, { buttonList } from "suneditor-react";
// // import "@/styles/suneditor.min.css"; // Import Sun Editor's CSS File
// import "suneditor/src/assets/css/suneditor.css";

type Props = {
  language: string;
  name: string;
  setValue: (x: any, y: any) => void;
  defaultValue?: string;
};
export function TextEditor({
  setValue,
  language,
  name,

  defaultValue,
}: Props) {
  const handleChange = (e: string) => {
    setValue(`${name}[${language}]`, e);
  };

  return (
    <SunEditor
      lang={"en"}
      defaultValue={defaultValue}
      onChange={(e) => handleChange(e)}
      setOptions={{
        height: `200`,
        // buttonList: buttonList.complex,
      }}
    />
  );
}

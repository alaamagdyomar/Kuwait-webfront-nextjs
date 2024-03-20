"use client";
import {
  truncate,
  kebabCase,
  round,
  isUndefined,
  isNull,
  lowerCase,
  replace,
} from "lodash";
import Slider from "react-slick";
export const appVersion = `0.0.1`;
// export const apiUrl = `${baseUrl}/api/`;
export const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export const imageUrl = `https://loremflickr.com/`;
export const isLocal = process.env.NODE_ENV !== "production";
console.log("production", process.env.NODE_ENV === "production");
console.log("apiUrl", process.env.NEXT_PUBLIC_API_URL);
export const suppressText = true;
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import { Country } from "./types/queries";
export { PersonOutlineOutlined, truncate };
export { kebabCase, Slider };

export const convertSearchParamsToString = (
  search: { [key: string]: string } | string
): string => {
  if (typeof search === "object" && !Array.isArray(search) && search !== null) {
    return Object.keys(search)
      .map((key) => {
        return `${key}=${encodeURIComponent(search[key])}`;
      })
      .join("&");
  }
  return ``;
};

export const toEn = (s: any) =>
  s.replace(/[\u0660-\u0669\u06f0-\u06f9]/g, (a: any) => a.charCodeAt(0) & 15);

export const logoBlured = `
data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAE6CAMAAACbLJ/BAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAMAUExURUxpcZlpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS5lpS3fJWVUAAAD/dFJOUwD9KSAlRek/WPb0vTV0ggPm2GDIsMUB/G/+zxL7wSjtRAb639MV8PeE7qLrBS2oHFuk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    
`;

export const whatsappUrl = (phone: string) =>
  `https://api.whatsapp.com/send?phone=${phone}`;
export const getPrice: (element: number, country: Country) => number = (
  element,
  country
) => round(element * country.exchange_rate);

export const prepareCountryCookie = (country: string) =>
  isUndefined(country) || isNull(country) || country.length <= 2
    ? "kw"
    : country;

export const currentScreenSize = (): string => {
  if (window.innerWidth <= 640) {
    return "sm";
  } else if (window.innerWidth <= 768) {
    return "md";
  } else if (window.innerWidth <= 1024) {
    return "lg";
  } else if (window.innerWidth <= 1280) {
    return "xl";
  } else if (window.innerWidth > 1280) {
    return "2xl";
  }
  return "2xl";
};

export const getSlidesToShow = (
  currentWidth: number | null,
  sm: number,
  md: number,
  lg: number,
  xl: number,
  xxl: number
): number => {
  if (currentWidth) {
    if (currentWidth <= 640) {
      return sm <= xxl ? sm : xxl;
    } else if (currentWidth <= 768) {
      return md <= xxl ? md : xxl;
    } else if (currentWidth <= 1024) {
      return lg <= xxl ? lg : xxl;
    } else if (currentWidth <= 1280) {
      return xl <= xxl ? lg : xxl;
    } else {
      return xxl;
    }
  } else {
    return xxl;
  }
};

export const categoriesSliderSettings: any = {
  dots: false,
  speed: 500,
  infinite: true,
  slidesToShow: 7,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
  // className: "center",
  // centerMode: true,
  // infinite: true,
  // centerPadding: "60px",
};

export const adsSliderSettings: any = {
  dots: false,
  speed: 500,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  // className: "center",
  // centerMode: true,
  // infinite: true,
  // centerPadding: "60px",
};


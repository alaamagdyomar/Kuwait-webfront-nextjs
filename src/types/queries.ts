import { countriesList } from ".";

export type ElementPagination<T> = {
  data: T;
  status: number;
  success: boolean;
  pagination: {
    meta: {
      page: {
        current: number;
        first: number;
        last: number;
        next: string;
        previous: string;
        per: number;
        from: number;
        to: number;
        count: number;
        total: number;
        isFirst: boolean;
        isLast: boolean;
        isNext: boolean;
        isPrevious: boolean;
      };
    };
    links: {
      path: string;
      first: string;
      next: string;
      previous: string;
      last: string;
    };
  };
};

export type Product = {
  id: number;
  name: string;
  name_en: string;
  description: string;
  favorite: boolean;
  price: number;
  price_format: string;
  new_price: number;
  new_price_format: string;
  percentage: string;
  logo: string;
  image: string;
  vendor_id: number;
  stock: number;
  images?: string[];
  currency: string;
  groups?: []
  vendor: {
    id: number | string;
  };
};

export type Category = {
  id: string;
  name: string;
  caption: string;
  image: string;
  [key: string]: string;
};

export type AppQueryResult<T> = {
  data: T;
  status: number;
  success: boolean;
};

export type Country = {
  id: number;
  name: string;
  country_code: countriesList;
  code: string;
  web_name: {
    ar: string;
    en: string;
  };
  [key: string]: any;
};

export type Area = {
  id: number;
  name: any;
  name_en: any;
  web_name: {
    ar: string;
    en: string;
    [key: string]: string;
  };
  [key: string]: any;
};

export type Branch = {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  address: string;
  phone: string;
  delivery_type: "both" | "delivery" | "pickup";
  vendor_id: number | string;
  modalEnabled?: boolean;
};

export type User = {
  id: number;
  name?: string;
  store_name?: string;
  store_name_en?: string;
  rating: number;
  favoriate: boolean;
  description: string;
  status: string;
  delivery_fees: string;
  delivery_time: string;
  image: string;
  [key: string]: any;
};

export type AuthUser = {
  id?: number;
  name?: string;
  email?: string;
  phone: string;
  gender?: string;
  birth_date?: string;
  phone_country_code: string;
  type?: "reset" | "register";
};
export type Auth = {
  token: string | null;
  user: AuthUser | null;
};

export type Order = {
  id?: string;
  status: "pending" | "paid" | "failed";
  paid: boolean;
  total: number;
  net_total: number;
  discount: number;
  reference_id: string | number;
  membership_id: string | number;
  user_id?: string | number;
  created_at?: string;
  user?: Auth;

  [key: string]: any;
};

export type ImageType = {
  id: number;
  name: string;
  caption: string;
  image: string;
  large: string;
  url: string;
  [key: string]: any;
};

export type Setting = {
  id: number;
  [key: string]: any;
};

export type Slide = {
  id: number;
  type: "vendor" | "offer";
  screen_type: "home" | "category";
  vendor_id: number | null;
  offer_id: number | null;
  category_id: number | null;
  image: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Offer = {
  id: number;
  name: string;
  name_en: string;
  favorite: boolean;
  stock: number;
};
export type Choice = {
  id: number;
  name: string;
  price: string;
  quantity: number;
  subtotal: string;
};
export type CartProduct = {
  choices: Choice[];
  id: number;
  image: string;
  notes: null | string;
  offer: Offer;
  price: string;
  quantity: number;
  subtotal: string;
  total_choices: string;
};
export type Vendor = {
  id: number;
  items: number;
  logo: string;
  name: string;
  name_en: string;
};
export type Cart = {
  delivery_fee: null | string;
  id: number;
  items: CartProduct[];
  session_id: string | null;
  subtotal: string;
  tax: number;
  total: string;
  user_id: null | number;
  vendor: Vendor;
};

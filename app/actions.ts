"use server";
import { cookies } from "next/headers";

// lang
export async function setLocaleCookie(value: string) {
  cookies().set({
    name: "NEXT_LOCALE",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}

// country
export async function setCountryNameCookie(value: string) {
  cookies().set({
    name: "NEXT_COUNTRY_NAME",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCountryNameCookie() {
  const countryCookie = cookies().get('NEXT_COUNTRY_NAME');
  return countryCookie?.value ?? 'kw'; // default country starts here
}

export async function setCountryCookie(value: string) {
  cookies().set({
    name: "NEXT_COUNTRY",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getCountryCookie() {
  const countryCookie = cookies().get('NEXT_COUNTRY');
  if (countryCookie && countryCookie.value !== undefined) {
    return JSON.parse(countryCookie?.value);
  } else {
    return 'kw';
  }
}

export async function removeCountryCookie() {
  cookies().delete("NEXT_COUNTRY_NAME");
  cookies().delete("NEXT_COUNTRY");
}

// area
export async function setAreaCookie(value: string) {
  cookies().set({
    name: "NEXT_AREA",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}
// area
export async function getAreaCookie() {
  const areaCookie = cookies().get('NEXT_AREA');
  if (areaCookie && areaCookie.value && areaCookie.value !== undefined) {
    return JSON.parse(areaCookie?.value);
  }
}

export async function removeAreaCookie() {
  cookies().delete("NEXT_AREA");
}

// type
export async function setOrderType(value: string) {
  cookies().set({
    name: 'NEXT_X_TYPE',
    value,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getOrderType() {
  const countryCookie = cookies().get('NEXT_X_TYPE');
  return countryCookie?.value ?? 'pickup';
}

// auth 
export async function setAuth(value: string) {
  cookies().set({
    name: "NEXT_AUTH",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getAuth() {
  const authCookie = cookies().get('NEXT_AUTH');
  if (authCookie && authCookie.value && authCookie.value !== undefined) {
    return JSON.parse(authCookie?.value);
  }
  return null;
}

export async function removeAuth() {
  cookies().delete("NEXT_AUTH");
}

export async function getLang() {
  return cookies().get("NEXT_LOCALE")?.value ?? "en";
}

export async function setLang(value: string) {
  cookies().set({
    name: "NEXT_LOCALE",
    value,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function getMainHeaders() {
  const country = await getCountryCookie();
  const lang = await getLang();
  const area = await getAreaCookie();
  const orderType = await getOrderType();
  const auth = await getAuth();
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Internal': 'Internal', // just for dev mode will be removed later
    'Accept-Language': lang,
    'X-Localization': lang,
    'X-Country': country?.id,
    ...(area && area.id && { 'X-AREA': area.id }),
    ...(orderType && { 'X-TYPE': orderType }),
    ...(auth && auth.token !== null && { 'Authorization': `Bearer ${auth.token}` })
  }
}

"use client";
import { FC, createContext, useEffect } from "react";
import NavHeader from "@/components/header/NavHeader";
import { Locale, countriesList } from "@/types/index";
import { useParams, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLocale } from "@/redux/slices/localeSlice";
import moment from "moment";
import * as yup from "yup";
import { setAreaCookie, setLang, setLocaleCookie } from "@/app/actions";
import { setCountry } from "@/redux/slices/countrySlice";
import { useLazyGetCountryByNameQuery } from "@/redux/api/countryApi";
import { useLazyGetAreasQuery } from "@/redux/api/areaApi";
import { setArea } from "@/src/redux/slices/areaSlice";
import LoginModal from "@/src/components/modals/LoginModal";
import RegisterModal from "@/src/components/modals/RegisterModal";
import ForgetPasswordModal from "@/src/components/modals/ForgetPasswordModal";
import VerificationModal from "@/src/components/modals/VerificationModal";
import ChangePasswordModal from "@/src/components/modals/ChangePasswordModal";
import { Area } from "@/src/types/queries";
import { first } from "lodash";
import { toggleSideMenu } from "@/src/redux/slices/settingSlice";
import { hideProductModal } from "@/src/redux/slices/productSlice";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";

const DynamicAppFooter = dynamic(
  () => import("@/components/footer/AppFooter"),
  {
    ssr: false,
  }
);

const DyanamicProductModal = dynamic(
  () => import("@/src/components/modals/product/ProductModal"),
  {
    ssr: false,
  }
);

type Props = {
  children: React.ReactNode;
  showMiddleNav?: boolean;
};

const ContentLayout: FC<Props> = ({
  children,
  showMiddleNav = false,
}): React.ReactNode => {
  const [t, i18n] = useTranslation("trans");
  const {
    locale,
    country: { id: country_id },
    appSetting: { isLoading },
  } = useAppSelector((state) => state);
  const params: { lang: Locale["lang"]; country?: countriesList } | any =
    useParams!();
  const [cookies] = useCookies();
  const { lang } = params;
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const [triggerGetCountryByName] = useLazyGetCountryByNameQuery();
  const [triggerGetAreas] = useLazyGetAreasQuery();

  useEffect(() => {
    dispatch(setLocale(lang));
    i18n.changeLanguage(lang);
    setLocaleCookie(lang);
    setLang(lang);
    moment.locale(lang);
    yup.setLocale({
      mixed: {
        required: () => t("validation.required"),
      },
      number: {
        min: ({ min }) => ({ key: t("validation.min"), values: { min } }),
        max: ({ max }) => ({ key: t("validation.max"), values: { max } }),
      },
      string: {
        email: () => t("validation.email"),
        min: ({ min }) => ({ key: t("validation.min"), values: min }),
        max: ({ max }) => ({ key: t("validation.max"), values: max }),
        matches: () => t("validation.matches"),
      },
    });
  }, [lang, locale.lang]);

  // sets cookies if country changed from any page
  useEffect(() => {
    if (params && params.country !== undefined) {
      triggerGetCountryByName(params.country, false).then((r: any) => {
        if (r.data && r.data.data) {
          dispatch(setCountry(r.data.data));
        }
      });
    } else if (cookies.NEXT_COUNTRY) {
      dispatch(setCountry(cookies.NEXT_COUNTRY));
    }
  }, [params?.country]);

  useEffect(() => {
    dispatch(hideProductModal());
    dispatch(toggleSideMenu(false));
  }, []);

  useEffect(() => {
    triggerGetAreas(country_id, false).then((r: any) => {
      if (r && r.data && r.data.success && r.data.data) {
        const serverArea: Area | undefined = first(r.data.data);
        const cookieArea = cookies.NEXT_AREA;
        if (cookieArea && country_id !== cookieArea.country.id && serverArea) {
          dispatch(setArea(serverArea));
          setAreaCookie(JSON.stringify(serverArea));
        } else if (cookieArea && cookieArea.country.id === country_id) {
          dispatch(setArea(cookieArea));
          setAreaCookie(JSON.stringify(cookieArea));
        } else if (serverArea) {
          dispatch(setArea(serverArea));
          setAreaCookie(JSON.stringify(serverArea));
        }
      }
    });
  }, [country_id]);

  return (
    <div
      className={`font-expo-medium`}
      dir={params.lang === "ar" ? "rtl" : "ltr"}>
      {/* nav */}
      <NavHeader showMiddleNav={showMiddleNav} />
      <LoginModal />
      <RegisterModal />
      <ForgetPasswordModal />
      <VerificationModal />
      <ChangePasswordModal />
      <DyanamicProductModal />
      <div
        className={`relative isolate overflow-hidden ${
          !isLoading && `mt-[8vh] sm:mt-[5vh]`
        } py-8 `}>
        {children}
      </div>
      <DynamicAppFooter />
    </div>
  );
};

export default ContentLayout;

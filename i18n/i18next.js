import i18n from "i18next";
import HttpBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import en from "../dictionaries/en.json";
import ar from "../dictionaries/ar.json";
const resources = {
  en,
  ar,
};
i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    defaultNS: "trans",
    fallbackLng: "en",
    debug: true,
    whitelist: ["en", "ar"],
    languages: ["en", "ar"],
    lng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
    react: { useSuspense: true },
  });

export default i18n;

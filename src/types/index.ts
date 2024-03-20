
export interface Locale {
    lang: 'ar' | 'en';
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    otherLang: 'ar' | 'en';
}

export type toastMessage = {
    content: string;
    type: string;
    title?: string;
    showToast: boolean;
}

export type ContactusForm = {
    first_name: string;
    last_name: string;
    phone: string;
    message: string;
    dail_code?: string;
}

export type TranslationType = { [key: string]: string };

export type localeType = Locale | string | string[];
export type countriesList = 'kw' | 'eg' | 'ua';
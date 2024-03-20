import { Locale, countriesList } from '@/src/types'
import { addDashs } from '@/utils/helpers'

export const appLinks = {
    landing: (lang: Locale['lang']) =>
        `/${lang}`,
    home: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}`,
    aboutus: (lang: Locale['lang']) =>
        `/${lang}/aboutus`,
    contactus: (lang: Locale['lang']) =>
        `/${lang}/contactus`,
    joinus: (lang: Locale['lang']) =>
        `/${lang}/joinus`,
    faqs: (lang: Locale['lang']) =>
        `/${lang}/faqs`,
    terms: (lang: Locale['lang']) =>
        `/${lang}/terms`,
    orders: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/orders`,
    account: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/account`,
    favorites: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/favorites`,
    addresses: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/addresses`,
    promotions: (lang: Locale['lang'], country: countriesList) =>
        `/${lang}/${country}/promotions`,
    offers: (lang: Locale['lang'], country: countriesList, search?: string) =>
        `/${lang}/${country}/offers?${search ?? ``}`,
    search: (lang: Locale['lang'], country: countriesList, search: string) =>
        `/${lang}/${country}/search/${search}`,
    offer: (lang: Locale['lang'], country: countriesList, id: string, slug?: string) =>
        `/${lang}/${country}/offer/${id}?slug=${slug ? addDashs(slug) : ``}`,
    vendors: (lang: Locale['lang'], country: countriesList, search?: string) =>
        `/${lang}/${country}/vendors?${search ?? ``}`,
    vendor: (lang: Locale['lang'], country: countriesList, id: string, slug?: string, branch_id?: string) =>
        `/${lang}/${country}/vendor/${id}?${slug ? `slug=${addDashs(slug)}` : ``}${branch_id ? `&branch_id=${branch_id}` : ``}`,

}
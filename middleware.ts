import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { i18n } from '@/i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { getCountry } from '@/utils/country'
import { cookies } from 'next/headers'
import { Country } from '@/types/queries'
import { getCountryNameCookie } from './app/actions'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  if (languages.length === 1 && languages[0] === '*') {
    languages = ['ar']
  }
  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export default async function middleware(request: NextRequest, response: NextResponse) {
  const pathName = request.nextUrl.pathname;
  const currentRequestedLocale = pathName.split('/')[1];
  const country: string | undefined = pathName.split('/')[2] ?? await getCountryNameCookie();
  const pathnameIsMissingLocale = await i18n.locales.every(
    locale => !pathName.startsWith(`/${locale}/`) && pathName !== `/${locale}`
  )
  const token = request.cookies.get('token');
  const res = NextResponse.next()
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathName.startsWith('/') ? '' : '/'}${pathName}`,
        request.url
      ))
  } else {
    if (token &&
      (request.nextUrl.pathname.includes('login') ||
        request.nextUrl.pathname.includes('register'))
    ) {
      return NextResponse.redirect(new URL(`/${currentRequestedLocale}`, request.url))
    }
    if (!request.nextUrl.pathname.includes('terms')
      && !request.nextUrl.pathname.includes('faqs')
      && !request.nextUrl.pathname.includes('about')
      && !request.nextUrl.pathname.includes('contactus')
      && !request.nextUrl.pathname.includes('privacy')
      && !request.nextUrl.pathname.includes('joinus')
    ) {
      const cookieCountry: any = request.cookies.get('NEXT_COUNTRY')?.value;
      if (cookieCountry) {
        const cookieCountryVal = JSON.parse(cookieCountry);
        if (cookieCountryVal.country_code.toLowerCase() === country) {
          console.log('case 1');
          return res;
        } else {
          console.log('case 2');
          const serverCountry: { data: Country } = await getCountry(country);
          if (serverCountry?.data?.country_code?.toLowerCase()) {
            res.cookies.set('NEXT_COUNTRY', JSON.stringify(serverCountry.data));
            res.cookies.set('NEXT_COUNTRY_NAME', country)
            return res;
          } else {
            return NextResponse.redirect(new URL(`/${currentRequestedLocale}`, request.url))
          }
        }
      } else {
        const serverCountry: { data: Country } = await getCountry(country);
        // if country exists or serverCountry exists but where must be servercountry equal to country go to the URL 
        if ((country !== undefined || serverCountry !== undefined) && serverCountry?.data?.country_code?.toLowerCase() !== country.toLowerCase()) {
          // go to landing page
          console.log('case Landing Page =======>');
          return NextResponse.redirect(new URL(`/${currentRequestedLocale}`, request.url))
        } else {
          console.log('case 3');
          res.cookies.set('NEXT_COUNTRY', JSON.stringify(serverCountry.data));
          res.cookies.set('NEXT_COUNTRY_NAME', country)
          return res;
        }
      }
    }
    return res;
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}

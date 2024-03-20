import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { getLang } from '@/app/actions';

export async function getSetting() {
    const lang = await getLang();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}setting`, {
        // cache: "no-store",
        next: { revalidate: process.env.NODE_ENV === 'production' ? 60 : 180 },
        headers: {
            'Accept-Language': lang,
            ...mainHeaders,
        }
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('setting error');
    return res.json();
}

export async function getLightSetting(lang: Locale['lang']) {
    // const { searchParams } = new URL(request.url)
    // const id = searchParams.get('id')
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}setting/1`, {
        next: { revalidate: 60 },
        headers: {
            'Accept-Language': lang,
            ...mainHeaders
        }
    });
    if (!res.ok) throw notFound();
    return res.json();
}
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { getMainHeaders } from "@/app/actions";
import { revalidate } from "@/utils/helpers";

export async function getAreas(lang: Locale['lang'], country_id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}area`,
        {
            next: { revalidate: revalidate.max },
            headers: await getMainHeaders(),
        }
    );
    if (!res.ok) new Error(res.statusText);
    return res.json();
}

export async function getArea(id: number) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}country/${id}`,
        {
            next: { revalidate: revalidate.max },
            headers: await getMainHeaders(),
        }
    );
    if (!res.ok) new Error(res.statusText);
    return res.json();
}

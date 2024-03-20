
import { notFound } from 'next/navigation';
import { revalidate } from '@/utils/helpers';
import { getMainHeaders } from '@/app/actions';

export async function getFaqs() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}faq`, {
        next: { revalidate: revalidate.max },
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}

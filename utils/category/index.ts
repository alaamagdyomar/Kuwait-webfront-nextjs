import { Locale, countriesList } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { revalidate } from '@/utils/helpers';
import { getMainHeaders } from '@/app/actions';

export async function getCategories() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}category`, {
        next: { revalidate: revalidate.min },
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error('get categories error');
    // if (!res.ok) throw notFound();
    return res.json();
}
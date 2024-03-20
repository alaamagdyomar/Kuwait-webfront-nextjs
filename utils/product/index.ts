import { notFound } from 'next/navigation';
import { getMainHeaders } from '@/app/actions';
import { revalidate } from '@/utils/helpers';


export async function getProducts(search?: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}offers?${search ?? ``}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getProduct(id: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}offer/${id}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}


export async function getSearchItems(search: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}search?key=${search}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}
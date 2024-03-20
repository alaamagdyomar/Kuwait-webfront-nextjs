
import { Locale } from '@/types/index';
import { notFound } from 'next/navigation';
import { mainHeaders } from '@/utils/helpers';
import { getAuth } from '@/app/actions';
import { getMainHeaders } from '@/app/actions';

export async function getVendors(search?: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendors?${search ?? ``}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getVendor({ id, branch_id }: { id: string, branch_id?: string }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendor/${id}${branch_id ? `?branch_id=${branch_id}` : ``}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    console.log('headers=========>', await getMainHeaders())
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}

export async function getVendorFeatured(search?: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}vendors/featured?${search ?? ``}`, {
        cache: "no-store",
        headers: await getMainHeaders()
    });
    if (!res.ok) throw process.env.NODE_ENV === 'production' ? notFound() : new Error(res.statusText);
    // if (!res.ok) throw notFound();
    return res.json()
}

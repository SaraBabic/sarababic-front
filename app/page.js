import { notFound } from 'next/navigation';
import { getAppData } from '@/lib/helpers/fetch-data';

import DefaultLayout from '@/components/templates/Layout/Default';
import { convertMetaData } from '@framework/helpers/metadata';

export const revalidate = 10;

export async function generateMetadata({ params }, parent) {
    const metaData = await convertMetaData({ params }, parent);
    return metaData;
}

export default async function Home({ params }) {
    const initialState = await getAppData(params);

    if (initialState?.appData?.notFound) {
        return notFound();
    }

    return <DefaultLayout initialState={initialState} />;
}

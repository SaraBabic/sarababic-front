import { notFound } from 'next/navigation';
import { getPreviewData } from '@/lib/helpers/fetch-data';
import DefaultLayout from '@/components/templates/Layout/Default';

export default async function Preview({ params, searchParams }) {
    const uri = params?.slug ? params?.slug?.join('/') : null;
    const initialState = await getPreviewData(uri, searchParams?.site, searchParams?.token);

    if (initialState?.appData?.notFound) {
        return notFound();
    }

    return <DefaultLayout initialState={initialState} />;
}

export const metadata = {
    title: {
        default: 'Vorschau',
    },
};

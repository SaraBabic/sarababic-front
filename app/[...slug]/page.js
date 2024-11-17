import { notFound, redirect } from 'next/navigation';
import { getAppData, getSlugParams } from '@/lib/helpers/fetch-data';
import DefaultLayout from '@/components/templates/Layout/Default';
import { convertMetaData } from '@framework/helpers/metadata';

export const revalidate = 10;

export async function generateStaticParams() {
    const slugParams = await getSlugParams();
    const staticPaths = slugParams?.staticPaths;
    return staticPaths || [];
}

export async function generateMetadata({ params }, parent) {
    const metaData = await convertMetaData({ params }, parent);
    return metaData;
}

export default async function Slug({ params }) {
    const initialState = await getAppData(params);

    if (initialState?.appData?.notFound) {
        return notFound();
    }

    // Redirect the homepage slug to /
    if (initialState?.redirectUrl) {
        redirect(initialState.redirectUrl);
    }

    return <DefaultLayout initialState={initialState} />;
}

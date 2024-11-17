import { getMetaData } from '@/lib/helpers/fetch-data';

export async function convertMetaData({ params }, parent) {
    const metaData = await getMetaData(params);
    const meta = metaData?.appData?.meta;

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];
    const metaDataReturnValue = {
        title: meta?.metaTitle || meta?.websiteTitle,
        description: meta?.metaDescription || null,
        robots: {
            index: meta?.metaRobotsIndex || true,
        },
        openGraph: {
            title: meta?.opengraphTitle,
            description: meta?.opengraphDescription,
            siteName: metaData?.site?.name,
            locale: meta?.metaLocale,
            type: meta?.opengraphType || 'website',
            images: [meta?.opengraphImage, ...previousImages],
        },
        icons: {
            icon: '/assets/app-icons/favicon.ico',
        },
    };

    return metaDataReturnValue;
}

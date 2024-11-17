import { fetcher } from '@/lib/actions/api';

/**
 * Prepare data for usage inside the app
 * @param {*} appData
 * @returns
 */
const prepareData = (appData) => {
    const entry = appData?.entry;
    const isHomepage = appData?.isHomepage;
    const redirectUrl = appData?.redirectUrl;
    const siteBaseURL = appData?.siteBaseURL;
    const homepageURI = appData?.homepageURI;

    return { appData, mainNavigation: appData?.mainNavigation, footerNavigation: appData?.footerNavigation, entry, isHomepage, homepageURI, redirectUrl, siteBaseURL };
};

/**
 * Get general app and page data
 * @param {*} params
 * @param {*} siteHandle
 * @returns
 */
export const getAppData = async (params, siteHandle = 'default') => {
    const uri = Array.isArray(params?.slug) ? params?.slug?.join('/') : '/';
    const appData = await fetcher({
        key: 'app',
        variables: {
            site: siteHandle,
            uri,
        },
    });

    return prepareData(appData);
};

/**
 * Get all slugs for static generation
 * @returns
 */
export const getSlugParams = async () => {
    const entriesData = await fetcher({
        key: 'all_entries',
        variables: {
            section: ['pages'],
        },
    });

    return entriesData;
};

/**
 * Get preview data
 * @param {*} uri
 * @param {*} siteHandle
 * @param {*} previewToken
 * @returns
 */
export const getPreviewData = async (uri, siteHandle = 'default', previewToken) => {
    const appData = await fetcher({
        key: 'app',
        previewToken,
        variables: {
            site: siteHandle,
            uri,
            status: null,
        },
    });

    return prepareData(appData);
};

/**
 * Get meta data
 * @param {*} params
 * @param {*} siteHandle
 * @returns
 */
export const getMetaData = async (params, siteHandle = 'default') => {
    const uri = Array.isArray(params?.slug) ? params?.slug?.join('/') : '/';
    const metaData = await fetcher({
        key: 'meta',
        variables: {
            site: siteHandle,
            uri,
        },
    });

    return prepareData(metaData);
};

/**
 * Get meta data
 * @param {*} params
 * @param {*} siteHandle
 * @returns
 */
export const getSitemapData = async () => {
    const sitemapEntries = await fetcher({
        key: 'sitemap',
    });

    return sitemapEntries;
};

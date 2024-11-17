import { getSitemapData } from '@/lib/helpers/fetch-data';

export default async function sitemap() {
    const sitemapEntries = await getSitemapData();

    return Array.isArray(sitemapEntries) ? sitemapEntries : [];
}

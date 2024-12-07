import { resolveAppData } from './resolvers/app';
import { PAGE_META_FRAGMENT } from './fragments/page';
import { SITE_CONFIG_FRAGMENT } from './fragments/siteConfig';
import { BLOG_META_FRAGMENT } from './fragments/blog';
import { PROJECTS_META_FRAGMENT } from './fragments/project';

export const META_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query META_QUERY($site: [String], $uri: [String], $slug: [String], $status: [String]) {
            entry(site: $site, section: ["pages", "blogs", "projects"], uri: $uri, slug: $slug, status: $status) {
                sectionHandle
                typeHandle
                id
                uid
                uri
                title
                siteId
                language
                ${PAGE_META_FRAGMENT}
                ${BLOG_META_FRAGMENT}
                ${PROJECTS_META_FRAGMENT}
            }
            ${SITE_CONFIG_FRAGMENT}
        }
    `,
    resolver: async (response, variables) => {
        const returnValue = response?.data || response?.errors || null;
        const resolvedData = resolveAppData(returnValue, variables);
        const entry = resolvedData?.entry;
        const settings = resolvedData?.settings;
        const favicon = settings?.favicon;
        const siteImage = entry?.siteImage?.[0]?.url || null;
        const websiteTitle = settings?.websiteTitle;
        let metaTitle = entry?.seoTitle || entry?.siteHeadline || entry?.title;
        const metaDescription = entry?.seoDescription || null;
        const metaRobotsIndex = entry?.seoRobotsIndex === false ? false : true;
        const opengraphImage = entry?.opengraphImage?.[0]?.url || siteImage || null;
        const opengraphDescription = entry?.opengraphDescription || metaDescription || null;
        const opengraphTitle = entry?.opengraphTitle || metaTitle || null;
        const opengraphType = entry?.opengraphType || 'website';
        const metaLocale = entry?.language ? entry?.language?.replace('-', '_') : null;

        if (!metaTitle || resolvedData?.notFound) {
            metaTitle = '404';
        }

        if (websiteTitle) {
            metaTitle += ` | ${websiteTitle}`;
        }

        if (!resolvedData) {
            return null;
        }

        resolvedData.meta = {
            websiteTitle,
            metaTitle,
            metaDescription,
            metaRobotsIndex,
            metaLocale,
            opengraphImage,
            opengraphDescription,
            opengraphTitle,
            opengraphType,
            favicon,
        };

        return resolvedData;
    },
};

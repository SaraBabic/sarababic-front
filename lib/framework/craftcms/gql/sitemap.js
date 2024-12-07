import { ALL_SECTIONS } from './constants';
import { BLOG_META_FRAGMENT } from './fragments/blog';
import { PAGE_META_FRAGMENT } from './fragments/page';
import { PROJECTS_META_FRAGMENT } from './fragments/project';
import { resolveAppData } from './resolvers/app';

export const SITEMAP_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query SITEMAP {
            entries (section: ${ALL_SECTIONS}, site: "*") {
                title
                uri
                language
                uid
                siteHandle
                ${PAGE_META_FRAGMENT}
                ${BLOG_META_FRAGMENT}
                ${PROJECTS_META_FRAGMENT}
            }
            sites
            sitesConfig: globalSets(handle:"siteConfig") {
                ... on siteConfig_GlobalSet {
                    siteId
                    siteHandle
                    homepage {
                        uri
                    }
                }
            }
        }
    `,
    resolver: (response) => {
        const data = response?.data || response;
        const resolvedData = resolveAppData(data);
        const entries = resolvedData?.entries;
        const sites = resolvedData?.sites;
        const sitesData = {};

        if (Array.isArray(resolvedData?.sitesConfig)) {
            resolvedData?.sitesConfig?.map((config) => {
                const siteHomepage = config?.homepage?.[0];

                if (siteHomepage) {
                    const additionalSiteData = sites?.find((site) => site?.handle === config.siteHandle);
                    sitesData[config.siteHandle] = { ...additionalSiteData, homepage: siteHomepage };
                }
            });
        }

        const sitemapEntries = entries?.map((entry) => {
            const entrySitesData = sitesData[entry?.siteHandle];
            const siteHomepage = entrySitesData?.homepage;
            let url = `${entrySitesData?.baseUrl}${entry.uri}`;
            let isHomepage = false;

            if (siteHomepage?.uri === entry?.uri) {
                url = entrySitesData?.baseUrl;
                isHomepage = true;
            }

            return {
                url,
                priority: isHomepage ? 1.0 : entry?.priority || 0.5,
            };
        });

        return sitemapEntries;
    },
};

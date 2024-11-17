import { ALL_SECTIONS } from './constants';
import { MAIN_NAVIGATION_FRAGMENT } from './fragments/navigation';
import { PAGE_FRAGMENT } from './fragments/page';
import { MODULES_RESOLVER } from './resolvers/modules';
import { SITE_CONFIG_FRAGMENT } from './fragments/siteConfig';
import { resolveAppData } from './resolvers/app';

export const APP_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query APP_QUERY($site: [String], $uri: [String], $slug: [String], $status: [String]) {
            entry(site: $site, section: ${ALL_SECTIONS}, uri: $uri, slug: $slug, status: $status) {
                sectionHandle
                typeHandle
                ${PAGE_FRAGMENT}
            }
            ${MAIN_NAVIGATION_FRAGMENT}
            ${SITE_CONFIG_FRAGMENT}
            sites
        }
    `,
    resolver: async (response, variables) => {
        const returnValue = response?.data || response?.errors || null;
        const resolvedData = resolveAppData(returnValue, variables);
        const modules = resolvedData?.entry?.modules;

        if (modules?.length) {
            await MODULES_RESOLVER(modules, resolvedData?.entry?.siteId);
        }

        return resolvedData;
    },
};

import { BLOGS_TEASER_FRAGMENT } from './fragments/blog';
import { PROJECTS_TEASER_FRAGMENT } from './fragments/project';

export const ENTRIES_LIST_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query ENTRIES_LIST_QUERY($type: [String], $siteId: [QueryArgument]) {
            entries(type: $type, siteId: $siteId) {
                ${BLOGS_TEASER_FRAGMENT}
                ${PROJECTS_TEASER_FRAGMENT}
            }
        }
    `,
    resolver: (response) => {
        const returnValue = response?.data || response?.errors || null;

        return returnValue;
    },
};

export const ALL_ENTRIES_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query ENTRIES_QUERY($section: [String]) {
            entries(section: $section) {
                uri
                siteHandle
            }
        }
    `,
    resolver: (response) => {
        const returnValue = response?.data || response?.errors || null;
        const staticPaths = [];

        if (returnValue?.entries) {
            try {
                if (Array.isArray(returnValue?.entries)) {
                    returnValue?.entries?.map((entry) => {
                        staticPaths.push({
                            domain: entry.siteHandle,
                            slug: entry.uri?.split('/'),
                        });
                    });
                }
            } catch (error) {
                console.error('App query resolver error ::: ', error);
            }
        }

        return { ...returnValue, staticPaths };
    },
};

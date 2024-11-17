export const FAVICON_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query FAVICON_QUERY($site: [String], $uri: [String], $slug: [String], $status: [String]) {
            settings: globalSet(site: $site, handle: "siteConfig") {
                ... on siteConfig_GlobalSet {
                    favicon {
                        width
                        height
                        url
                    }
                }
            }
            sites
        }
    `,
    resolver: async (response, variables) => {
        const returnValue = response?.data || response?.errors || null;
        let favicon = null;

        if (Array.isArray(returnValue?.settings?.favicon)) {
            favicon = returnValue?.settings?.favicon?.[0];
        }

        return favicon;
    },
};

export const SITES_QUERY = {
    allowedMethods: ['POST'],
    query: /* GraphQL */ `
        query SITES_QUERY {
            sites
        }
    `,
    resolver: (response) => {
        const returnValue = response?.data || response?.errors || null;
        const staticPaths = [];

        if (returnValue?.sites) {
            try {
                returnValue.sites = JSON.parse(returnValue.sites);

                if (Array.isArray(returnValue?.sites)) {
                    returnValue?.sites?.map((site) => {
                        staticPaths.push({
                            domain: site.handle,
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

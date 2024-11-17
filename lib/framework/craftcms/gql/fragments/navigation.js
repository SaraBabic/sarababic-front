export const LINK_ITEM_FRAGMENT = /* GraphQL */ `
    linkItem {
        ... on internalLink_Entry {
            uid
            typeHandle
            linkLayout
            linktext
            page {
                slug
                uri
                title
                language
            }
        }
        ... on externalLink_Entry {
            linkLayout
            linktext
            uid
            typeHandle
            href
        }
        ... on fileLink_Entry {
            linkLayout
            uid
            linktext
            typeHandle
        }
    }
`;

export const MAIN_NAVIGATION_FRAGMENT = `
    mainNavigation: entries(section:"mainNavigation", level: 1, site: $site) {
        title
        uid
        level
        ... on mainNavigation_Entry {
            ${LINK_ITEM_FRAGMENT}
            children {
                title
                uid
                level
                ... on mainNavigation_Entry {
                    ${LINK_ITEM_FRAGMENT}
                    children {
                        title
                        uid
                        level
                        ... on mainNavigation_Entry {
                            ${LINK_ITEM_FRAGMENT}
                        }
                    }
                }
            }
        }
    }
`;

export const FOOTER_NAVIGATION_FRAGMENT = `
    footerNavigation: entries(section:"footerNavigation", level: 1, site: $site) {
        title
        uid
        level
        ... on footerNavigation_default_Entry {
            ${LINK_ITEM_FRAGMENT}
            children {
                title
                uid
                level
                ... on footerNavigation_default_Entry {
                    ${LINK_ITEM_FRAGMENT}
                }
            }
        }
    }
`;

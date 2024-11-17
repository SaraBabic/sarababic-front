import { PAGE_FRAGMENT } from './page';

export const SITE_CONFIG_FRAGMENT = /* GraphQL */ `
    settings: globalSet(site: $site, handle: "siteConfig") {
        ... on siteConfig_GlobalSet {
            websiteTitle
            contactEmail
            logo: images {
                width
                height
                url
            }
            homepage {
                sectionHandle
                typeHandle
                ${PAGE_FRAGMENT}
            }
        }
    }
`;

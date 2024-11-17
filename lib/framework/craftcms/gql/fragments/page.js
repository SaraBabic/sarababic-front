import { MODULES_FRAGMENT } from './modules';
import { SEO_FRAGMENT } from './seo';

export const PAGE_FRAGMENT = `
    ... on page_Entry {
        id
        uid
        uri
        title
        siteId
        language
        ${MODULES_FRAGMENT}
    }
`;

export const PAGE_META_FRAGMENT = `
    ... on page_Entry {
        ${SEO_FRAGMENT}
    }
`;

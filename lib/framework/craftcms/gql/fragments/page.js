import { MODULES_FRAGMENT } from './modules';
import { SEO_FRAGMENT } from './seo';
import { STAGE_FRAGMENT } from './stage';

export const PAGE_FRAGMENT = `
    ... on page_Entry {
        id
        uid
        uri
        title
        siteId
        language
        ${MODULES_FRAGMENT}
        ${STAGE_FRAGMENT}
    }
`;

export const PAGE_META_FRAGMENT = `
    ... on page_Entry {
        ${SEO_FRAGMENT}
    }
`;

import { MODULES_FRAGMENT } from './modules';
import { SEO_FRAGMENT } from './seo';
import { STAGE_FRAGMENT } from './stage';

export const BLOGS_FRAGMENT = `
    ... on blog_Entry {
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

export const BLOG_META_FRAGMENT = `
    ... on blog_Entry {
        ${SEO_FRAGMENT}
    }
`;
import { IMAGE_FRAGMENT } from './image';
import { MODULES_FRAGMENT } from './modules';
import { SEO_FRAGMENT } from './seo';

export const NEWS_FRAGMENT = `
    ... on news_default_Entry {
        id
        uid
        title
        postDate
        siteId
        language
        stageImage: image {
            ${IMAGE_FRAGMENT}
        }
        stageHeadline: headline
        stageText: textHTMLMinimal
        ${MODULES_FRAGMENT}
    }
`;

export const NEWS_TEASER_FRAGMENT = `
    ... on news_default_Entry {
        id
        uid
        title
        uri
        postDate
        excerpt
        image {
            ${IMAGE_FRAGMENT}
        }
        headline
    }
`;

export const NEWS_META_FRAGMENT = `
    ... on news_default_Entry {
        id
        uid
        uri
        title
        siteId
        language
        siteImage: image {
            ${IMAGE_FRAGMENT}
        }
        siteHeadline: headline
        ${SEO_FRAGMENT}
    }
`;

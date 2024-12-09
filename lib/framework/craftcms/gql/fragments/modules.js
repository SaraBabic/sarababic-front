import { IMAGE_FRAGMENT } from './image';
import { LINK_ITEM_FRAGMENT } from './navigation';

export const BASE_MODULE_FRAGMENT = `
    __typename
    id
    uid
`;

export const MODULE_HEADLINE_FRAGMENT = /* GraphQL */ `
    ... on modules_headline_BlockType {
        content: textPlain
        headlineLevel
    }
`;

export const MODULE_IMAGE_FRAGMENT = /* GraphQL */ `
    ... on modules_image_BlockType {
        ${BASE_MODULE_FRAGMENT}
        image {
            ${IMAGE_FRAGMENT}
        }
    }
`;

export const MODULE_TEXT_IMAGE_FRAGMENT = /* GraphQL */ `
    ... on modules_textImage_BlockType {
        image {
            ${IMAGE_FRAGMENT}
        }
        reverseOrder
        text: textHTML
        link: ${LINK_ITEM_FRAGMENT}
    }
`;

export const MODULE_LINK_FRAGMENT = /* GraphQL */ `
    ... on modules_link_BlockType {
        link: ${LINK_ITEM_FRAGMENT}
    }
`;

export const MODULE_TEXT_FRAGMENT = /* GraphQL */ `
    ... on modules_text_BlockType {
        ${BASE_MODULE_FRAGMENT}
        content: textHTML
    }
`;

export const MODULE_ENTRY_LIST_FRAGMENT = /* GraphQL */ `
    ... on modules_entryList_BlockType {
        ${BASE_MODULE_FRAGMENT}
        entryType
        limit
    }
`;

export const MODULE_INTRO_FRAGMENT = /* GraphQL */ `
    ... on modules_intro_BlockType {
        headline
        content: textHTML
        image {
            ${IMAGE_FRAGMENT}
        }
    }
`;

export const MODULE_TEXT_ICON_FRAGMENT = /* GraphQL */ `
    ... on modules_textIcon_BlockType {
        icon
        title: textPlain
        content: textHTML
    }
`;

export const MODULE_ACCORDION_FRAGMENT = /* GraphQL */ `
    ... on modules_accordion_BlockType {
        ${LINK_ITEM_FRAGMENT}
        items: children {
            uid
            ... on modules_accordionElement_BlockType {
                title: textPlain
                content: textHTML
            }
        }
    }
`;

export const MODULE_CONTACT_FORM_FRAGMENT = /* GraphQL */ `
    ... on modules_contactForm_BlockType {
        ${BASE_MODULE_FRAGMENT}
    }
`;

export const MODULE_MATRIX_FRAGMENT = /* GraphQL */ `
    ... on modules_matrix_BlockType {
        ${BASE_MODULE_FRAGMENT}
        headline: textPlain
    }
`;

export const MODULE_TABS_FRAGMENT = /* GraphQL */ `
    ... on modules_tabs_BlockType {
        items: children {
            uid
            ... on modules_tabElement_BlockType {
                title: textPlain
                modules: children {
                    ${BASE_MODULE_FRAGMENT}
                    ${MODULE_TEXT_FRAGMENT}
                    ... on modules_group_BlockType {
                        columns
                        width
                        children {
                            __typename
                            uid
                            id
                            ${MODULE_TEXT_ICON_FRAGMENT}
                            ${MODULE_CONTACT_FORM_FRAGMENT}
                            ${MODULE_HEADLINE_FRAGMENT}
                            ${MODULE_TEXT_FRAGMENT}
                            ${MODULE_INTRO_FRAGMENT}
                            ${MODULE_IMAGE_FRAGMENT}
                            ${MODULE_TEXT_IMAGE_FRAGMENT}
                            ${MODULE_ACCORDION_FRAGMENT}
                        }
                    }
                }
            }
        }
    }
`;

export const MODULES_LIST_FRAGMENT = /* GraphQL */ `
    ${MODULE_CONTACT_FORM_FRAGMENT}
    ${MODULE_HEADLINE_FRAGMENT}
    ${MODULE_TEXT_FRAGMENT}
    ${MODULE_INTRO_FRAGMENT}
    ${MODULE_IMAGE_FRAGMENT}
    ${MODULE_TEXT_IMAGE_FRAGMENT}
    ${MODULE_ACCORDION_FRAGMENT}
    ${MODULE_TABS_FRAGMENT}
    ${MODULE_ENTRY_LIST_FRAGMENT}
`;

export const GROUP_FRAGMENT = /* GraphQL */ `
    ... on modules_group_BlockType {
        ${BASE_MODULE_FRAGMENT}
        children {
            ${BASE_MODULE_FRAGMENT}
            ${MODULE_TEXT_FRAGMENT}
            ${MODULE_HEADLINE_FRAGMENT}
            ${MODULE_LINK_FRAGMENT}
            ${MODULE_CONTACT_FORM_FRAGMENT}
            ${MODULE_IMAGE_FRAGMENT}
        }
    }
`;

export const COLUMNS_FRAGMENT = /* GraphQL */ `
    ... on modules_columns_BlockType {
        ${BASE_MODULE_FRAGMENT}
        columns
        backgroundColor
        children {
            ${MODULE_TEXT_FRAGMENT}
            ${GROUP_FRAGMENT}
            ${MODULE_IMAGE_FRAGMENT}
            ${MODULE_HEADLINE_FRAGMENT}
        }
    }
`;

export const MODULES_FRAGMENT = /* GraphQL */ `
    modules {
        ${MODULE_TEXT_FRAGMENT}
        ${COLUMNS_FRAGMENT}
        ${GROUP_FRAGMENT}
        ${MODULE_CONTACT_FORM_FRAGMENT}
        ${MODULE_IMAGE_FRAGMENT}
        ${MODULE_HEADLINE_FRAGMENT}
        ${MODULE_ENTRY_LIST_FRAGMENT}
        ${MODULE_MATRIX_FRAGMENT}
    }
`;

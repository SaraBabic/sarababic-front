export const IMAGE_FRAGMENT = `
    uid    
    id
    url
    width
    height
    focalPoint
    dateUpdated
    mimeType
    ... on global_Asset {
        alt: altText
        title: mediaTitle
    }
`;

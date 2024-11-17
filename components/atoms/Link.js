import React from 'react';
import dynamic from 'next/dynamic';

const NAV_ITEM_TYPES = {
    internalLink: dynamic(() => import('@/components/atoms/Link/Page')),
    externalLink: dynamic(() => import('@/components/atoms/Link/Page')),
    anchorLink: dynamic(() => import('@/components/atoms/Link/Anchor')),
};

const Link = ({ linkData }) => {
    const ITEM_COMP = NAV_ITEM_TYPES[linkData?.typeHandle];

    return <>{ITEM_COMP ? <ITEM_COMP {...linkData} /> : null}</>;
};

export default Link;

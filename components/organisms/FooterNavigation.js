'use client';

import AppContext from '@/lib/context/app';
import dynamic from 'next/dynamic';
import React, { Fragment, useContext } from 'react';

const NAV_ITEM_TYPES = {
    internalLink: dynamic(() => import('@/components/atoms/Link/Page')),
    externalLink: dynamic(() => import('@/components/atoms/Link/Page')),
    anchorLink: dynamic(() => import('@/components/atoms/Link/Anchor')),
};

const FooterNavigation = () => {
    const { appState } = useContext(AppContext);

    return (
        <nav className="grid grid-cols-2 gap-8 mr-auto lg:ml-auto lg:mr-0" aria-label="Footer">
            {appState.footerNavigation?.map((item) => {
                const LINK_DATA = item?.linkItem?.[0];
                const ITEM_COMP = NAV_ITEM_TYPES[LINK_DATA?.typeHandle];

                return <Fragment key={item.uid}>{ITEM_COMP ? <ITEM_COMP {...LINK_DATA} /> : null}</Fragment>;
            })}
        </nav>
    );
};

export default FooterNavigation;

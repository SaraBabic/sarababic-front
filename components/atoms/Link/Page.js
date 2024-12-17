'use client';

import React, { useContext } from 'react';

import AppContext from '@/lib/context/app';
import { Link } from 'next-view-transitions';
import { cn } from '@/lib/helpers/classnames';

const Page = ({ linktext, page, href, newWindow, linkLayout = 'default' }) => {
    const { appState } = useContext(AppContext);
    const pageLink = Array.isArray(page) ? page?.[0] : null;
    let linkURL = pageLink?.uri ? `/${pageLink?.uri}/` : href;

    if (pageLink?.uri === appState?.homepageURI) {
        linkURL = appState?.siteBaseURL || '/';
    }

    return (
        <>
            {linkURL ? (
                <Link
                    href={linkURL}
                    target={newWindow ? '_blank' : null}
                    className={cn({
                        'outline-none text-sm font-semibold leading-6 transition-colors underlinan cen': linkLayout === 'default',
                        btn: linkLayout === 'button',
                    })}
                >
                    {linktext || pageLink?.title}
                </Link>
            ) : null}
        </>
    );
};

export default Page;

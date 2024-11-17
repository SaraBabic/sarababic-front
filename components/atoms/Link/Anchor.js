'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppContext from '@/lib/context/app';
import { cn } from '@/lib/helpers/classnames';

const Anchor = ({ anchorId, linktext, page, linkLayout = 'default' }) => {
    const pathname = usePathname();
    const { appState } = useContext(AppContext);
    const pageLink = Array.isArray(page) ? page?.[0] : null;
    let anchorOnCurrentPage = pageLink?.uri ? false : true;
    let href = pageLink?.uri ? `/${pageLink?.uri}/#${anchorId}` : '#';

    // Link points to homepage
    if (pageLink?.uri === appState?.homepageURI) {
        href = `/#${anchorId}`;

        // If we are on the homepage
        if (pathname === '/') {
            href = '#';
            anchorOnCurrentPage = true;
        }
    }

    if (pathname === pageLink?.uri) {
        anchorOnCurrentPage = true;
        href = `#`;
    }

    const scrollIntoView = (target) => {
        const targetNode = document.getElementById(target);

        if (targetNode) {
            targetNode.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    const handleLinkClick = (event) => {
        event.preventDefault();
        scrollIntoView(anchorId);
    };

    return (
        <>
            {href ? (
                <Link
                    href={href}
                    onClick={anchorOnCurrentPage ? handleLinkClick : null}
                    className={cn({
                        'outline-none text-sm font-semibold leading-6 hover:text-black transition-colors text-gray-900': linkLayout === 'default',
                        btn: linkLayout === 'button',
                    })}
                >
                    {linktext || pageLink?.title}
                </Link>
            ) : null}
        </>
    );
};

export default Anchor;

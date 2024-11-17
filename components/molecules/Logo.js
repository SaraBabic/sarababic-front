'use client';

import React, { useContext, useEffect, useRef } from 'react';
import { Link } from 'next-view-transitions';
import AppContext from '@/lib/context/app';
import { cn } from '@/lib/helpers/classnames';

const Logo = ({ animated = false, size }) => {
    const { appState } = useContext(AppContext);
    const logoRef = useRef();
    const logoSize = size || appState?.appData?.settings?.logoSize || 'default';

    const animateLogo = () => {
        const targetNode = document.getElementById('header');

        if (targetNode) {
            if (window.scrollY >= 50) {
                if (!targetNode.classList.contains('is-scrolled')) {
                    targetNode.classList.add('is-scrolled');
                }
            } else if (targetNode.classList.contains('is-scrolled')) {
                targetNode.classList.remove('is-scrolled');
            }
        }
    };

    useEffect(() => {
        if (animated) {
            document.getElementById('header').dataset.size = logoSize;
            animateLogo();
            window.addEventListener('scroll', animateLogo, { passive: true });
        }

        return () => {
            if (animated) {
                window.removeEventListener('scroll', animateLogo);
            }
        };
    }, []);

    return (
        <Link href={appState?.siteBaseURL || '/'}>
            <img
                id="logo"
                ref={logoRef}
                className={cn('w-auto transition-transform origin-bottom-left duration-300', {
                    'h-6': logoSize === 'xs',
                    'h-10': logoSize === 'sm',
                    'h-14': logoSize === 'default',
                    'h-20': logoSize === 'lg',
                    'h-24': logoSize === 'xl',
                })}
                src={appState?.appData?.settings?.logo?.url}
                alt=""
            />
        </Link>
    );
};

export default Logo;

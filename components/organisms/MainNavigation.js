'use client';

import AppContext from '@/lib/context/app';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/helpers/classnames';
import Link from '../atoms/Link';
import Icon from '../atoms/Icon';
import Logo from '../molecules/Logo';

const MainNavigationItem = ({ item, currentSection, onClick }) => {
    const linkData = item?.linkItem?.[0];

    return (
        <div
            className={cn(
                'relative mt-4 lg:mt-0 after:hidden lg:after:block after:h-1 after:transition-all after:bg-black after:left-0 after:absolute after:-bottom-2 after:w-full',
                {
                    'after:opacity-0 after:invisible': linkData?.anchorId !== currentSection,
                    'after:visible after:opacity-100': linkData?.anchorId === currentSection,
                }
            )}
            onClick={onClick}
        >
            {linkData ? <Link linkData={linkData} /> : null}
        </div>
    );
};

const MainNavigation = () => {
    const { appState } = useContext(AppContext);
    const [currentSection, setCurrentSection] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const currentSectionRef = useRef();

    const toggleMenu = () => {
        setShowNav(!showNav);
    };

    function isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemHeight = rect.height;
        const elemBottom = rect.bottom;
        // Marker for scroll = center of the screen
        const inViewMarker = window.innerHeight / 2;

        // Only completely visible elements return true:
        // Element top has reached the marker
        const isVisible = elemTop < inViewMarker && elemBottom >= 0;
        // const percentageVisible = ((window.innerHeight - elemTop) * 100) / elemHeight;
        // const percentage = percentageVisible < 0 ? 0 : percentageVisible > 100 ? 100 : percentageVisible;

        if (isVisible) {
            return true;
        }

        return false;
    }

    const checkIfInView = () => {
        const sections = document.querySelectorAll('section[data-anchor]');

        const inViewSections = [...sections]?.filter((section) => {
            if (isScrolledIntoView(section)) {
                return section;
            }
        });

        if (inViewSections?.length) {
            setCurrentSection(inViewSections[inViewSections.length - 1]?.id);
        } else {
            setCurrentSection(null);
        }
    };

    useEffect(() => {
        checkIfInView();
        window.addEventListener('scroll', checkIfInView, { passive: true });

        return () => {
            window.removeEventListener('scroll', checkIfInView);
        };
    }, []);

    useEffect(() => {
        currentSectionRef.current = currentSection;
    }, [currentSection]);

    return (
        <>
            <nav
                className={cn(
                    'fixed z-10 right-full top-0 h-screen overflow-auto lg:overflow-visible w-screen lg:z-0 px-8 py-8 lg:p-0 lg:w-auto lg:h-auto lg:right-auto lg:top-auto bg-background lg:relative lg:flex lg:gap-x-12 transition-transform duration-300',
                    {
                        'translate-x-full lg:translate-x-0': showNav,
                    }
                )}
                aria-label="Main"
                id="main-navigation"
            >
                <div className="lg:hidden mb-8 flex items-center justify-between gap-x-4">
                    <Logo size="sm" />
                    <button onClick={toggleMenu} className="block transition-all hover:text-black">
                        <Icon iconName="XMarkIcon" width={32} height={32} />
                    </button>
                </div>
                {appState.mainNavigation?.map((item) => (
                    <MainNavigationItem key={item.uid} onClick={toggleMenu} currentSection={currentSection} item={item} />
                ))}
            </nav>
            <button type="button" onClick={toggleMenu} className="lg:hidden block transition-all hover:text-black" id="menu-open">
                <Icon iconName="Bars3Icon" width={32} height={32} />
            </button>
        </>
    );
};

export default MainNavigation;

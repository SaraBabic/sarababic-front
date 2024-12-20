'use client';

import AppContext from '@/lib/context/app';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/helpers/classnames';
import Link from '../../atoms/Link';
import Icon from '../../atoms/Icon';
import Logo from '../../molecules/Logo';
import styles from './mainNavigation.module.scss';
import { Squash as Hamburger } from 'hamburger-react';
import { usePathname } from 'next/navigation';
import Container from '../Layout/Container';

const MainNavigationItem = ({ item, currentSection, onClick, depth = 0 }) => {
    const linkData = item?.linkItem?.[0];
    const linkProps = item.title === 'Home' ? { id: item.title } : {};
    const isHome = item.title === 'Home';
    const pathname = usePathname();
    const normalizedPathname = pathname.startsWith('/') ? pathname.slice(1) : pathname;

    const isActiveParent = isHome ? normalizedPathname === '' : linkData?.page?.[0]?.uri && normalizedPathname === linkData.page[0].uri;

    const isActiveChild = item?.children?.some((child) => {
        const childLinkData = child?.linkItem?.[0];
        return childLinkData?.page?.[0]?.uri && normalizedPathname === childLinkData.page[0].uri;
    });

    const isActive = isActiveParent || isActiveChild;

    const [isChildrenOpen, setIsChildrenOpen] = useState(false);
    const submenuRef = useRef(null);

    const toggleChildren = () => {
        setIsChildrenOpen(!isChildrenOpen);
    };

    const closeChildren = () => {
        setIsChildrenOpen(false);
    };

    const handleClickOutside = (event) => {
        if (submenuRef.current && !submenuRef.current.contains(event.target)) {
            closeChildren();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const renderChildren = (children, depth) => {
        return children.map((child) => {
            const childLinkData = child?.linkItem?.[0];
            const hasChildren = child?.children?.length > 0;

            const isChildActive = childLinkData?.page?.[0]?.uri && normalizedPathname === childLinkData.page[0].uri;

            return (
                <li key={child.uid} className={cn(`pl-${depth * 4} hover:bg-gray-100`, { activeMenuItem: isChildActive })}>
                    {hasChildren ? (
                        <>
                            <Link linkData={childLinkData} className="flex items-center" onClick={closeChildren}>
                                {child.title}
                            </Link>
                            {isChildrenOpen && child.children.length > 0 && <ul className={`level-${depth + 1} pl-4 my-[4px]`}>{renderChildren(child.children, depth + 1)}</ul>}
                        </>
                    ) : (
                        <Link linkData={childLinkData} className="flex items-center" onClick={closeChildren}>
                            {child.title}
                        </Link>
                    )}
                </li>
            );
        });
    };

    return (
        <div
            ref={submenuRef}
            className={cn('mt-4 lg:mt-0 group parentLink', {
                'text-primary activeMenuItem': isActive,
                [styles.Home]: isHome,
                [`depth-${depth}`]: depth,
            })}
            {...linkProps}
        >
            {linkData ? (
                <>
                    {item?.children?.length > 0 ? (
                        <div className="flex flex-col">
                            <div className="flex items-center cursor-pointer" onClick={toggleChildren}>
                                <span className="flex items-center">{item.title}</span>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`ml-2 transform transition-transform ${isChildrenOpen ? 'rotate-180' : ''}`}
                                >
                                    <path d="M8 11.2666L4 7.26665L4.78883 6.47781L8 9.68881L11.2112 6.47781L12 7.26665L8 11.2666Z" />
                                </svg>
                            </div>

                            <div
                                className={cn('lg:bg-white lg:shadow-md', styles.childrenContainer, {
                                    [styles.childrenContainerOpen]: isChildrenOpen,
                                })}
                            >
                                <Container className="pl-[--22px] lg:pl-[22px] bg-white">
                                    <div className="flex justify-between items-end">
                                        <div className="lg:py-[38px]">
                                            <ul className="childrens mt-4 lg:mt-0 flex flex-col gap-[16px]">{renderChildren(item.children, 1)}</ul>
                                        </div>
                                        <img src="/icons/finger.svg" alt="finger" className="hidden lg:block w-[300px]" />
                                    </div>
                                </Container>
                            </div>
                        </div>
                    ) : (
                        <Link linkData={linkData} />
                    )}
                </>
            ) : null}
        </div>
    );
};

const MainNavigation = () => {
    const { appState } = useContext(AppContext);
    const [currentSection, setCurrentSection] = useState(null);
    const [showNav, setShowNav] = useState(false);
    const currentSectionRef = useRef();
    const [isOpen, setOpen] = useState(false);

    const toggleMenu = () => {
        const newShowNav = !showNav;
        setShowNav(newShowNav);

        if (newShowNav) {
            document.body.classList.add('navOpened');
        } else {
            document.body.classList.remove('navOpened');
        }
    };

    function isScrolledIntoView(el) {
        const rect = el.getBoundingClientRect();
        const elemTop = rect.top;
        const elemHeight = rect.height;
        const elemBottom = rect.bottom;
        const inViewMarker = window.innerHeight / 2;

        const isVisible = elemTop < inViewMarker && elemBottom >= 0;

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
            {showNav && <div className="fixed inset-0 bg-brandBlue opacity-50 transition-opacity duration-300 lg:hidden"></div>}

            <nav
                className={cn(
                    'fixed  right-full md:right-[-50%] md:w-1/2 top-0 items-center h-screen overflow-auto bg-grey lg:bg-white md:overflow-visible w-screen px-8 py-8 lg:p-0 lg:w-auto lg:h-auto lg:min-h-[90px] lg:right-auto lg:top-auto bg-background lg:static lg:flex gap-x-8 xl:gap-x-12 transition-transform duration-300 maxNav:bg-grey',
                    {
                        'translate-x-full md:translate-x-[-100%] lg:translate-x-0 transition-transform': showNav,
                    }
                )}
                aria-label="Main"
                id="main-navigation"
            >
                <div className="lg:hidden mb-8 flex items-center justify-between gap-x-4">
                    <Logo size="sm" />
                    <button onClick={toggleMenu} className="block transition-all hover:text-brandBlue">
                        <Icon iconName="XMarkIcon" width={32} height={32} />
                    </button>
                </div>
                {appState.mainNavigation?.map((item) => (
                    <MainNavigationItem key={item.uid} onClick={toggleMenu} currentSection={currentSection} item={item} />
                ))}
            </nav>
            <div className=" lg:hidden flex items-center justify-between">
                <button type="button" onClick={toggleMenu} className=" lg:hidden block transition-all hover:text-primary" id="menu-toggle">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </button>
            </div>
        </>
    );
};

export default MainNavigation;

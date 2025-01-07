'use client';

import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';
import { animate } from 'motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const AccordionItem = ({ uid, headline, text, activeItems, setActiveItems, currentlyActive, allExpandable = true }) => {
    const itemContentRef = useRef();
    const itemContentWrapperRef = useRef();
    const currentlyActiveRef = useRef();

    useEffect(() => {
        currentlyActiveRef.current = currentlyActive;

        if (itemContentWrapperRef.current) {
            if (currentlyActive) {
                animate(itemContentWrapperRef.current, { height: `${itemContentRef.current.clientHeight}px` });
            } else {
                animate(itemContentWrapperRef.current, { height: 0 });
            }
        }
    }, [currentlyActive]);

    useEffect(() => {
        const resizeListener = () => {
            // Change height from the state object, use ref, because state is not available inside addEventListener
            if (currentlyActiveRef.current) {
                animate(itemContentWrapperRef.current, { height: `${itemContentRef.current.clientHeight}px` });
            }
        };
        // set resize listener
        window.addEventListener('resize', resizeListener);

        // clean up function
        return () => {
            // remove resize listener
            window.removeEventListener('resize', resizeListener);
        };
    }, []);

    return (
        <div className={` rounded-md p-[14px_22px_22px_22px] ${currentlyActive ? 'bg-primary-50 text-primary' : 'bg-primary-50 text-seeViolet'}`}>
            <dt>
                <button
                    className={`flex w-full items-start gap-[16px] text-left hover:text-primary transition-colors cursor-pointer hover:text-brandGreen ${
                        currentlyActive ? 'text-waterBlue' : ''
                    }`}
                    type="button"
                    onClick={() => {
                        if (currentlyActive) {
                            if (allExpandable) {
                                const newItems = activeItems;
                                const itemIndex = newItems.indexOf(uid);

                                newItems.splice(itemIndex, 1);

                                setActiveItems([...newItems]);
                            } else {
                                setActiveItems(null);
                            }
                        } else if (allExpandable) {
                            setActiveItems([...activeItems, uid]);
                        } else {
                            setActiveItems(uid);
                        }
                    }}
                >
                    <span
                        className={classNames(' flex h-7 items-center flex-shrink-0 transition-transform', {
                            'rotate-180': currentlyActive,
                        })}
                    >
                        {currentlyActive ? <ChevronDownIcon className="h-6 w-6" aria-hidden="true" /> : <ChevronDownIcon className="h-6 w-6" aria-hidden="true" />}
                    </span>
                    {headline ? <span className={`text-base leading-7 font-[700] text-[22px] orbiton`}>{headline}</span> : null}
                </button>
            </dt>
            {text ? (
                <dd className="overflow-hidden h-0" ref={itemContentWrapperRef}>
                    <div className="p-[8px_22px_22px_42px] text-[16px] leading-7 " ref={itemContentRef} dangerouslySetInnerHTML={{ __html: text }} />
                </dd>
            ) : null}
        </div>
    );
};

export default AccordionItem;

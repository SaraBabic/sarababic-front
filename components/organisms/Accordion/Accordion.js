'use client'

import React, { useState } from 'react';
import AccordionItem from './AccordionItem';
import Container from '../Layout/Container';

const Accordion = ({ __typename, items, allExpandable = true }) => {
    const defaultActiveItems = items?.reduce(function (previous, current) {
        if (current?.isActive) {
            previous.push(current?.uid);
        }

        return previous;
    }, []);
    const allExpandableInitialValue = defaultActiveItems || [];
    const notAllExpandableInitialValue = defaultActiveItems?.[0] || null;
    const [activeItems, setActiveItems] = useState(allExpandable ? allExpandableInitialValue : notAllExpandableInitialValue);


    const checkIfActive = (item) => {
        return allExpandable ? activeItems?.includes(item.uid) : activeItems === item?.uid;
    };

    return (
        <Container width='medium'>
            <dl className="space-y-6">
                {items?.map((item) => {
                    return (
                        <AccordionItem
                            allExpandable={allExpandable}
                            activeItems={activeItems}
                            currentlyActive={checkIfActive(item)}
                            setActiveItems={setActiveItems}
                            key={item?.uid}
                            {...item}
                        />
                    );
                })}
            </dl>
        </Container>
    );
};

export default Accordion;

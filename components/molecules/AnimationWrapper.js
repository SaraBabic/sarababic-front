'use client';

import React, { useEffect, useRef } from 'react';
import { animate, scroll } from 'motion';

const AnimationWrapper = ({ children }) => {
    const contentRef = useRef();

    useEffect(() => {
        scroll(animate(contentRef.current, { opacity: [0, 1], y: ['-2rem', 0] }), {
            target: contentRef.current,
            offset: ['0 end', '250px end'],
        });
    }, []);

    return (
        <div className="opacity-0 transition-opacity" ref={contentRef}>
            {children}
        </div>
    );
};

export default AnimationWrapper;

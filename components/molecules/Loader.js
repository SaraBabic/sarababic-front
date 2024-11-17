'use client';

import React from 'react';
import { cn } from '@/lib/helpers/classnames';

const Loader = ({ show, overlay = false, text, size = 'default', color = 'background' }) => {
    return (
        <div
            className={cn('flex flex-col justify-center items-center transition-opacity duration-300', {
                'invisible opacity-0': !show,
                'w-5 h-5': size === 'xs',
                'w-8 h-8': size === 'sm',
                'w-16 h-16': size === 'default',
                'bg-white bg-opacity-90 z-local items-center absolute left-0 right-0 top-0 bottom-0': overlay,
            })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 38 38"
                className={cn('w-full h-full', {
                    'stroke-black': color === 'background',
                    'stroke-white': color === 'foreground',
                })}
            >
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)" strokeWidth="2">
                        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                        <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                        </path>
                    </g>
                </g>
            </svg>
            {text && <span className="mt-2">{text}</span>}
        </div>
    );
};

export default Loader;

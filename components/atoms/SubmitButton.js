import React, { useEffect, useRef } from 'react';
import Loader from '../molecules/Loader';
import Icon from './Icon';
import { animate, timeline } from 'motion';

const SubmitButton = ({ status, text, successText, errorText }) => {
    const wrapperRef = useRef();
    const initRef = useRef();
    const errorRef = useRef();
    const loaderRef = useRef();
    const successRef = useRef();

    const triggerAnimation = async (status) => {
        // Get value for first animation
        if (status === null) {
            animate(wrapperRef?.current, { width: `${initRef.current.clientWidth}px` });
        } else {
            // Reset to default state
            const sequence = [
                [initRef?.current, { opacity: 0, height: 0, position: 'absolute' }, { duration: 0 }],
                [loaderRef?.current, { opacity: 0, height: 0, position: 'absolute' }, { duration: 0 }],
                [successRef?.current, { opacity: 0, height: 0, position: 'absolute' }, { duration: 0 }],
                [errorRef?.current, { opacity: 0, height: 0, position: 'absolute' }, { duration: 0 }],
            ];

            if (status === 'init') {
                sequence.push([wrapperRef?.current, { width: `${initRef.current.clientWidth}px` }], [initRef?.current, { height: 'auto', position: 'relative', opacity: 1 }]);
            } else if (status === 'pending') {
                sequence.push([wrapperRef?.current, { width: `${loaderRef.current.clientWidth}px` }], [loaderRef?.current, { height: 'auto', position: 'relative', opacity: 1 }]);
            } else if (status === 'success') {
                sequence.push([wrapperRef?.current, { width: `${successRef.current.clientWidth}px` }], [successRef?.current, { height: 'auto', position: 'relative', opacity: 1 }]);
            } else if (status === 'error') {
                sequence.push([wrapperRef?.current, { width: `${errorRef.current.clientWidth}px` }], [errorRef?.current, { height: 'auto', position: 'relative', opacity: 1 }]);
            }

            timeline(sequence);
        }
    };

    useEffect(() => {
        triggerAnimation(status);
    }, [status]);

    return (
        <span ref={wrapperRef} className="block">
            <span ref={loaderRef} className="block absolute h-0 overflow-hidden">
                <Loader show size="xs" color="foreground" />
            </span>

            <span ref={successRef} className="flex gap-2 absolute h-0 overflow-hidden">
                <Icon iconName="CheckIcon" width={20} height={20} />
                {successText}
            </span>

            <span ref={errorRef} className="flex gap-2 absolute h-0 overflow-hidden">
                <Icon iconName="ExclamationTriangleIcon" width={20} height={20} />
                {errorText}
            </span>

            <span ref={initRef} className="block overflow-hidden">
                {text}
            </span>
        </span>
    );
};

export default SubmitButton;

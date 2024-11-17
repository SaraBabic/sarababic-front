'use client';

import React, { useEffect, useRef, useState } from 'react';
import NextImage from 'next/image';
import cn from 'classnames';
import { inView, animate } from 'motion';

const Image = ({
    focalPoint,
    layout = 'responsive',
    loading = 'lazy',
    alt,
    url,
    showCaption,
    maxSize,
    width,
    height,
    dateUpdated,
    mimeType,
    animation = false,
    className,
    ...rest
}) => {
    const [ready, setReady] = useState(false);
    const imageRef = useRef();
    const props = {};
    let imageSrc = url;

    if (layout !== 'fill') {
        props.width = width;
        props.height = height;
    }

    /**
     * Handle fade in
     * @param {*} event
     */
    const getObjectPosition = () => {
        if (focalPoint?.length) {
            return `${100 * focalPoint?.[0]}% ${100 * focalPoint?.[1]}%`;
        }

        return '50% 50%';
    };

    const objectPosition = layout === 'fill' ? getObjectPosition() : null;
    const objectFit = layout === 'fill' ? 'cover' : null;

    /**
     * Handle fade in
     * @param {*} event
     */
    const handleLoad = (event) => {
        event.persist();
        if (mimeType === 'image/svg+xml' || event.target.srcset) {
            setReady(true);
        }

        if (animation && loading === 'lazy' && imageRef?.current) {
            inView(imageRef.current, ({ target }) => {
                animate(target, { scale: [1.2, 1] }, { delay: 0.2, duration: 1, easing: [0.17, 0.55, 0.55, 1] });
            });

            // scroll(animate(imageRef.current, { scale: [1, 1.2] }), {
            //     target: imageRef.current,
            // });
        }
    };

    // Kill the image cache in production by adding a version parameter
    if (dateUpdated && new Date(dateUpdated) instanceof Date) {
        imageSrc = `${imageSrc}?v=${new Date(dateUpdated).getTime()}`;
    }

    useEffect(() => {
        if (loading === 'eager' && imageRef?.current) {
            animate(imageRef.current, { scale: [1.25, 1] }, { duration: 1, easing: [0.17, 0.55, 0.55, 1] });
        }
    }, []);

    return (
        <>
            {imageSrc ? (
                <div
                    className={cn('w-full transition-opacity duration-1000', {
                        'opacity-0': !ready && loading === 'lazy',
                    })}
                >
                    {mimeType === 'image/svg+xml' ? (
                        <img src={imageSrc} onLoad={handleLoad} loading={loading} alt={alt || ''} />
                    ) : (
                        <NextImage
                            ref={imageRef}
                            src={imageSrc}
                            alt={alt || ''}
                            fill={layout === 'fill'}
                            onLoad={handleLoad}
                            style={{ objectPosition: objectPosition, objectFit: objectFit }}
                            className={cn('mx-auto', className, {
                                'scale-125 origin-center': loading === 'eager',
                            })}
                            loading={loading}
                            {...props}
                            {...rest}
                        />
                    )}
                </div>
            ) : null}
        </>
    );
};

export default Image;

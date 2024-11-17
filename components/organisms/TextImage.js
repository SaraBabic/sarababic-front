import React from 'react';
import Image from '../molecules/Image';
import Link from '../atoms/Link';
import { cn } from '@/lib/helpers/classnames';

const TextImage = ({ image, text, reverseOrder, link }) => {
    return (
        <div className="relative">
            <div
                className={cn('mx-auto flex flex-col lg:flex-row lg:justify-between xl:justify-end gap-12', {
                    'lg:flex-row-reverse': reverseOrder,
                })}
            >
                {image ? (
                    <div className="lg:flex w-full lg:w-1/2 lg:shrink lg:grow-0">
                        <div className="relative aspect-[16/9] lg:min-h-[30rem] lg:aspect-auto lg:-ml-8 lg:h-auto w-full lg:grow xl:ml-0 rounded-md overflow-hidden">
                            <Image {...image} layout="fill" animation />
                        </div>
                    </div>
                ) : null}
                <div className="lg:px-6 w-full lg:w-1/2">
                    <div className="mx-auto lg:mr-0 lg:w-full lg:flex-none editor-text" dangerouslySetInnerHTML={{ __html: text }} />
                    {link?.[0] ? (
                        <div className="mt-12">
                            <Link linkData={link?.[0]} />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default TextImage;

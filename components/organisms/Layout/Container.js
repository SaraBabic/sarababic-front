import React from 'react';
import cn from 'classnames';

const Container = ({ width = 'default', padding = 'md', className, children, inset = false }) => {
    return (
        <div
            className={cn('container mx-auto w-full px-8', className, {
                'max-w-2xl lg:max-w-4xl': width === 'default',
            })}
        >
            {children}
        </div>
    );
};

export default Container;

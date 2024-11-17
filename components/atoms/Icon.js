import React from 'react';
import dynamic from 'next/dynamic';

const ICONS = {};

const Icon = ({ iconName, width = 24, height = 24, ...rest }) => {
    const IconComp = ICONS[iconName];

    return <>{IconComp ? <IconComp width={width} height={height} {...rest} /> : null}</>;
};

export default Icon;

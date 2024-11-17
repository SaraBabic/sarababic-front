import React from 'react';
import { cn } from '@/lib/helpers/classnames';

const Headline = ({ content, headlineLevel, className }) => {
    const Tag = headlineLevel ? `h${headlineLevel}` : 'div';
    return <>{content ? <Tag className={cn(className)} dangerouslySetInnerHTML={{ __html: content?.replace('\n', '<br/>') }}></Tag> : null}</>;
};

export default Headline;

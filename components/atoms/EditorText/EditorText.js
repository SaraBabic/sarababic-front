import React from 'react';
import { cn } from '@/lib/helpers/classnames';
import Balancer from 'react-wrap-balancer';

import editorStyles from './editor-text.module.scss';

const EditorText = ({ content, className }) => {
    return (
        <>
            {content ? (
                <div className={cn(editorStyles['editor-text'], className)}>
                    <Balancer dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            ) : null}
        </>
    );
};

export default EditorText;

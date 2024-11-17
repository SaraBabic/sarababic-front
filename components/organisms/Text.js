import React from 'react';
import ConditionalWrapper from '@/components/organisms/Layout/ConditionalWrapper';
import Container from '@/components/organisms/Layout/Container';
import EditorText from '@/components/atoms/EditorText/EditorText';

const Text = ({ content, container = true }) => {
    return (
        <>
            {content ? (
                <ConditionalWrapper condition={container} wrapper={(children) => <Container>{children}</Container>}>
                    <EditorText content={content} />
                </ConditionalWrapper>
            ) : null}
        </>
    );
};

export default Text;

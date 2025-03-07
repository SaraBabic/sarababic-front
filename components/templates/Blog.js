import React from 'react';
import Stage from '../organisms/Stage/Stage';
import Container from '../organisms/Layout/Container';

const Blog = ({ entry, children }) => {
    const { stageImage, stageText, stageHeadline, title } = entry;

    return (
        <>
            {stageImage || stageText || stageHeadline ? <Stage stageImage={stageImage} stageText={stageText} stageHeadline={stageHeadline || title} /> : null}
            {children}
        </>
    );
};

export default Blog;

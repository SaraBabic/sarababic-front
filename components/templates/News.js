import React from 'react';
import Stage from '../organisms/Stage';

const News = ({ entry, children }) => {
    const { stageImage, stageText, stageHeadline, postDate, title } = entry;
    const date = postDate ? new Date(postDate) : null;
    const skyline = `News${
        date
            ? ` | ${date?.toLocaleDateString('de-DE', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
              })}`
            : null
    }`;

    return (
        <>
            {stageImage || stageText || stageHeadline ? <Stage skyline={skyline} stageImage={stageImage} stageText={stageText} stageHeadline={stageHeadline || title} /> : null}
            {children}
        </>
    );
};

export default News;

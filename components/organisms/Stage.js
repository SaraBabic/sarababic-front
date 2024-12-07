import React from 'react';
import Image from '../molecules/Image';
import EditorText from '../atoms/EditorText/EditorText';
import Headline from '../atoms/Headline';

const Stage = ({ stageImage, stageText, stageHeadline, skyline }) => {
    return (
        <div className="h-[80vh] w-full relative">
            {stageImage ? <Image animation {...stageImage} className="ml-0 mr-0 w-full object-cover h-max-[80vh] h-[revert-layer]" /> : null}
            <div className="absolute top-1/2 -translate-y-1/2 bg-white">
                <div className="container mx-auto xl:w-full xl:max-w-full xl:m-0 xl:p-0">
                    {skyline ? <div className="mb-4">{skyline}</div> : null}
                    {stageHeadline ? <Headline content={stageHeadline} headlineLevel={1} /> : null}
                    {stageText ? <EditorText className="mt-6" content={stageText} /> : null}
                </div>
            </div>
        </div>
    );
};

export default Stage;

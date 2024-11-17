import React from 'react';
import Image from '../molecules/Image';
import EditorText from '../atoms/EditorText/EditorText';
import Headline from '../atoms/Headline';

const Stage = ({ stageImage, stageText, stageHeadline, skyline }) => {
    return (
        <div className="flex flex-col-reverse xl:flex-row xl:min-h-[30rem]">
            <div className="bg-black text-white flex items-center w-full xl:w-[45%] flex-shrink-0 xl:pr-8 py-12 xl:py-20 2xl:py-28 xl:inset-container">
                <div className="container mx-auto xl:w-full xl:max-w-full xl:m-0 xl:p-0">
                    {skyline ? <div className="mb-4">{skyline}</div> : null}
                    {stageHeadline ? <Headline content={stageHeadline} headlineLevel={1} /> : null}
                    {stageText ? <EditorText className="mt-6" content={stageText} /> : null}
                </div>
            </div>
            {Array.isArray(stageImage) && stageImage?.length ? (
                <div className="relative w-full aspect-[2/1] md:aspect-[3/1] xl:aspect-auto overflow-hidden">
                    <Image animation {...stageImage?.[0]} loading="eager" className="min-h-[17rem]" layout="fill" />
                </div>
            ) : null}
        </div>
    );
};

export default Stage;

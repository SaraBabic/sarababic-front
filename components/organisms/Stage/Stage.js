import React from 'react';
import Image from '../../molecules/Image';
import EditorText from '../../atoms/EditorText/EditorText';
import Headline from '../../atoms/Headline';
import style from './stage.module.scss';
import MatrixAnimation from '../Animation/MatrixAnimation';

const Stage = ({ stageImage, stageText, stageHeadline, skyline }) => {
    return (
        <>
            <MatrixAnimation />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-white z-20 text-center">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="container mx-auto ">
                        {skyline ? <div className="mb-4">{skyline}</div> : null}
                        {stageHeadline ? <Headline content={stageHeadline} headlineLevel={1} /> : null}
                        {stageText ? <EditorText className="mt-6" content={stageText} /> : null}
                    </div>
                    {stageImage ? (
                        <div className={`${style.stage} `}>
                            <Image animation {...stageImage} loading="eager" className=" w-auto rounded-[50%] shadow-lg" layout="fill" />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
};

export default Stage;

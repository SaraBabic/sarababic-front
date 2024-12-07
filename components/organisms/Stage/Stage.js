import React from 'react';
import Image from '../../molecules/Image';
import EditorText from '../../atoms/EditorText/EditorText';
import Headline from '../../atoms/Headline';
import style from './stage.module.scss';

const Stage = ({ stageImage, stageText, stageHeadline, skyline }) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let randomArray = [];
    for (let i = 0; i < 50; i++) {
        randomArray.push(getRandomInt(2));
    }
    return (
        <>
            <div className=" relative flex flex-col-reverse xl:flex-row xl:min-h-[70vh] bg-black">
                <div className="absolute text-white z-20 bottom-8">
                    <div className="container mx-auto ">
                        {skyline ? <div className="mb-4">{skyline}</div> : null}
                        {stageHeadline ? <Headline content={stageHeadline} headlineLevel={1} /> : null}
                        {stageText ? <EditorText className="mt-6" content={stageText} /> : null}
                    </div>
                </div>
                {stageImage ? (
                    <div className={` w-full aspect-[7/10] md:aspect-[6/4] xl:aspect-auto overflow-hidden ${style.polygon}`}>
                        <Image animation {...stageImage} loading="eager" className="min-h-[17rem]" layout="fill" />
                    </div>
                ) : null}
            </div>
            <div className={style.marquee}>
                <div className={style.marqueeInner}>
                    {randomArray?.map((item, index) => (
                        <div>{item}</div>
                    ))}
                    {randomArray?.map((item, index) => (
                        <div>{item}</div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Stage;

import React from 'react';
import style from './animation.module.scss';

const BitLine = ({}) => {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    let randomArray = [];
    for (let i = 0; i < 50; i++) {
        randomArray.push(getRandomInt(2));
    }
    return (
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
    );
};

export default BitLine;

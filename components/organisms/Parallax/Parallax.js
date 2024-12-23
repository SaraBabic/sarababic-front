import React from 'react';
import styles from './parallax.module.scss';

const Parallax = ({ headline, image }) => {
    return (
        <div className={`${styles.parallax} relative`} style={{ backgroundImage: `url(${image[0].url})` }}>
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-primary z-20 text-center">{headline}</h1>
        </div>
    );
};

export default Parallax;

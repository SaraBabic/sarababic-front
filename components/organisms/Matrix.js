'use client';

import React, { useEffect } from 'react';
import MatrixAnimation from './Animation/MatrixAnimation';

const Matrix = ({ headline }) => {
    return (
        <div>
            <MatrixAnimation />
            <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-white z-20 text-center">{headline}</h1>
        </div>
    );
};

export default Matrix;

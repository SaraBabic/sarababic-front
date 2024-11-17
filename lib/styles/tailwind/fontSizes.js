/*
 * Tailwind Font Size Settings
 * https://davidhellmann.com/blog/development/tailwindcss-fluid-typography-with-css-clamp
 */
const constants = require('../constants');
const screenMin = constants.screenMin;
const screenMax = constants.screenMax;
const baseFontSize = constants.baseFontSize;

// Calc Min and Max Fontsize
const pxToREM = (size, base = baseFontSize) => {
    return `${size / base}rem`;
};

// build the clamp property
const fluidFontSize = (minFontSize = 0, maxFontSize = null) => {
    const min = pxToREM(minFontSize);
    const max = pxToREM(maxFontSize);
    const value = `calc(${pxToREM(minFontSize)} + ${maxFontSize - minFontSize} * ((100vw - ${screenMin}px) / (${screenMax} - ${screenMin})))`;

    return `clamp(${min}, ${value}, ${max})`;
};

// TODO Use util/fluid.js here fluid('font-size', 55, 100);

module.exports = {
    h1: fluidFontSize(32, 56),
    h2: fluidFontSize(24, 40),
    h3: fluidFontSize(18, 28),
    h4: fluidFontSize(18, 20),
    h5: fluidFontSize(18, 20),
    h6: fluidFontSize(16, 16),
    headlineMedium: fluidFontSize(38, 50),
    copyXL: fluidFontSize(16, 20),
    copy: fluidFontSize(16, 18),
    caption: fluidFontSize(16, 16),
    overline: fluidFontSize(16, 16),
    label: fluidFontSize(14, 14),
    hidden: 0,
};

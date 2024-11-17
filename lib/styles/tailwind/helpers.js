/**
 * Fluid scaling for properties between window widths
 *
 * @param {number} $prop - property name
 * @param {number} $minValue - min value in pixel
 * @param {number} $maxValue - max value in pixel
 *
 */
const propFluid = (prop, minValue, maxValue, minVW = 320, maxVW = 1920) => {
    return `
        ${minValue}px;

        @media screen and (min-width: ${minVW}px) {
            ${prop}: calc(${minValue}px + ${maxValue - minValue} * ((calc(100vw - ${minVW}px)) / ${maxVW - minVW}));
        }

        @media screen and (-webkit-min-device-pixel-ratio: 2), screen and (min-resolution: 192dpi), screen and (min-resolution: 2dppx) {
            ${prop}: calc(${minValue}px + ${maxValue - minValue} * ((100vw - ${minVW}px) / ${maxVW - minVW}));
        }

        @media screen and (min-width: ${maxVW}px) {
            ${prop}: ${maxValue}px;
        }
    `;
};

/**
 * Extract colors form tailwind config and generate a css variable string
 *
 * @param {*} colorObj
 * @param {*} colorGroup
 * @returns
 */
const extractColorVars = (colorObj, colorGroup = '') => {
    const colorVarsString = Object.keys(colorObj).reduce((vars, colorKey) => {
        const value = colorObj[colorKey];

        const tokenString = colorKey === 'DEFAULT' ? { [`--color${colorGroup}`]: value } : { [`--color${colorGroup}-${colorKey}`]: value };

        const newVars = typeof value === 'string' ? tokenString : extractColorVars(value, `-${colorKey}`);

        return { ...vars, ...newVars };
    }, {});

    return colorVarsString;
};

const generateColorTokens = (name, palette) => {
    const colors = {};

    Object.keys(palette).map((key) => {
        const hex = palette[key];
        const cssToken = key === 'DEFAULT' ? `--color-${name}` : `--color-${name}-${key}`;

        colors[key] = `var(${cssToken}, ${hex})`;
    });

    return {
        colorsObject: colors,
        colorName: name,
    };
};

const extendedThemeColors = (colorsArray) => {
    const colorList = Object.keys(colorsArray).map((key) => ({ name: key, value: colorsArray[key] }));

    const colorPaletteList = {};

    colorList.forEach((color) => {
        const colors = generateColorTokens(color.name, color.value);
        colorPaletteList[colors.colorName] = colors.colorsObject;
    });

    return colorPaletteList;
};

module.exports = {
    extractColorVars,
    propFluid,
    extendedThemeColors,
};

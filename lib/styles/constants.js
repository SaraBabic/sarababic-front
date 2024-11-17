const { extendedThemeColors } = require('./tailwind/helpers');

const colors = {
    black: {
        DEFAULT: '#000',
    },
    white: {
        DEFAULT: '#fff',
    },
    gray: {
        DEFAULT: '#888',
    },
    background: {
        DEFAULT: '#fff',
    },
    foreground: {
        DEFAULT: '#000',
    },
    error: { DEFAULT: '#FF3300' },
    success: { DEFAULT: '#009900' },
};

const colorsDark = {
    black: {
        DEFAULT: '#000',
    },
    white: {
        DEFAULT: '#fff',
    },
    gray: {
        DEFAULT: '#888',
    },
    background: {
        DEFAULT: '#000',
    },
    foreground: {
        DEFAULT: '#fff',
    },
    error: { DEFAULT: '#FF3300' },
    success: { DEFAULT: '#009900' },
};

// Setting the default colors as CSS variables, so we can update them easily by updating the CSS variables
const colorsDefault = extendedThemeColors(colors);

module.exports = {
    colors: colorsDefault,
    colorsDark,
    baseFontSize: 16,
    screenMin: 375,
    screenMax: 1920,
    container: {
        padding: '2rem',
    },
};

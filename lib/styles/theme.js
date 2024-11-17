const constants = require('./constants');
const fontSize = require('./tailwind/fontSizes');
const flex = require('./tailwind/flex');

module.exports = {
    colors: {},
    colorsDark: constants.colorsDark,
    extend: {
        colors: constants.colors,
        screens: constants.screens,
        fontFamily: constants.fontFamily,
        container: constants.container,
        fontSize,
        flex,
        margin: {
            'section-mobile': '7rem',
            'section-desktop': '10rem',
            'group-mobile': '2rem',
            'group-desktop': '3rem',
        },
        padding: {
            'section-mobile': '7rem',
            'section-desktop': '10rem',
        },
    },
};

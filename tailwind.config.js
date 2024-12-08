/** @type {import('tailwindcss').Config} */
const { extractColorVars, propFluid } = require('./lib/styles/tailwind/helpers');
const plugin = require('tailwindcss/plugin');
const themeConfig = require('./lib/styles/theme');

module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
    safelist: ['bg-white', 'bg-black'],
    theme: themeConfig,
    plugins: [
        plugin(function ({ addBase, addComponents, addUtilities, matchUtilities, theme }) {
            addBase({
                ':root': extractColorVars(theme('colors')),
                // '@media (prefers-color-scheme: dark)': {
                //     ':root': extractColorVars(theme('colorsDark')),
                // },
                // '.theme-dark': extractColorVars(theme('colorsDark')),
            });
            matchUtilities({
                // Make props scale smoothly
                // Usage: propToFluid-[property_minValue_MaxValue]
                // Example: className="propToFluid-[font-size_18_24]"
                propToFluid: (value) => {
                    if (value) {
                        const values = value?.split(' ');
                        const propName = values?.[0];
                        const minValue = values?.[1];
                        const maxValue = values?.[2];

                        if (propName && minValue && maxValue) {
                            return {
                                [`${propName}`]: propFluid(propName, minValue, maxValue),
                            };
                        }
                    }
                },
            });
        }, extractColorVars),
    ],
};

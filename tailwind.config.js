const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: ['Inter', ...defaultTheme.fontFamily.sans],
            maxWidth: {
                container: '1500px',
            },
            colors: {
                gray: '#DBDBDB',
                beige: '#F9F4F0',
                accent: '#192A51',
                'card-income': '#7CA267',
                'card-expenses': '#C44536',
                white: '#FFFFFF',
            },
        },
    },
    plugins: [],
};

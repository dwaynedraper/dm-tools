/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar';

const width = {};
for (let i = 100; i <= 192; i += 4) {
  width[`${i}`] = `${i / 4}rem`;
}
console.log('width', width);

export const content = [
  './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  './src/app/**/*.{js,ts,jsx,tsx,mdx}',
];

export const theme = {
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
    },
    width: {
      '75': '18.75rem',
      ...width
    },
    boxShadow: {
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
    },
  },
};

export const plugins = [function ({ addUtilities }) {
  const newUtilities = {
    '.scrollbar-hide': {
      '::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none',
      'scrollbar-width': 'none',
    },
  };
  addUtilities(newUtilities, ['responsive', 'hover']);
}, scrollbar({ nocompatible: true })];

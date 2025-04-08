/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    color: {
      'electric': {
        '50': '#f2f2ff',
        '100': '#e8e7ff',
        '200': '#d3d2ff',
        '300': '#b4aeff',
        '400': '#8e80ff',
        '500': '#6a4dff',
        '600': '#5627ff',
        '700': '#4916eb',
        '800': '#3d12c5',
        '900': '#3311a1',
        '950': '#1b076e',
      },
    },
    extend: {},
  },
  plugins: [],
}


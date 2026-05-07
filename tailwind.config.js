/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          blue: '#2ABDFF',
          pink: '#FF37C7',
          green: '#00C3A0',
          purple: '#9E62FF',
        },
        // Light background variants
        light: {
          blue: '#F2F7FC',
          pink: '#FFEBFF',
          green: '#EEF9F6',
          purple: '#F7F1FD',
        }
      },
    },
  },
  plugins: [],
} 
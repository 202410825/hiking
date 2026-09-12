/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F1E9D8',
        'paper-dark': '#E7DCC2',
        ink: '#2B2A28',
        'ink-soft': '#5C564C',
        stamp: '#C1432A',
        'stamp-dark': '#9C3521',
        pine: '#375D48',
        'pine-dark': '#254234',
        mustard: '#D9A441',
        line: '#D8CBAE',
      },
      fontFamily: {
        display: ['"Gowun Batang"', 'serif'],
        stamp: ['"Special Elite"', 'monospace'],
        body: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

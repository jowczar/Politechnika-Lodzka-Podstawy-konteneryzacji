/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#FF8383',
          lighter: '#FF9999',
          darker: '#FF4C4C'
        },
        yt: {
          DEFAULT: '#FE0100',
          darker: '#CB0100',
        },
        reddishWhite: '#FCFAFA',
        grey: '#F9F9F9'
      }
    },
  },
  plugins: [
    function ({ addVariant, addUtilities }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
      addUtilities({
        '.no-scrollbar': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    }
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#08004b',
          teal: '#006989',
          tealDark: '#005570',
          tealLight: '#e6f3f7',
          gold: '#cebb78',
          goldDark: '#9a8848',
          goldLight: '#faf8f0',
          bg: '#fbfbfb',
          border: '#dce8f0',
          muted: '#7a8a98',
          dark: '#1a1a1a',
        }
      },
      fontFamily: {
        serif: ['Rufina', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', '"Source Sans Pro"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 36px rgba(0, 105, 137, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.04)',
        'hover': '0 16px 40px rgba(0, 105, 137, 0.14)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#050b1a',
          light: '#0d1b35',
          mid: '#0a1428',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#f0d060',
          dark: '#b8940a',
        },
        saffron: {
          DEFAULT: '#ff8c00',
          light: '#ffa940',
          dark: '#e67800',
        },
        peacock: {
          DEFAULT: '#1a9b8a',
          light: '#22c5ae',
          dark: '#0f7060',
        },
        cream: {
          DEFAULT: '#f0e6d0',
          dark: '#c9b99a',
          muted: '#8a7a60',
        },
        lotus: '#c97090',
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        body: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'spin-slow': 'spin 28s linear infinite',
        'spin-slow-r': 'spinR 35s linear infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'twinkle': 'twinkle 3.5s ease-in-out infinite',
        'rise': 'rise 0.9s ease-out forwards',
        'rise-1': 'rise 0.9s ease-out 0.15s forwards',
        'rise-2': 'rise 0.9s ease-out 0.3s forwards',
        'rise-3': 'rise 0.9s ease-out 0.45s forwards',
        'shimmer': 'shimmer 4s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        spinR: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGold: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.4))' },
          '50%': { filter: 'drop-shadow(0 0 22px rgba(212,175,55,0.85))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.15', transform: 'scale(0.4)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(32px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
      },
    },
  },
  plugins: [],
}

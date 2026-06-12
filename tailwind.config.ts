import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0A0C10',
        'midnight-light': '#1A1D24',
        'midnight-lighter': '#2A2E38',
        amber: '#FF8A00',
        'amber-dark': '#E67E00',
        'amber-light': '#FFB133',
        cyan: '#22D3EE',
        'cyan-dark': '#0891B2',
        'cyan-light': '#67E8F9',
      },
      fontFamily: {
        clash: ['var(--font-clash)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'truck-drive': 'truckDrive 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'lane-dash': 'laneDash 20s linear infinite',
        'wheel-spin': 'wheelSpin 0.8s linear infinite',
      },
      keyframes: {
        truckDrive: {
          from: { transform: 'translateX(-120%)' },
          to: { transform: 'translateX(0)' },
        },
        laneDash: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 0' },
        },
        wheelSpin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

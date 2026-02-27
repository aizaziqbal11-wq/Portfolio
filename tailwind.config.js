/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        display: ['var(--font-instrument)', 'serif'],
      },
      colors: {
        // Dark theme
        'd-bg': '#06060a',
        'd-surface': '#0e0e16',
        'd-card': '#13131f',
        'd-border': '#1f1f35',
        'd-muted': '#3d3d5c',
        'd-text': '#e2e2f0',
        'd-text-2': '#8585a8',
        // Light theme
        'l-bg': '#f7f7fc',
        'l-surface': '#ffffff',
        'l-card': '#f0f0f8',
        'l-border': '#e0e0f0',
        'l-muted': '#a0a0c0',
        'l-text': '#0a0a18',
        'l-text-2': '#50507a',
        // Accent
        accent: '#5b5ef4',
        'accent-2': '#8b7cf8',
        'accent-3': '#c4b5fd',
        'accent-glow': 'rgba(91, 94, 244, 0.25)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'typing': 'typing 2.5s steps(30) infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(91, 94, 244, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(91, 94, 244, 0.6)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

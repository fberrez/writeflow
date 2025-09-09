/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'particle-float': 'particleFloat 0.8s ease-out forwards',
        'progress-fill': 'progressFill 0.5s ease-out forwards',
        'stack-slide-in': 'stackSlideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        particleFloat: {
          '0%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(var(--dx), var(--dy)) scale(0)', opacity: '0' },
        },
        progressFill: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--progress)' },
        },
        stackSlideIn: {
          '0%': { transform: 'translateY(-4px) scale(0.95)', opacity: '0' },
          '50%': { transform: 'translateY(-2px) scale(0.98)', opacity: '0.5' },
          '100%': { transform: 'translateY(var(--stack-offset, 0px)) scale(1)', opacity: 'var(--stack-opacity, 1)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

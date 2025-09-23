/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /^bg-(red|green|blue)-(100|500|700)$/ },
    { pattern: /^text-(red|green|blue)-(500|700)$/ },
    { pattern: /^border-(red|green|blue)-(500|700)$/ },
    // Custom brand palettes used dynamically
                                  /^bg-(stem-blue|stem-green|stem-orange)-(100|200|300|400|500|600|700|800|900)$/,
                                  /^text-(stem-blue|stem-green|stem-orange)-(100|200|300|400|500|600|700|800|900)$/,
                                  /^border-(stem-blue|stem-green|stem-orange)-(100|200|300|400|500|600|700|800|900)$/,
                                  /^(from|via|to)-(stem-blue|stem-green|stem-orange)-(300|400|500|600)$/,
                                ],
                                theme: {
                                  extend: {
                                    colors: {
                                      'stem-blue': {
                                        50: '#e3f2fd',
                                        100: '#bbdefb',
                                        200: '#90caf9',
                                        300: '#64b5f6',
                                        400: '#42a5f5',
                                        500: '#2196f3',
                                        600: '#1e88e5',
                                        700: '#1976d2',
                                        800: '#1565c0',
                                        900: '#0d47a1',
                                      },
                                      'stem-green': {
                                        50: '#f0fdf4',
                                        100: '#dcfce7',
                                        200: '#bbf7d0',
                                        300: '#86efac',
                                        400: '#4ade80',
                                        500: '#22c55e',
                                        600: '#16a34a',
                                        700: '#15803d',
                                        800: '#166534',
                                        900: '#14532d',
                                      },
                                      'stem-orange': {
                                        50: '#fff7ed',
                                        100: '#ffedd5',
                                        200: '#fed7aa',
                                        300: '#fdba74',
                                        400: '#fb923c',
                                        500: '#f97316',
                                        600: '#ea580c',
                                        700: '#c2410c',
                                        800: '#9a3412',
                                        900: '#7c2d12',
                                      },
                                    },
                                    keyframes: {
                                      gradientShift: {
                                        '0%, 100%': { backgroundPosition: '0% 50%' },
                                        '50%': { backgroundPosition: '100% 50%' },
                                      },
                                      coinPop: {
                                        '0%': { transform: 'scale(1)' },
                                        '60%': { transform: 'scale(1.4)' },
                                        '100%': { transform: 'scale(1)' },
                                      },
                                      pulse: {
                                        '0%, 100%': { opacity: 1 },
                                        '50%': { opacity: 0.5 },
                                      },
                                      cardSlideUp: {
                                        '0%': { opacity: 0, transform: 'translateY(20px) scale(0.98)' },
                                        '60%': { opacity: 1, transform: 'translateY(-2px) scale(1.005)' },
                                        '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
                                      },
                                      elementStagger: {
                                        '0%': { opacity: 0, transform: 'translateY(8px)' },
                                        '100%': { opacity: 1, transform: 'translateY(0)' },
                                      },
                                      iconPulse: {
                                        '0%, 100%': { transform: 'scale(1)' },
                                        '50%': { transform: 'scale(1.06)' },
                                      },
                                      glowPulse: {
                                        '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.25)' },
                                        '50%': { boxShadow: '0 0 0 6px rgba(59,130,246,0.15)' },
                                      },
                                    },
                                    animation: {
                                      'gradient-shift': 'gradientShift 8s ease-in-out infinite',
                                      'coin-pop': 'coinPop 0.7s cubic-bezier(0.5, 1.5, 0.5, 1) forwards',
                                      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                                      'card-slide-up': 'cardSlideUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
                                      'element-stagger': 'elementStagger 500ms ease-out both',
                                      'icon-pulse': 'iconPulse 1.2s ease-in-out infinite',
                                      'glow-pulse': 'glowPulse 1.6s ease-in-out infinite',
                                    },
                                    boxShadow: {
                                      'glow-blue': '0 0 0 4px rgba(59, 130, 246, 0.15)',
                                      'glow-green': '0 0 0 4px rgba(34, 197, 94, 0.15)',
                                    },
                                  },
                                },
  plugins: [],
};

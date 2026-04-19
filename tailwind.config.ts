import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderRadius: {
        pill: '20px',
        card: '28px',
      },
      boxShadow: {
        float: '0 18px 40px rgba(15, 23, 42, 0.18)',
        glow: '0 12px 30px rgba(255, 255, 255, 0.12)',
      },
      colors: {
        brand: {
          red: '#f0453d',
          teal: '#2c9c8e',
          blue: '#2196F3',
        },
      },
      maxWidth: {
        'content-wide': '86rem',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
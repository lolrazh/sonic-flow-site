import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        // Dark theme
        dark: {
          900: '#121212', // Near black background
          800: '#181818', // Card backgrounds
          700: '#222222', // Secondary backgrounds
          600: '#2A2A2A', // Lighter backgrounds
          500: '#323232', // Borders
          400: '#444444', // Disabled text
          300: '#828282', // Muted text
          200: '#BBBBBB', // Secondary text
          100: '#E0E0E0', // Primary text
          50: '#F5F5F5', // Bright text
        },
        // Orange accent
        accent: {
          900: '#FF3900', // Deep orange
          800: '#FF4800', // Vibrant orange
          700: '#FF5D00', // Primary orange
          600: '#FF7A00', // Bright orange
          500: '#FF8E00', // Light orange
          400: '#FFA500', // Pale orange
          300: '#FFBD00', // Golden
          200: '#FFD500', // Amber
          100: '#FFEA00', // Light amber
          50: '#FFF8E0', // Very light amber
        },
        primary: {
          50: '#f0f7ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 20px rgba(0, 0, 0, 0.25)',
        'pill': '0 4px 10px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
} satisfies Config;

// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        nuleaf: {
          white: "#FFFFFF",
          background: "#D8D7D3",
          text: "#DD753C",
          accent: "#33503F"
        },
        white: "#FFFFFF",
        black: "#000000",
        // Keeping the existing color scales
        blue: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c7fb',
          300: '#66aaf9',
          400: '#338ef7',
          500: '#006FEE',
          600: '#005bc4',
          700: '#004493',
          800: '#002e62',
          900: '#001731'
        },
        // ... (keeping all other color scales as in your config)
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b'
        }
      }
    }
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: '#D8D7D3',
            foreground: '#aa5323',
            navbar: '#858474',
            primary: {
              foreground: '#FFFFFF',
              DEFAULT: '#33503F'
            },
            focus: '#DD753C',
            hover: '#33503F'
          }
        },
        dark: {
          colors: {
            background: '#1A1A1A',
            foreground: '#6ba582',
            navbar: '#4c4b40',
            primary: {
              foreground: '#D8D7D3',
              DEFAULT: '#aa4e1d'
            },
            hover: '#446B54'
          }
        },
        nuleaf: {
          colors: {
            primary: {
              background: '#D8D7D3',
              foreground: '#DD753C',
              50: '#ECE6E3',
              100: '#D8D7D3',
              200: '#C4B8B3',
              300: '#B09A93',
              400: '#9C7C73',
              500: '#DD753C',
              600: '#33503F',
              700: '#446B54',
              800: '#558369',
              900: '#669B7E',
              DEFAULT: '#DD753C',
              foreground: '#FFFFFF'
            },
            focus: '#33503F'
          }
        }
      }
    })
  ]
};
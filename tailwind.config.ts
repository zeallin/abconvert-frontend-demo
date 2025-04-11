import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT:'#d6ad60',
          100: '#f9f2e7',
          200: '#fff9db',
          300: '#fff9db',
          400: '#e3b765',
          500: '#d6ad60', 
          600: '#B68D40',
          700: '#8d6d32',
          800: '#75561c',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
       fontFamily: {
        montserrat: ['"Montserrat"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;

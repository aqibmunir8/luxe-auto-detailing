import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E293B",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#334155",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          foreground: "#FFFFFF",
        },
        obsidian: "#0B0F17",
        surface: "#111827",
        "surface-card": "#1E293B",
        "surface-border": "#334155",
        gold: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

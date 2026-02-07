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
        background: "var(--background)",
        foreground: "var(--foreground)",
        terracotta: "#C2410C",
        turmeric: "#F59E0B",
        leafGreen: "#27AE60",
        dark: "#111827",
        light: "#FEF3E7",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        devanagari: ["var(--font-noto-sans-devanagari)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

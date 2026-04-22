import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        slateBlue: "#1d4ed8",
        sand: "#f8fafc",
      },
      boxShadow: {
        card: "0 14px 50px -22px rgba(15, 23, 42, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

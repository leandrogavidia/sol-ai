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
        "solana-purple": "#9945FF",
        "solana-green": "#14F195",
        background: "#000",
        foreground: "#fff"
      },
    },
  },
  plugins: [],
};
export default config;

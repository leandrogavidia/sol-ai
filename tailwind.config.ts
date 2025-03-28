import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        diatype: ['var(--font-diatype)'],
      },
      colors: {
        "solana-purple": "#9945FF",
        "solana-green": "#14F195",
        background: "#121212",
      },
      minHeight: {
        'screen-minus-190': 'calc(100svh - 190px)',
      }
    },
  },
  plugins: [],
};
export default config;

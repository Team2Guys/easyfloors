import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-Inter)", ...fontFamily.sans],
      },
      colors: {
        primary: "var(--primary)",
        background: "var(--background)",
        "background-gray": "var(--background-gray)",
        "light-black": "var(--light-black)",
        purple: "var(--purple)",
        "card-text": "var(--card-text)",
        green: "var(--green)",
      },
    },
  },
  plugins: [],
} satisfies Config;

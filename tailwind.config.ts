import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        'raleway': ['var(--font-raleway)', 'sans-serif'],
        'jost': ['var(--font-jost)', 'sans-serif'],
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
      },
      screens: {
        phone: "360px",
        tabletProduct: "420px",
        tablet: "480px",
        minilaptop: "666px",
        laptop: "769px",
        mindesk: "1024px",
        largeDesk: "1200px",
        desktop: "1366px",
        xl: "1500px",
        xxl: "1920px",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        text: "#423c3d",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
} satisfies Config;

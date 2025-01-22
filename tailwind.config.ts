import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        phone: "360px",
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
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("daisyui")],
} satisfies Config;

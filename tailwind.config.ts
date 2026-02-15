import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0b1220",
        panel: "#111a2c",
        accent: "#31c48d"
      }
    }
  },
  plugins: []
} satisfies Config;

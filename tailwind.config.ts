import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          red: {
            light: "#f97373",
            DEFAULT: "#ef4444",
            dark: "#b91c1c"
          }
        }
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(90deg, #b91c1c, #ef4444, #f97373)"
      }
    }
  },
  plugins: []
};

export default config;

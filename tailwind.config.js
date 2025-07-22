// tailwind.config.js
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: "#1E3A8A",
        background: "#F9FAFB",
        card: "#FFFFFF",
        success: "#22C55E",
        warning: "#FACC15",
        danger: "#EF4444",
        textSecondary: "#6B7280", // from Tailwind's gray-500
      },
    },
  },
  plugins: [],
};

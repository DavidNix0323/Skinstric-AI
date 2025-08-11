/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: "800px" },
      },
      fontFamily: {
        "geist-sans": ["var(--font-geist-sans)"],
        "geist-mono": ["var(--font-geist-mono)"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        md: "1.125rem",
        lg: "1.25rem",
      },
      colors: {
        skinstricGray: "#1A1B1C",
      },
      zIndex: {
        1000: "1000",
      },
      animation: {
        "spin-slowest": "spin 85s linear infinite",
        "spin-slower": "spin 70s linear infinite",
        "spin-slow": "spin 55s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      rotate: {
        185: "185deg",
      },
      translate: {
        52: "52%",
        48: "48%",
      },
    },
  },
  plugins: [],
};

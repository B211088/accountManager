/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      "text-light": "#ffffff",
      "text-dark": "#00000",
      "bg-dark": "#000000",
      "bg-light": "#ffffff",
      "cl-border": "#E0E1E6",
      "bg-header": "#303038",
      "bg-btn-light": "#1F883D",
      "bg-btn-dark": "#303038",
      "bg-btn-hover": "#e6e6e6",
      "bg-red": "#e00404",
      "bg-green": "#05ff2b",
      "bg-overlay": "rgb(94, 94, 94, 0.7)",
      "hv-item": "rgb(231, 231, 231)",
      "cl-border-input": "#919191",
      "btn-upload": "#4284f5",
      "btn-dowload": "#db2a2a",
    },
  },
  plugins: [],
};

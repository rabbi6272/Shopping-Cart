// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

import withMT from "@material-tailwind/react/utils/withMT";
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        "pine-green": {
          50: "#f2fbf9",
          100: "#d5f2ec",
          200: "#abe4d9",
          300: "#79cfc1",
          400: "#4db4a6",
          500: "#33998d",
          600: "#277b73",
          700: "#23625d",
          800: "#204f4c",
          900: "#1e4340",
          950: "#0c2726",
        },

        cinnabar: {
          50: "#fdf4f3",
          100: "#fbe7e5",
          200: "#f9d3cf",
          300: "#f3b5ae",
          400: "#eb897e",
          500: "#dc594b",
          600: "#ca4638",
          700: "#a9382c",
          800: "#8c3228",
          900: "#752f27",
          950: "#3f1510",
        },
        "turquoise-blue": {
          50: "#ecfeff",
          100: "#d0fafd",
          200: "#a7f2fa",
          300: "#6ae7f6",
          400: "#37d6eb",
          500: "#0bb6cf",
          600: "#0c92ae",
          700: "#11748d",
          800: "#175e73",
          900: "#184e61",
          950: "#093343",
        },
        "cardBg-light": { 50: "#E3E4E8" },
        "cardBg-dark": { 50: "#353C47" },
      },
    },
  },
  plugins: [],
});

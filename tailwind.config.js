/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "w-primary": "#5EBBE8",
        "w-primary-1": "hsl(230, 20%, 17%)",
        "w-secondary": "#D2CCA1",
        "w-black-1": "#181818",
        "w-black-2": "#222222",
        "w-black-3": "#282828",
        "w-white-1": "hsl(230, 100%, 95%)",
        "w-white-2": "hsla(230, 100%, 95%, 0.8)",
        "w-white-3": "hsla(230, 100%, 95%, 0.6)",
        // "w-white-1": "#f2f2f2",
        // "w-white-2": "#f7f7f7",
        // "w-white-3": "rgba(235, 235, 235, 0.64)",
        "divider-1": "rgba(84, 84, 84, 0.65)",
        "divider-2": "rgba(84, 84, 84, 0.48)",
        "body-bg": "hsl(230, 40%, 12%)",
      },
    },
    fontFamily: {
      Roboto: ["'Poppins', sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true,
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
};

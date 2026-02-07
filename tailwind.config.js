/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Quicksand", "system-ui", "sans-serif"],
        romantic: ["Dancing Script", "cursive"],
      },
      colors: {
        valentine: {
          50: "#fef1f7",
          100: "#fee5f0",
          200: "#fecce3",
          300: "#ffa2cb",
          400: "#fe68a7",
          500: "#f83c86",
          600: "#e91f6d",
          700: "#ca0c4e",
          800: "#a70d41",
          900: "#8b1039",
        },
      },
      animation: {
        "float-heart": "floatHeart 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
      },
      keyframes: {
        floatHeart: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "translateY(-20px) rotate(10deg)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

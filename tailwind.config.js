/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Cormorant Garamond'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        black: "#000000",
        "off-black": "#0a0a0a",
        "deep": "#0f0f0f",
        gold: "#c9a84c",
        "gold-light": "#e8c97a",
        "gold-dark": "#8a6f2e",
        ivory: "#f5f0e8",
        "grey-dark": "#1a1a1a",
        "grey-mid": "#333333",
        "grey-light": "#888888",
      },
      letterSpacing: {
        widest: "0.25em",
        "ultra-wide": "0.4em",
      },
      fontSize: {
        "10xl": "10rem",
        "12xl": "14rem",
        "15xl": "18rem",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease forwards",
        "fade-in": "fadeIn 1s ease forwards",
        "slide-left": "slideLeft 0.6s ease forwards",
        "shimmer": "shimmer 2s infinite",
        "marquee": "marquee 20s linear infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideLeft: {
          "0%": { opacity: 0, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(201,168,76,0.4)" },
          "50%": { boxShadow: "0 0 20px 8px rgba(201,168,76,0.15)" },
        },
      },
    },
  },
  plugins: [],
};

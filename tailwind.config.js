/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed": "#1d1b18",
        "outline": "#7c766e",
        "secondary-fixed": "#e8e1db",
        "surface-container-highest": "#e4e2dd",
        "error": "#ba1a1a",
        "inverse-on-surface": "#f2f1ec",
        "surface-container-lowest": "#ffffff",
        "surface-container": "#f0eee9",
        "surface-bright": "#fbf9f4",
        "on-background": "#1b1c19",
        "tertiary": "#352400",
        "tertiary-container": "#513900",
        "on-primary-fixed-variant": "#3a485c",
        "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#5d4201",
        "surface-container-high": "#eae8e3",
        "tertiary-fixed": "#ffdea5",
        "on-primary-fixed": "#0d1c2f",
        "surface-container-low": "#f5f3ee",
        "error-container": "#ffdad6",
        "outline-variant": "#cdc5bc",
        "on-error": "#ffffff",
        "on-secondary": "#ffffff",
        "background": "#fbf9f4",
        "secondary": "#615e59",
        "surface-tint": "#515f74",
        "surface": "#fbf9f4",
        "on-surface-variant": "#4b463f",
        "secondary-container": "#e8e1db",
        "on-tertiary-container": "#c8a35b",
        "primary-fixed": "#d5e3fd",
        "surface-dim": "#dbdad5",
        "primary": "#1a283b",
        "on-tertiary": "#ffffff",
        "on-secondary-container": "#68645f",
        "inverse-primary": "#b9c7e0",
        "primary-fixed-dim": "#b9c7e0",
        "on-primary": "#ffffff",
        "surface-variant": "#e4e2dd",
        "on-primary-container": "#9ba9c1",
        "on-tertiary-fixed": "#261900",
        "on-surface": "#1b1c19",
        "tertiary-fixed-dim": "#e9c176",
        "primary-container": "#303e52",
        "inverse-surface": "#30312e",
        "secondary-fixed-dim": "#cbc5c0",
        "on-secondary-fixed-variant": "#494642"
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Noto Serif", "serif"],
        body: ["Manrope", "sans-serif"],
        label: ["Manrope", "sans-serif"]
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
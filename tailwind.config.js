/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
// tailwind.config.js
// This file configures Tailwind CSS for the project, specifying where to look for class names
// and extending the default theme if necessary. The content array includes paths to all pages and components.
// The theme can be extended with custom styles, colors, or fonts as needed.
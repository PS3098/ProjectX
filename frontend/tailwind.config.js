// frontend/tailwind.config.js
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",     // Include source files
      "./public/**/*.html"               // Ensure public files are included
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  
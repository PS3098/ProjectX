// frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite automatically detects PostCSS config, no need to specify it manually
export default defineConfig({
  plugins: [react()],
});

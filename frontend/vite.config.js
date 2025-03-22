import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',                     // Ensure Vite uses the root as the entry point
  build: {
    outDir: 'dist',               // Output directory for the build
    rollupOptions: {
      input: './index.html'       // Ensure Vite uses index.html as the entry point
    }
  }
});

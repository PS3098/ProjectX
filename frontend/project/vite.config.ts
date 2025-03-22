import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',                         // Root is the frontend folder
  base: '/app/',                       // ✅ Set base path to match FastAPI route
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',  // Backend FastAPI
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'           // Use the correct entry point
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

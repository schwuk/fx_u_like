import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app'),
    },
  },
  build: {
    outDir: 'public/js', // Match Brunch's output directory
    emptyOutDir: true,
  },
  server: {
    port: 3000, // Optional: Change the dev server port
  },
});
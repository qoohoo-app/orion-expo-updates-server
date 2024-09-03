import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dynamicImportVariables from '@rollup/plugin-dynamic-import-vars';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __API_BASE_URL__: process.env.API_BASE_URL,
  },
  build: {
    rollupOptions: {
      plugins: [dynamicImportVariables()],
    },
  }
})

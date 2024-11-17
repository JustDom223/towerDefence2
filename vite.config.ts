import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // Opens the browser when the dev server starts
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Create an alias for the src directory
    },
  },
});

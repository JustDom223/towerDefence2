import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    open: true, // Opens the browser when the dev server starts
    watch: {
      usePolling: true, // Ensure changes are detected, especially on networked filesystems
  },
  },
  resolve: {
    alias: {
      '@': '/src', // Optional: Create an alias for the src directory
    },
  },
});

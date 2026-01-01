import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Base path for GitHub Pages relative deployment
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        about: 'about.html',
        services: 'services.html',
        approach: 'approach.html',
        contact: 'contact.html',
      },
    },
  },
});

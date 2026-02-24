import { defineConfig } from 'vite';

export default defineConfig({
  root: 'comparison',
  base: './',
  build: {
    outDir: '../dist/comparison',
  },
  optimizeDeps: {
    exclude: ['verovio'],
  },
  assetsInclude: ['**/*.lyl'],
  server: {
    port: 5176,
    open: true,
  },
});

import { defineConfig } from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'src'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
      },
    },
  },
  plugins: [
    handlebars(),
  ],
  server: {
    port: 3000,
    open: true,
  },
});

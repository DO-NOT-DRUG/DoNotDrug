import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: 'localhost',
    port: 3000,
    cors: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9999/api/v1/member',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
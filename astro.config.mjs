import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  vite: {
    server: {
      host: '0.0.0.0',
      port: 4321,
      allowedHosts: ['psikrotic.duckdns.org']
    }
  }
});

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { collector } from './server/collector.js';

// In `vite dev` the form collector runs inside the dev server, so /api/* works with no extra process.
const devCollector = {
  name: 'dev-collector',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (!(await collector(req, res))) next();
    });
  },
};

export default defineConfig({
  plugins: [react(), devCollector],
  server: { port: 5174 },
});

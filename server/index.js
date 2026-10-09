// Standalone collector for use outside `vite dev` (e.g. behind your reverse proxy at /api).
//   npm run collector      (PORT defaults to 5175)
import http from 'node:http';
import { collector } from './collector.js';

const port = Number(process.env.PORT) || 5175;
http.createServer(async (req, res) => {
  if (!(await collector(req, res))) { res.statusCode = 404; res.end('Not found'); }
}).listen(port, () => console.log(`Collector listening on http://localhost:${port}`));

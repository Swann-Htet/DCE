// Minimal, dependency-free collector for the marketing-site forms.
// POST /api/demo      -> data/demo-requests.jsonl
// POST /api/feedback  -> data/surveys.jsonl
// One JSON object per line. Nothing is ever served back over HTTP: read the files with `npm run responses`.
// This is a development / small-scale collector. Before real public traffic, put it behind your hosting's
// rate limiting and decide data retention with the institution (it stores emails from demo requests).
import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
const MAX_BYTES = 100 * 1024;
const SURVEYS = new Set(['website-ux', 'lecturer-panel', 'advertising-preferences']);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on('data', (c) => {
      size += c.length;
      if (size > MAX_BYTES) { reject(Object.assign(new Error('too large'), { status: 413 })); req.destroy(); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch { reject(Object.assign(new Error('invalid json'), { status: 400 })); }
    });
    req.on('error', reject);
  });
}

const isObject = (v) => v && typeof v === 'object' && !Array.isArray(v);
const clip = (s, n) => String(s ?? '').slice(0, n);

async function save(file, record) {
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(path.join(DATA_DIR, file), `${JSON.stringify({ receivedAt: new Date().toISOString(), ...record })}\n`, 'utf8');
}

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

// Returns true when the request was handled.
export async function collector(req, res) {
  const url = (req.url || '').split('?')[0];
  if (url !== '/api/demo' && url !== '/api/feedback') return false;
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); send(res, 405, { error: 'method not allowed' }); return true; }

  try {
    const body = await readBody(req);
    if (!isObject(body)) return send(res, 400, { error: 'invalid body' }), true;

    if (url === '/api/demo') {
      const name = clip(body.name, 120).trim();
      const email = clip(body.email, 200).trim();
      if (!name || !EMAIL_RE.test(email) || body.consent !== true) return send(res, 422, { error: 'name, valid email and consent are required' }), true;
      await save('demo-requests.jsonl', {
        name, email, institution: clip(body.institution, 160), role: clip(body.role, 40),
        interest: clip(body.interest, 1000), consent: true,
      });
    } else {
      if (!SURVEYS.has(body.survey) || !isObject(body.answers)) return send(res, 422, { error: 'unknown survey or missing answers' }), true;
      // Only keep primitive answers / arrays of strings, with bounded length.
      const answers = {};
      for (const [k, v] of Object.entries(body.answers).slice(0, 80)) {
        if (Array.isArray(v)) answers[clip(k, 60)] = v.slice(0, 20).map((x) => clip(x, 120));
        else if (typeof v === 'number') answers[clip(k, 60)] = v;
        else answers[clip(k, 60)] = clip(v, 1500);
      }
      await save('surveys.jsonl', { survey: body.survey, answers });
    }
    send(res, 201, { ok: true });
  } catch (err) {
    send(res, err.status || 500, { error: err.status ? err.message : 'server error' });
  }
  return true;
}

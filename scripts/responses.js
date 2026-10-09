// Read collected responses.
//   npm run responses                 summary + comments
//   npm run responses -- --csv        CSV of every survey answer (stdout; redirect to a file)
//   npm run responses -- --demo       demo requests
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data');
const args = new Set(process.argv.slice(2));

async function lines(file) {
  try {
    return (await readFile(path.join(dir, file), 'utf8')).split('\n').filter(Boolean).map((l) => JSON.parse(l));
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}
const csv = (v) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`;

if (args.has('--demo')) {
  const rows = await lines('demo-requests.jsonl');
  console.log(`${rows.length} demo request(s)\n`);
  for (const r of rows) console.log(`${r.receivedAt}  ${r.name} <${r.email}>  ${r.institution || '-'}  ${r.role || '-'}\n    ${r.interest || ''}`);
} else {
  const rows = await lines('surveys.jsonl');
  if (args.has('--csv')) {
    const keys = [...new Set(rows.flatMap((r) => Object.keys(r.answers)))];
    console.log(['receivedAt', 'survey', ...keys].map(csv).join(','));
    for (const r of rows) console.log([r.receivedAt, r.survey, ...keys.map((k) => r.answers[k])].map(csv).join(','));
  } else {
    console.log(`${rows.length} survey response(s) in ${dir}\n`);
    for (const survey of new Set(rows.map((r) => r.survey))) {
      const set = rows.filter((r) => r.survey === survey);
      console.log(`== ${survey} (${set.length}) ==`);
      const keys = [...new Set(set.flatMap((r) => Object.keys(r.answers)))];
      for (const k of keys) {
        const vals = set.map((r) => r.answers[k]).filter((v) => v !== undefined && v !== '' && v !== 0 && !(Array.isArray(v) && !v.length)); // 0 = rating left blank
        if (!vals.length) continue;
        const nums = vals.filter((v) => typeof v === 'number' && v > 0);
        if (nums.length === vals.length) {
          console.log(`  ${k}: avg ${(nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(2)} (n=${nums.length})`);
        } else if (vals.every((v) => Array.isArray(v) || String(v).length <= 60)) {
          const count = {};
          for (const v of vals.flat()) count[v] = (count[v] || 0) + 1;
          console.log(`  ${k}: ${Object.entries(count).map(([a, n]) => `${a} x${n}`).join(', ')}`);
        } else {
          console.log(`  ${k}:`);
          vals.forEach((v) => console.log(`    - ${v}`));
        }
      }
      console.log('');
    }
  }
}

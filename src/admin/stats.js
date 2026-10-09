// Pure functions that turn raw survey rows into chart-ready data.

export const SURVEYS = {
  'website-ux': 'Website UX',
  'lecturer-panel': 'Lecturer panel',
  'advertising-preferences': 'Advertising preferences',
};

// Short, human labels for every answer key the surveys can produce.
export const LABELS = {
  role: 'Who is answering', lookingFor: 'Looking for', findEase: 'Ease of finding information', clarity: 'Clarity of product information',
  trust: 'Professional and trustworthy', confusing: 'Confusing or hard to find', improve: 'What to improve', overall: 'Overall experience',
  usedPanel: 'Has used the lecturer panel', frequency: 'How often used', coursesEase: 'Courses: ease',
  qbExperience: 'Question bank: experience', qbTypes: 'Question bank: question types', qbEdit: 'Question bank: find and edit', qbImport: 'Question bank: import wizard',
  setTiming: 'Settings: timing and window', setLimits: 'Settings: warning limits', setPublish: 'Settings: confidence publishing',
  accImport: 'Student access: import', accQr: 'Student access: QR codes', resFind: 'Results: finding students', resExport: 'Results: CSV export',
  resSignals: 'Results: warning counts', monitorUseful: 'Monitoring page usefulness', navEase: 'Panel navigation', layout: 'Layout clarity',
  speed: 'Speed', confidence: 'Confidence using signals', satisfaction: 'Overall satisfaction', slowTasks: 'Tasks that took longer',
  wishes: 'What would help most', frustration: 'Most frustrating part', suggestions: 'Suggestions',
  noticed: 'Noticed promotional content', placement: 'Preferred placement', relevance: 'Expected relevance', acceptability: 'Acceptability',
  content: 'Useful content types', trustworthy: 'What makes promotion trustworthy',
};

const TEXT_KEYS = new Set(['confusing', 'improve', 'trustworthy', 'frustration', 'suggestions']);
const blank = (v) => v === undefined || v === null || v === '' || v === 0 || (Array.isArray(v) && v.length === 0);

export function summarize(rows) {
  const keys = [...new Set(rows.flatMap((r) => Object.keys(r.answers || {})))];
  const ratings = [];
  const choices = [];
  const texts = [];

  for (const key of keys) {
    const label = LABELS[key] || key;
    const entries = rows.map((r) => ({ v: r.answers?.[key], at: r.created_at })).filter((e) => !blank(e.v));
    if (!entries.length) continue;

    if (TEXT_KEYS.has(key)) {
      texts.push({ key, label, items: entries.map((e) => ({ text: String(e.v), at: e.at })) });
    } else if (entries.every((e) => typeof e.v === 'number')) {
      const dist = [0, 0, 0, 0, 0];
      let sum = 0;
      for (const { v } of entries) { if (v >= 1 && v <= 5) { dist[v - 1] += 1; sum += v; } }
      const n = dist.reduce((a, b) => a + b, 0);
      if (n) ratings.push({ key, label, n, avg: sum / n, dist });
    } else {
      const counts = new Map();
      for (const { v } of entries) for (const item of [].concat(v)) counts.set(item, (counts.get(item) || 0) + 1);
      const options = [...counts].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
      choices.push({ key, label, n: entries.length, options });
    }
  }
  return { ratings, choices, texts };
}

// Responses per day for the last `days` days (including today), local time.
export function perDay(rows, days = 30) {
  const day = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const map = new Map();
  for (const r of rows) { const k = day(new Date(r.created_at)); map.set(k, (map.get(k) || 0) + 1); }
  const out = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i -= 1) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    out.push({ date: day(d), count: map.get(day(d)) || 0 });
  }
  return out;
}

export function overallAverage(rows) {
  const vals = rows.map((r) => r.answers?.overall ?? r.answers?.satisfaction).filter((v) => typeof v === 'number' && v > 0);
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
}

const csvCell = (v) => `"${String(Array.isArray(v) ? v.join('; ') : v ?? '').replace(/"/g, '""')}"`;

export function surveyCsv(rows) {
  const keys = [...new Set(rows.flatMap((r) => Object.keys(r.answers || {})))];
  const head = ['created_at', 'survey', ...keys].map(csvCell).join(',');
  return [head, ...rows.map((r) => [r.created_at, r.survey, ...keys.map((k) => r.answers?.[k])].map(csvCell).join(','))].join('\n');
}

export function demoCsv(rows) {
  const cols = ['created_at', 'name', 'email', 'institution', 'role', 'interest'];
  return [cols.map(csvCell).join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n');
}

export function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/csv;charset=utf-8' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

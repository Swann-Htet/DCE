import { DEMO_ENDPOINT, FEEDBACK_ENDPOINT, SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/forms';

// Every function returns { status: 'sent' | 'not-configured' | 'failed', message? }.
// 'sent' is only returned after a real 2xx response, never optimistically.
const supabaseEnabled = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export async function submitJson(endpoint, payload) {
  if (!endpoint) return { status: 'not-configured' };
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { status: 'failed', message: `The server responded with status ${res.status}.` };
    return { status: 'sent' };
  } catch {
    return { status: 'failed', message: 'The network request could not be completed.' };
  }
}

// Insert one row through Supabase's REST API. `return=minimal` matters: the anon role may insert but not read,
// so asking for the inserted row back would fail under Row Level Security.
async function insertRow(table, row) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!res.ok) return { status: 'failed', message: `The server responded with status ${res.status}.` };
    return { status: 'sent' };
  } catch {
    return { status: 'failed', message: 'The network request could not be completed.' };
  }
}

export function submitDemo(values) {
  const row = {
    name: values.name.trim(),
    email: values.email.trim(),
    institution: values.institution.trim() || null,
    role: values.role || null,
    interest: values.interest.trim() || null,
    consent: values.consent,
  };
  if (supabaseEnabled) return insertRow('demo_requests', row);
  return submitJson(DEMO_ENDPOINT, { type: 'demo-request', submittedAt: new Date().toISOString(), ...row });
}

export function submitSurvey(survey, answers) {
  if (supabaseEnabled) return insertRow('survey_responses', { survey, answers });
  return submitJson(FEEDBACK_ENDPOINT, { type: 'survey', survey, submittedAt: new Date().toISOString(), answers });
}

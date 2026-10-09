const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isEmail = (v) => EMAIL_RE.test(v.trim());

export function validateDemo(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your full name.';
  if (!v.email.trim()) e.email = 'Enter your work or university email.';
  else if (!isEmail(v.email)) e.email = 'Enter a valid email address, for example name@university.edu.';
  if (!v.consent) e.consent = 'Please confirm that we may contact you about this request.';
  return e;
}

// `required` maps question id -> message shown when unanswered.
export function validateRequired(values, required) {
  const e = {};
  for (const [id, message] of Object.entries(required)) {
    const val = values[id];
    const empty = Array.isArray(val) ? val.length === 0 : !val;
    if (empty) e[id] = message;
  }
  return e;
}

// Moves keyboard focus to the first invalid control after a failed submit.
export function focusFirstError(root) {
  const target = root?.querySelector('[data-invalid="true"]');
  if (!target) return;
  const focusable = target.matches('input,select,textarea,button')
    ? target
    : target.querySelector('input,select,textarea,button');
  (focusable || target).focus();
  target.scrollIntoView({ block: 'center', behavior: 'smooth' });
}

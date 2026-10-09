import { useRef, useState } from 'react';
import { Send } from 'lucide-react';
import Field, { FieldError } from './forms/Field';
import SubmitNotice from './forms/SubmitNotice';
import { submitDemo } from '../lib/submit';
import { validateDemo, focusFirstError } from '../lib/validation';

const ROLES = ['Lecturer', 'Administrator', 'IT Staff', 'Student', 'Other'];
const EMPTY = { name: '', email: '', institution: '', role: '', interest: '', consent: false };

export default function DemoForm() {
  const formRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (key) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validateDemo(values);
    setErrors(found);
    setResult(null);
    if (Object.keys(found).length) {
      setTimeout(() => focusFirstError(formRef.current), 0);
      return;
    }
    setBusy(true);
    const res = await submitDemo(values);
    setBusy(false);
    setResult(res);
    if (res.status === 'sent') setValues(EMPTY);
  };

  return (
    <form ref={formRef} className="card form-card" onSubmit={onSubmit} noValidate aria-label="Request a demo">
      <div className="form-grid">
        <Field id="demo-name" label="Full name" required autoComplete="name" maxLength={120}
          value={values.name} onChange={set('name')} error={errors.name} />
        <Field id="demo-email" label="Work or university email" required type="email" autoComplete="email" maxLength={200}
          value={values.email} onChange={set('email')} error={errors.email} />
        <Field id="demo-institution" label="Institution name" autoComplete="organization" maxLength={160}
          value={values.institution} onChange={set('institution')} />
        <Field id="demo-role" label="Role" as="select" value={values.role} onChange={set('role')}>
          <option value="">Select a role</option>
          {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </Field>
      </div>
      <Field id="demo-interest" label="What would you like to learn about?" as="textarea" rows={4} maxLength={1000}
        value={values.interest} onChange={set('interest')} />

      <div className="field">
        <label className={`choice choice-consent${values.consent ? ' is-checked' : ''}`}>
          <input type="checkbox" name="demo-consent" checked={values.consent} onChange={set('consent')}
            data-invalid={errors.consent ? 'true' : undefined}
            aria-invalid={errors.consent ? 'true' : undefined}
            aria-describedby={errors.consent ? 'demo-consent-error' : undefined} />
          <span>
            I agree to be contacted about this demo request. My details will be used only to arrange and
            discuss a demonstration (required).
          </span>
        </label>
        <FieldError id="demo-consent-error">{errors.consent}</FieldError>
      </div>

      <button type="submit" className="btn btn-primary" disabled={busy}>
        <Send size={18} aria-hidden="true" />
        {busy ? 'Sending...' : 'Request a Demo'}
      </button>

      <SubmitNotice result={result} onReset={() => setResult(null)} resetLabel="Dismiss" kind="request" />
    </form>
  );
}

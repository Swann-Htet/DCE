import { useRef, useState } from 'react';
import { submitSurvey } from '../../lib/submit';
import { validateRequired, focusFirstError } from '../../lib/validation';

// Shared state/submit logic for both surveys.
export function useSurvey({ survey, initial, required }) {
  const formRef = useRef(null);
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (key) => (val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };
  const setText = (key) => (e) => set(key)(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    const found = validateRequired(values, typeof required === 'function' ? required(values) : required);
    setErrors(found);
    if (Object.keys(found).length) {
      setTimeout(() => focusFirstError(formRef.current), 0);
      return;
    }
    setBusy(true);
    const res = await submitSurvey(survey, values);
    setBusy(false);
    setResult(res);
    if (res.status === 'sent') setValues(initial);
  };

  const reset = () => { setValues(initial); setErrors({}); setResult(null); };

  return { formRef, values, errors, result, busy, set, setText, onSubmit, reset };
}

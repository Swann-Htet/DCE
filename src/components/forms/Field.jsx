import { AlertCircle } from 'lucide-react';

export function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p className="field-error" id={id}>
      <AlertCircle size={16} aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

// Text input, textarea or select with an associated label, hint and error.
export default function Field({ id, label, required, hint, error, as = 'input', children, ...rest }) {
  const Control = as;
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required ? <span className="req"> (required)</span> : <span className="opt"> (optional)</span>}
      </label>
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      <Control
        id={id}
        name={id}
        className="control"
        aria-invalid={error ? 'true' : undefined}
        data-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...rest}
      >
        {children}
      </Control>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

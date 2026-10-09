import { FieldError } from './Field';

// Accessible radio or checkbox group inside a fieldset.
// `exclusive` (checkbox only): value that clears all others when picked, and vice versa.
export default function ChoiceGroup({
  id, legend, hint, required, error, type = 'radio', options, value, onChange, exclusive,
}) {
  const selected = type === 'radio' ? value : value || [];
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;

  const toggle = (opt) => {
    if (type === 'radio') return onChange(opt);
    if (opt === exclusive) return onChange(selected.includes(opt) ? [] : [opt]);
    const next = selected.includes(opt) ? selected.filter((o) => o !== opt) : [...selected.filter((o) => o !== exclusive), opt];
    onChange(next);
  };

  return (
    <fieldset className="fieldset" data-invalid={error ? 'true' : undefined} aria-describedby={describedBy}>
      <legend>
        {legend}
        {required ? <span className="req"> (required)</span> : <span className="opt"> (optional)</span>}
      </legend>
      {hint && <p className="hint" id={`${id}-hint`}>{hint}</p>}
      <div className="choices">
        {options.map((opt) => {
          const checked = type === 'radio' ? selected === opt : selected.includes(opt);
          return (
            <label key={opt} className={`choice${checked ? ' is-checked' : ''}`}>
              <input
                type={type}
                name={id}
                value={opt}
                checked={checked}
                onChange={() => toggle(opt)}
                aria-invalid={error ? 'true' : undefined}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </fieldset>
  );
}

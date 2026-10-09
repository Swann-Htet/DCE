import { FieldError } from './Field';

// 1-5 scale built from native radio inputs, so arrow keys and screen readers work.
export default function RatingScale({ id, legend, required, error, low, high, value, onChange }) {
  const describedBy = [`${id}-ends`, error && `${id}-error`].filter(Boolean).join(' ');
  return (
    <fieldset className="fieldset" data-invalid={error ? 'true' : undefined} aria-describedby={describedBy}>
      <legend>
        {legend}
        {required ? <span className="req"> (required)</span> : <span className="opt"> (optional)</span>}
      </legend>
      <div className="rating" role="presentation">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={`rating-item${value === n ? ' is-checked' : ''}`}>
            <input
              type="radio"
              name={id}
              value={n}
              checked={value === n}
              onChange={() => onChange(n)}
              aria-label={`${n} of 5${n === 1 ? `, ${low}` : n === 5 ? `, ${high}` : ''}`}
            />
            <span aria-hidden="true">{n}</span>
          </label>
        ))}
      </div>
      <p className="rating-ends" id={`${id}-ends`}>
        <span>1 = {low}</span>
        <span>5 = {high}</span>
      </p>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </fieldset>
  );
}

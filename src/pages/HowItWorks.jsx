import Intro from '../components/Intro';
import { STEPS } from '../config/content';

export default function HowItWorks() {
  return (
    <section className="screen screen-page" aria-labelledby="how-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container">
        <Intro as="h1" id="how-title" eyebrow="How it works" title="From setup to review in four steps">
          A simplified overview of the journey. The detail lives in the product; this is the shape of it.
        </Intro>
        <ol className="timeline plain" data-reveal>
          {STEPS.map((s, i) => (
            <li key={s.title} className="t-step" style={{ '--i': i }}>
              <span className="t-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="card-title">{s.title}</h2>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { FileCheck2 } from 'lucide-react';
import Icon from '../components/Icon';
import Intro from '../components/Intro';
import { SECURITY_POINTS } from '../config/content';

export default function Security() {
  return (
    <section className="screen screen-page" aria-labelledby="security-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container">
        <Intro as="h1" id="security-title" eyebrow="Security & privacy" title="Precise, not just reassuring">
          Proctoring involves sensitive information about students. We would rather say exactly what we know
          than make promises we cannot yet document.
        </Intro>
        <ul className="grid grid-2 plain">
          {SECURITY_POINTS.map((p, i) => (
            <li key={p.title} className="card card-row spotlight" data-reveal style={{ '--i': i + 2 }}>
              <span className="icon-chip"><Icon name={p.icon} /></span>
              <div>
                <h2 className="card-title">{p.title}</h2>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="policy-link" data-reveal style={{ '--i': 6 }}>
          <FileCheck2 size={18} aria-hidden="true" />
          <Link to="/privacy">Privacy Policy</Link>
          <span> (placeholder: official policy content still to be provided)</span>
        </p>
      </div>
    </section>
  );
}

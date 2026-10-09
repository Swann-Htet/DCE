import { Link } from 'react-router-dom';
import { TriangleAlert } from 'lucide-react';
import Intro from '../components/Intro';

export default function Privacy() {
  return (
    <section className="screen screen-page" aria-labelledby="privacy-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container narrow">
        <Intro as="h1" id="privacy-title" eyebrow="Legal" title="Privacy Policy" />
        <div className="notice notice-info" role="note" data-reveal style={{ '--i': 2 }}>
          <TriangleAlert size={22} aria-hidden="true" />
          <div>
            <p className="notice-title">Placeholder page: no policy has been written yet.</p>
            <p>
              This page exists so the site has a place to link to. It makes no commitments about data
              collection, retention, security, sharing or compliance. Replace it with the institution's
              or company's official, legally reviewed Privacy Policy before launch.
            </p>
          </div>
        </div>
        <p className="back-link"><Link to="/">Back to home</Link></p>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { Mail, ShieldCheck } from 'lucide-react';
import { BRAND_NAME, CONTACT_EMAIL, NAV_LINKS } from '../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="brand brand-light">
            <span className="brand-mark"><ShieldCheck size={20} aria-hidden="true" /></span>
            <span className="brand-name">{BRAND_NAME}</span>
          </p>
          <p className="footer-note">
            Online examination management and proctoring-related monitoring, in use at Mae Fah Luang University, Digital and Communication Engineering.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer-heading">Explore</h2>
          <ul>
            {NAV_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
            <li><Link to="/demo">Request a Demo</Link></li>
            <li><Link to="/privacy">Privacy Policy (placeholder)</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-heading">Contact</h2>
          {CONTACT_EMAIL ? (
            <p><Mail size={16} aria-hidden="true" /> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
          ) : (
            <p className="footer-note">Contact details to be added. Use the demo request form in the meantime.</p>
          )}
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
      </div>
    </footer>
  );
}

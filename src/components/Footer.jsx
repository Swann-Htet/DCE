import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { CONTACT_EMAIL, INSTITUTION, NAV_LINKS, PROGRAM } from '../config/site';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logos">
            <BrandLogo height={46} variant="light" />
            <img className="footer-dept" src="/dce-department-light.png" alt={`${PROGRAM}, ${INSTITUTION}`} height="56" width="56" loading="lazy" />
          </div>
          <p className="footer-note">
            Online examination management and proctoring-related monitoring, in use at Mae Fah Luang University, Digital and Communication Engineering.
          </p>
        </div>
        <nav aria-label="Footer">
          <h2 className="footer-heading">Explore</h2>
          <ul>
            {NAV_LINKS.map((l) => <li key={l.label}><Link to={l.to}>{l.label}</Link></li>)}
            <li><Link to="/demo">Request a Demo</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
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
        <p>&copy; {new Date().getFullYear()} DCE project team, {INSTITUTION}. All rights reserved.</p>
      </div>
    </footer>
  );
}

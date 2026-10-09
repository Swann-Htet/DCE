import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';
import { BRAND_NAME, NAV_LINKS } from '../config/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-pill">
          <Link to="/" className="brand" aria-label={`${BRAND_NAME} home`}>
            <BrandLogo height={42} />
          </Link>

          <nav id="site-nav" className={`nav${open ? ' is-open' : ''}`} aria-label="Primary">
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><NavLink to={l.to}>{l.label}</NavLink></li>
              ))}
            </ul>
            <Link to="/demo" className="btn btn-primary btn-sm magnetic">
              Request a Demo <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>

          <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}

import { useEffect, useState } from 'react';

// Section indicator for long, full-screen pages. Reads every [data-screen="Label"] in <main>.
export default function SideDots() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = [...document.querySelectorAll('main [data-screen]')];
    setItems(els.map((el) => el.dataset.screen));
    const io = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (en.isIntersecting) setActive(els.indexOf(en.target));
      }
    }, { threshold: 0.55 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i) => {
    const el = document.querySelectorAll('main [data-screen]')[i];
    el?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  if (items.length < 2) return null;
  return (
    <nav className="side-dots" aria-label="Page sections">
      <ul>
        {items.map((label, i) => (
          <li key={label}>
            <button type="button" className={i === active ? 'is-active' : ''} onClick={() => go(i)}
              aria-label={`Go to ${label}`} aria-current={i === active ? 'true' : undefined}>
              <span className="dot-label">{label}</span>
              <span className="dot" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AppWindow, Check, Eye, QrCode, ScanFace, ShieldCheck } from 'lucide-react';

const SIGNALS = [
  { icon: ScanFace, label: 'Identity confirmed', tone: 'ok' },
  { icon: AppWindow, label: 'Tab switch noted', tone: 'warn' },
  { icon: Eye, label: 'Flagged for lecturer review', tone: 'review' },
];

// Conceptual product illustration built from live elements. It is NOT a screenshot of DCE.
// Pointer parallax (JS) + a cycling signal list (JS state) + looping CSS motion.
export default function HeroStage() {
  const stage = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % SIGNALS.length), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = stage.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
        el.style.setProperty('--py', (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <figure className="stage-wrap">
      <div className="stage" ref={stage} role="img"
        aria-label="Conceptual illustration: an exam window, an identity check and a list of monitoring signals for lecturer review">
        <div className="orbit orbit-1" aria-hidden="true" />
        <div className="orbit orbit-2" aria-hidden="true" />

        <div className="s-layer s-exam" style={{ '--d': 14 }} aria-hidden="true">
          <div className="s-card float-a">
            <div className="s-bar"><i /><i /><i /><span>Online exam</span></div>
            <div className="s-line w70" />
            <div className="s-line w50" />
            <ul className="s-opts">
              {[0, 1, 2].map((i) => (
                <li key={i} className={`s-opt o${i}`}><b /><u /></li>
              ))}
            </ul>
            <div className="s-progress"><span /></div>
          </div>
        </div>

        <div className="s-layer s-id" style={{ '--d': 26 }} aria-hidden="true">
          <div className="s-card s-card-red float-b">
            <div className="scan-box">
              <ScanFace size={34} strokeWidth={1.5} />
              <span className="scan-line" />
            </div>
            <div>
              <p className="s-title">Identity check</p>
              <p className="s-sub"><QrCode size={13} /> QR + selfie</p>
            </div>
            <span className="s-tick"><Check size={14} strokeWidth={3} /></span>
          </div>
        </div>

        <div className="s-layer s-sig" style={{ '--d': 38 }} aria-hidden="true">
          <div className="s-card float-c">
            <p className="s-title"><ShieldCheck size={16} /> Signals for review</p>
            <ul className="s-signals">
              {SIGNALS.map(({ icon: Icon, label, tone }, i) => (
                <li key={label} className={`${tone}${i === active ? ' is-active' : ''}`}>
                  <Icon size={16} /> <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <figcaption>Conceptual illustration, not a product screenshot.</figcaption>
    </figure>
  );
}

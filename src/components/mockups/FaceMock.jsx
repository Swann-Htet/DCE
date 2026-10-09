import { useRef } from 'react';
import { Camera, Eye, ScanFace, Users } from 'lucide-react';
import { useInView, useStepper } from '../../lib/useStepper';

const STEPS = [2000, 2300, 2300, 2700];
const LABELS = [
  { Icon: ScanFace, text: 'Face detected' },
  { Icon: ScanFace, text: 'Head movement noted' },
  { Icon: Eye, text: 'Eye movement noted' },
  { Icon: Users, text: '2 faces detected' },
];

// Conceptual only: shows how face-related signals could be flagged for human review.
export default function FaceMock() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const { step } = useStepper(STEPS, visible, 3);
  const flagged = step > 0;

  return (
    <div ref={ref} className="mock" role="img"
      aria-label="Illustrated mockup of a camera view with face boxes: a face, a head turn, eye movement and a second face are each flagged for review">
      <div className="mock-chrome" aria-hidden="true"><span className="mock-url"><Camera size={13} /> Camera view</span></div>
      <div className="mock-body fm-body" data-state={step} aria-hidden="true">
        <div className="fm-cam">
          <svg viewBox="0 0 320 240" className="fm-svg">
            <defs>
              <linearGradient id="fm-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a1212" /><stop offset="1" stopColor="#1a0505" /></linearGradient>
            </defs>
            <rect width="320" height="240" fill="url(#fm-bg)" />
            <g className="fm-main">
              <path d="M78 240c8-48 44-62 82-62s74 14 82 62z" fill="#7a2b2b" />
              <rect x="146" y="150" width="28" height="32" rx="8" fill="#d9b5ad" />
              <g className="fm-head">
                <ellipse cx="160" cy="104" rx="40" ry="50" fill="#e8c9c1" />
                <path d="M118 96c2-34 24-48 44-48s40 14 42 48c-10-14-26-22-44-22s-32 8-42 22z" fill="#3a1414" />
                <ellipse cx="144" cy="104" rx="8" ry="5.5" fill="#fff" />
                <ellipse cx="176" cy="104" rx="8" ry="5.5" fill="#fff" />
                <g className="fm-pupils"><circle cx="144" cy="104" r="3.2" fill="#2a0c0c" /><circle cx="176" cy="104" r="3.2" fill="#2a0c0c" /></g>
                <path d="M150 128q10 7 20 0" stroke="#a5655f" strokeWidth="3" fill="none" strokeLinecap="round" />
              </g>
              <rect className="fm-box" x="108" y="46" width="104" height="116" rx="10" />
            </g>
            <g className="fm-second">
              <path d="M236 240c3-24 18-34 34-34s30 10 34 34z" fill="#6b2626" />
              <ellipse cx="270" cy="160" rx="22" ry="27" fill="#dcbdb5" />
              <path d="M248 154c1-18 12-26 22-26s21 8 22 26c-6-8-14-12-22-12s-16 4-22 12z" fill="#2a0f0f" />
              <circle cx="262" cy="160" r="2.6" fill="#2a0c0c" /><circle cx="278" cy="160" r="2.6" fill="#2a0c0c" />
              <rect className="fm-box fm-box-2" x="244" y="130" width="52" height="64" rx="8" />
            </g>
          </svg>
          <span className={`fm-chip${flagged ? ' alert' : ''}`} key={step}>
            {(() => { const L = LABELS[step]; return <><L.Icon size={14} /> {L.text}</>; })()}
          </span>
        </div>
        <ul className="fm-list">
          {LABELS.slice(1).map(({ Icon, text }, i) => (
            <li key={text} className={step === i + 1 ? 'is-active' : ''}><Icon size={15} /> {text}</li>
          ))}
          <li className={`fm-review${step === 3 ? ' is-active' : ''}`}><Eye size={15} /> Flagged for lecturer review</li>
        </ul>
      </div>
    </div>
  );
}

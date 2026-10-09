import { useRef } from 'react';
import { Camera, Eye, ScanFace, Users } from 'lucide-react';
import { useInView, useStepper } from '../../lib/useStepper';
import Portrait, { PALETTES } from './Portrait';

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
              <linearGradient id="fm-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#efeded" /><stop offset="1" stopColor="#d6d3d3" /></linearGradient>
            </defs>
            <rect width="320" height="240" fill="url(#fm-bg)" />
            <circle cx="60" cy="50" r="46" fill="#fff" opacity="0.45" />
            <g className="fm-main">
              <Portrait p={PALETTES.main} animated />
              <rect className="fm-box" x="99" y="26" width="122" height="150" rx="12" />
            </g>
            <g className="fm-second">
              <g transform="translate(174 90) scale(0.55)"><Portrait p={PALETTES.other} /></g>
              <rect className="fm-box fm-box-2" x="231" y="104" width="62" height="84" rx="9" />
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

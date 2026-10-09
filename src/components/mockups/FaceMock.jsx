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

const MAIN = { skin: '#f2cdb9', shade: '#e2ad95', hair: '#3a2626', shirt: '#7a1a1a', cheek: '#e9806f' };
const OTHER = { skin: '#ebc2aa', shade: '#d9a68e', hair: '#1f1616', shirt: '#4a1010', cheek: '#e07a68' };

// One friendly flat-style person, drawn around (160, 106). `animated` adds the head/eye hooks used by the loop.
function Person({ c, animated }) {
  return (
    <g>
      <path d="M62 300C62 232 104 184 160 182C216 184 258 232 258 300Z" fill={c.shirt} />
      <path d="M132 186L160 214L188 186L178 181L160 198L142 181Z" fill="#fff" opacity="0.92" />
      <path d="M143 148h34v38q-17 14-34 0z" fill={c.shade} />
      <g className={animated ? 'fm-head' : undefined}>
        <ellipse cx="119" cy="108" rx="7" ry="12" fill={c.skin} />
        <ellipse cx="201" cy="108" rx="7" ry="12" fill={c.skin} />
        <ellipse cx="160" cy="106" rx="41" ry="50" fill={c.skin} />
        <path d="M118 106C111 66 134 43 162 43C192 43 211 66 202 106C198 89 190 77 176 71C160 83 137 83 125 93C121 97 119 101 118 106Z" fill={c.hair} />
        <circle cx="134" cy="124" r="8" fill={c.cheek} opacity="0.28" />
        <circle cx="186" cy="124" r="8" fill={c.cheek} opacity="0.28" />
        <path d="M135 92q9-5 17-1M168 91q8-4 17 1" stroke={c.hair} strokeWidth="3.2" strokeLinecap="round" fill="none" />
        <ellipse cx="144" cy="104" rx="8" ry="5.6" fill="#fff" />
        <ellipse cx="176" cy="104" rx="8" ry="5.6" fill="#fff" />
        <g className={animated ? 'fm-pupils' : undefined}>
          <circle cx="144" cy="104" r="3.6" fill="#2b1b1b" /><circle cx="176" cy="104" r="3.6" fill="#2b1b1b" />
          <circle cx="145.2" cy="102.8" r="1.1" fill="#fff" /><circle cx="177.2" cy="102.8" r="1.1" fill="#fff" />
        </g>
        <path d="M160 108q-5 14 0 19q4 2 8-1" stroke={c.shade} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M147 135q13 11 26 0" stroke="#b4574f" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      </g>
    </g>
  );
}

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
              <Person c={MAIN} animated />
              <rect className="fm-box" x="104" y="38" width="112" height="126" rx="12" />
            </g>
            <g className="fm-second">
              <g transform="translate(174 91.7) scale(0.55)"><Person c={OTHER} /></g>
              <rect className="fm-box fm-box-2" x="232" y="110" width="60" height="70" rx="9" />
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

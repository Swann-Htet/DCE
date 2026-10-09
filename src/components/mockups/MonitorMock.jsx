import { useRef, useState } from 'react';
import { AppWindow, Eye, MousePointer2, ScanFace, Users, ZoomIn, ZoomOut } from 'lucide-react';
import { useInView, useStepper } from '../../lib/useStepper';
import Portrait, { HEAD_BOX, PALETTES } from './Portrait';

const STUDENTS = [
  { name: 'Student A', p: PALETTES.main },
  { name: 'Student B', p: PALETTES.c },
  { name: 'Student C', p: PALETTES.d },
  { name: 'Student D', p: PALETTES.e },
  { name: 'Student E', p: PALETTES.other },
  { name: 'Student F', p: PALETTES.f },
];
const EVENTS = [
  { tile: 1, label: 'Tab switch noted', Icon: AppWindow },
  { tile: 4, label: 'Face signal noted', Icon: ScanFace },
  { tile: 2, label: 'Cursor boundary', Icon: MousePointer2 },
  { tile: 5, label: 'Tab switch noted', Icon: AppWindow },
];
// Four flagging steps, then one step that zooms in on a single student.
const STEPS = [1900, 2200, 2200, 2200, 3600];
const ZOOM_STEP = 4;
const AUTO_ZOOM_TILE = 4;

function Zoomed({ index, event, onBack }) {
  const s = STUDENTS[index];
  return (
    <div className="mm-zoom" role="group" aria-label={`Zoomed view of ${s.name}`}>
      <svg viewBox="0 0 320 240" className="mm-zoom-svg" aria-hidden="true">
        <defs><linearGradient id="mmz" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#efeded" /><stop offset="1" stopColor="#d6d3d3" /></linearGradient></defs>
        <rect width="320" height="240" fill="url(#mmz)" />
        <Portrait p={s.p} />
        {event && <rect className="fm-box" {...HEAD_BOX} rx="14" style={{ stroke: 'var(--r500)' }} />}
      </svg>
      <span className="mm-zoom-name"><ZoomIn size={13} /> {s.name}</span>
      <span className={`mm-zoom-status${event ? ' alert' : ''}`}>
        {event ? <><event.Icon size={14} /> {event.label}</> : 'No signals so far'}
      </span>
      <button type="button" className="mm-back" onClick={onBack}><ZoomOut size={15} aria-hidden="true" /> All students</button>
    </div>
  );
}

export default function MonitorMock() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const { step, round } = useStepper(STEPS, visible, 3);
  const [pinned, setPinned] = useState(null); // tile the visitor zoomed into
  const [dismissed, setDismissed] = useState(''); // auto-zoom the visitor closed

  const stepKey = `${round}-${step}`;
  const flagged = EVENTS.slice(0, Math.min(step, 3) + 1);
  const log = [...flagged].reverse();
  const auto = step === ZOOM_STEP && dismissed !== stepKey ? AUTO_ZOOM_TILE : null;
  const zoomIndex = pinned ?? auto;
  const eventFor = (i) => flagged.find((e) => e.tile === i);

  const back = () => { setPinned(null); setDismissed(stepKey); };

  return (
    <div ref={ref} className="mock" role="group"
      aria-label="Illustrated mockup: a lecturer sees six students at once, flagged signals are listed, and one student can be zoomed in on">
      <div className="mock-chrome" aria-hidden="true"><span className="mock-url"><Users size={13} /> Monitoring: 6 students</span></div>
      <div className="mock-body mm-body">
        <div className="mm-stage">
          <div className="mm-grid">
            {STUDENTS.map(({ name, p }, i) => {
              const ev = eventFor(i);
              const current = step < ZOOM_STEP && EVENTS[step].tile === i;
              return (
                <button key={name} type="button" className={`mm-tile${ev ? ' flagged' : ''}${current ? ' current' : ''}`}
                  aria-label={`Zoom in on ${name}${ev ? `, ${ev.label}` : ''}`} onClick={() => setPinned(i)}>
                  <svg viewBox="0 0 320 240" className="mm-face" aria-hidden="true"><Portrait p={p} blinkDelay={i * 0.9} /></svg>
                  <span className="mm-name">{name}</span>
                  {ev && <span className="mm-badge"><ev.Icon size={11} /></span>}
                  <span className="mm-hint" aria-hidden="true"><ZoomIn size={14} /></span>
                </button>
              );
            })}
          </div>
          {zoomIndex !== null && <Zoomed key={`${zoomIndex}-${pinned === null}`} index={zoomIndex} event={eventFor(zoomIndex) || (zoomIndex === AUTO_ZOOM_TILE ? EVENTS[1] : null)} onBack={back} />}
        </div>
        <div className="mm-log">
          <p className="mm-log-title"><Eye size={14} /> Flagged for review</p>
          <ul>
            {log.map(({ tile, label, Icon }) => (
              <li key={`${tile}-${label}`}><Icon size={14} /> <span>{STUDENTS[tile].name}</span> {label}</li>
            ))}
          </ul>
          <p className="mm-tip">Click a student to zoom in.</p>
        </div>
      </div>
    </div>
  );
}

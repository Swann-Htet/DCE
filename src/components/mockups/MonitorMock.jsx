import { useRef } from 'react';
import { AppWindow, Eye, MousePointer2, ScanFace, Users } from 'lucide-react';
import { useInView, useStepper } from '../../lib/useStepper';

const STUDENTS = ['Student A', 'Student B', 'Student C', 'Student D', 'Student E', 'Student F'];
const EVENTS = [
  { tile: 1, label: 'Tab switch noted', Icon: AppWindow },
  { tile: 4, label: 'Face signal noted', Icon: ScanFace },
  { tile: 2, label: 'Cursor boundary', Icon: MousePointer2 },
  { tile: 5, label: 'Tab switch noted', Icon: AppWindow },
];
const STEPS = [1900, 2200, 2200, 2200];

export default function MonitorMock() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const { step } = useStepper(STEPS, visible, 3);
  const log = EVENTS.slice(0, step + 1).reverse();

  return (
    <div ref={ref} className="mock" role="img"
      aria-label="Illustrated mockup: a lecturer sees six students at once and signals are flagged on individual tiles">
      <div className="mock-chrome" aria-hidden="true"><span className="mock-url"><Users size={13} /> Monitoring: 6 students</span></div>
      <div className="mock-body mm-body" aria-hidden="true">
        <div className="mm-grid">
          {STUDENTS.map((name, i) => {
            const ev = EVENTS.slice(0, step + 1).find((e) => e.tile === i);
            const current = EVENTS[step].tile === i;
            return (
              <div key={name} className={`mm-tile${ev ? ' flagged' : ''}${current ? ' current' : ''}`}>
                <svg viewBox="0 0 80 60" className="mm-avatar"><circle cx="40" cy="22" r="11" /><path d="M16 60c2-14 12-20 24-20s22 6 24 20z" /></svg>
                <span className="mm-name">{name}</span>
                {ev && <span className="mm-badge"><ev.Icon size={11} /></span>}
              </div>
            );
          })}
        </div>
        <div className="mm-log">
          <p className="mm-log-title"><Eye size={14} /> Flagged for review</p>
          <ul>
            {log.map(({ tile, label, Icon }) => (
              <li key={`${tile}-${label}`}><Icon size={14} /> <span>{STUDENTS[tile]}</span> {label}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

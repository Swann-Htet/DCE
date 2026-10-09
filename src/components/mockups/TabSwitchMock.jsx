import { useRef } from 'react';
import { AlertTriangle, AppWindow, MousePointer2 } from 'lucide-react';
import { useInView, useStepper } from '../../lib/useStepper';

const STEPS = [1700, 1200, 1500, 2600]; // idle, cursor to other tab, on other tab, back + warning
const LIMIT = 3; // example limit only: lecturers choose their own

export default function TabSwitchMock() {
  const ref = useRef(null);
  const visible = useInView(ref);
  const { step, round } = useStepper(STEPS, visible, 3);
  const before = round % LIMIT;
  const count = Math.min(LIMIT, before + (step === 3 ? 1 : 0));
  const away = step === 2;
  const limit = count >= LIMIT && step === 3;

  return (
    <div ref={ref} className="mock" role="img"
      aria-label="Illustrated mockup: a student leaves the exam tab, sees a warning, and the tab-switch counter goes up">
      <div className="mock-chrome" aria-hidden="true">
        <div className="mock-tabs">
          <span className={`mock-tab${away ? '' : ' on'}`}>Online exam</span>
          <span className={`mock-tab${away ? ' on' : ''}`}><AppWindow size={12} /> Another tab</span>
        </div>
      </div>
      <div className="mock-body ts-body" aria-hidden="true">
        <div className={`ts-exam${away ? ' dim' : ''}`}>
          <div className="s-line w70" /><div className="s-line w50" />
          <ul className="s-opts">
            {[0, 1, 2].map((i) => <li key={i} className="s-opt-static"><b /><u /></li>)}
          </ul>
        </div>
        {away && (
          <div className="ts-other">
            <div className="s-line w70" /><div className="s-line" /><div className="s-line w50" />
          </div>
        )}
        <div className={`mock-banner${step === 3 ? ' show' : ''}`}>
          <AlertTriangle size={16} /> You have left the exam tab.
        </div>
        <div className={`mock-counter${step === 3 ? ' pulse' : ''}`}>
          <AppWindow size={14} /> Tab switches <strong>{count} / {LIMIT}</strong>
        </div>
        {limit && <div className="mock-flag">Limit reached: flagged for lecturer review</div>}
      </div>
      <MousePointer2 className={`mock-cursor ts-cursor s${step}`} size={22} fill="#fff" aria-hidden="true" />
    </div>
  );
}

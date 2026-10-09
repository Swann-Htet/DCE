import { useRef } from 'react';
import { AlertTriangle, MousePointer2, ScanLine } from 'lucide-react';
import { useInView } from '../../lib/useStepper';

// Pure CSS loop (9s). Cursor wanders inside the exam boundary, leaves it, triggers a warning, returns.
export default function CursorMock() {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div ref={ref} className={`mock cb${visible ? ' run' : ''}`} role="img"
      aria-label="Illustrated mockup: the cursor leaves the allowed exam area, the border flashes and a boundary warning appears">
      <div className="mock-chrome" aria-hidden="true"><span className="mock-url">Online exam</span></div>
      <div className="mock-body cb-body" aria-hidden="true">
        <div className="cb-box">
          <span className="cb-label"><ScanLine size={13} /> Exam area</span>
          <div className="s-line w70" /><div className="s-line w50" />
          <ul className="s-opts">
            {[0, 1, 2].map((i) => <li key={i} className="s-opt-static"><b /><u /></li>)}
          </ul>
        </div>
        <div className="cb-banner"><AlertTriangle size={16} /> You have moved outside the allowed boundary.</div>
        <div className="mock-counter">
          Cursor warnings
          <span className="cb-count"><strong className="c0">0</strong><strong className="c1">1</strong></span>
        </div>
        <MousePointer2 className="mock-cursor cb-cursor" size={22} fill="#fff" />
      </div>
    </div>
  );
}

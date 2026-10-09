import { useRef, useState } from 'react';
import { GraduationCap, Layout, Megaphone } from 'lucide-react';
import UxSurvey from '../components/surveys/UxSurvey';
import AdSurvey from '../components/surveys/AdSurvey';
import LecturerSurvey from '../components/surveys/LecturerSurvey';
import Intro from '../components/Intro';

const TABS = [
  { id: 'lec', label: 'Lecturer Panel Survey', Icon: GraduationCap, Panel: LecturerSurvey },
  { id: 'ux', label: 'Website UX Survey', Icon: Layout, Panel: UxSurvey },
  { id: 'ads', label: 'Advertising Preferences', Icon: Megaphone, Panel: AdSurvey },
];

export default function Feedback() {
  const [active, setActive] = useState(TABS[0].id); // Lecturer Panel Survey opens first
  const tabRefs = useRef({});

  // WAI-ARIA tabs: arrow keys (any direction), Home and End move between tabs.
  const onKeyDown = (e) => {
    const i = TABS.findIndex((t) => t.id === active);
    let next = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = TABS[(i + 1) % TABS.length];
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = TABS[(i - 1 + TABS.length) % TABS.length];
    if (e.key === 'Home') next = TABS[0];
    if (e.key === 'End') next = TABS[TABS.length - 1];
    if (next) {
      e.preventDefault();
      setActive(next.id);
      tabRefs.current[next.id]?.focus();
    }
  };

  return (
    <section className="screen screen-page screen-top feedback-wide" aria-labelledby="feedback-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container">
        <Intro as="h1" id="feedback-title" eyebrow="Feedback" title="Tell us how we did">
          Three short surveys: the lecturer panel, this website, and promotional content preferences. Pick any, or all.
        </Intro>
        <div role="tablist" aria-label="Surveys" className="tabs" onKeyDown={onKeyDown} data-reveal style={{ '--i': 3 }}>
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} type="button" role="tab" id={`tab-${id}`} aria-selected={active === id}
              aria-controls={`panel-${id}`} tabIndex={active === id ? 0 : -1}
              ref={(el) => { tabRefs.current[id] = el; }} className="tab" onClick={() => setActive(id)}>
              <Icon size={18} aria-hidden="true" /> {label}
            </button>
          ))}
        </div>
        {TABS.map(({ id, Panel }) => (
          <div key={id} role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} hidden={active !== id}>
            {/* Keep all mounted so switching tabs never discards in-progress answers. */}
            <Panel />
          </div>
        ))}
      </div>
    </section>
  );
}

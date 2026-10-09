import Icon from '../components/Icon';
import Intro from '../components/Intro';
import TabSwitchMock from '../components/mockups/TabSwitchMock';
import CursorMock from '../components/mockups/CursorMock';
import MonitorMock from '../components/mockups/MonitorMock';
import FaceMock from '../components/mockups/FaceMock';
import { FEATURES } from '../config/content';
import { SHOW_REVIEW_MARKERS } from '../config/site';

// Animated mockups are illustrations, not screenshots. `check` marks wording to confirm before launch.
const DEMOS = [
  {
    id: 'tab', label: 'Tab switching', eyebrow: 'In motion', title: 'Tab switching, detected',
    text: 'When a student leaves the exam tab, DCE counts it against the limit the lecturer set and shows the student a warning on screen. The count is kept with the attempt for review.',
    points: ['Counted per attempt', 'Limit set by the lecturer', 'Visible to lecturers in results'],
    Mock: TabSwitchMock,
  },
  {
    id: 'cursor', label: 'Cursor boundary', eyebrow: 'In motion', title: 'Cursor boundary warnings',
    text: 'The exam page has an allowed area. If the cursor leaves it, the student gets a warning and the event is counted against a lecturer-set limit.',
    points: ['Visual warning for the student', 'Separate counter and limit', 'Configured per exam'],
    Mock: CursorMock,
  },
  {
    id: 'monitor', label: 'Lecturer monitoring', eyebrow: 'In motion', title: 'Monitoring several students at once',
    text: 'A lecturer-side view is designed to keep many students in sight and surface the ones with flagged signals, so attention goes where it is needed.',
    points: ['Many students in one view', 'Flagged signals surface first', 'Lecturer decides what happens next'],
    Mock: MonitorMock,
    check: 'The lecturer monitoring page in the repository is a placeholder ("real-time warning stream will appear here"). The project report describes it as implemented; confirm before launch.',
  },
  {
    id: 'face', label: 'Face signals', eyebrow: 'In motion', title: 'Face signals, flagged for review',
    text: 'A concept for camera-based checks: head movement, eye movement or a second face in frame can be flagged as signals. They are prompts for a person to review, never proof of misconduct.',
    points: ['Head movement and eye movement', 'More than one face in frame', 'Always reviewed by a human'],
    Mock: FaceMock,
    check: 'Not found in the repository (only a pre-exam selfie exists). The report lists multiple-face and head-turn detection as objectives and excludes gaze tracking; confirm eye-movement wording before launch.',
  },
];

export default function Features() {
  return (
    <>
      <section className="screen screen-page" data-screen="Features" aria-labelledby="features-title">
        <div className="blob blob-soft" aria-hidden="true" />
        <div className="container">
          <Intro as="h1" id="features-title" eyebrow="Features" title="What DCE provides">
            Described as it works in the product today: six capabilities that cover exam setup, identity checks,
            monitoring signals and review.
          </Intro>
          <ul className="grid grid-3 plain">
            {FEATURES.map((f, i) => (
              <li key={f.title} className="card spotlight" data-reveal style={{ '--i': i + 2 }}>
                <span className="icon-chip"><Icon name={f.icon} /></span>
                <h2 className="card-title">{f.title}</h2>
                <p>{f.text}</p>
                {SHOW_REVIEW_MARKERS && f.check && <p className="review-marker">Wording to confirm: {f.check}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {DEMOS.map(({ id, label, eyebrow, title, text, points, Mock, check }, i) => (
        <section key={id} className={`screen demo-screen${i % 2 === 0 ? ' screen-tint' : ''}`} data-screen={label} aria-labelledby={`demo-${id}`}>
          <div className="container split demo-split">
            <div className={i % 2 ? 'demo-text flip' : 'demo-text'}>
              <Intro id={`demo-${id}`} eyebrow={eyebrow} title={title}>{text}</Intro>
              <ul className="plain demo-points" data-reveal style={{ '--i': 3 }}>
                {points.map((p) => <li key={p}><span className="fact-dot dark" aria-hidden="true" />{p}</li>)}
              </ul>
              {SHOW_REVIEW_MARKERS && check && <p className="review-marker">Wording to confirm: {check}</p>}
            </div>
            <figure className="demo-figure" data-reveal="scale" style={{ '--i': 2 }}>
              <Mock />
              <figcaption>Illustrative mockup, not a product screenshot.</figcaption>
            </figure>
          </div>
        </section>
      ))}
    </>
  );
}

import Icon from '../components/Icon';
import Intro from '../components/Intro';
import { ABOUT } from '../config/content';
import { INSTITUTION, PROGRAM } from '../config/site';
import { photoUrl, useTeam } from '../lib/supabase';

const initials = (name) => name.split(' ').map((w) => w[0]).join('').slice(0, 2);

// Profiles come from the database when available (editable in /admin); otherwise the static report data is used.
export default function About() {
  const db = useTeam();
  const students = db ? db.filter((m) => m.kind === 'student') : ABOUT.team.map((m) => ({ ...m, id: m.name }));
  const advisors = db ? db.filter((m) => m.kind === 'advisor') : [{ id: 'advisor', name: ABOUT.coordinator, role: 'Project Advisor and Coordinator' }];
  return (
    <>
      <section className="screen screen-page" data-screen="Story" aria-labelledby="about-title">
        <div className="blob blob-soft" aria-hidden="true" />
        <div className="container split">
          <div>
            <Intro as="h1" id="about-title" eyebrow="About us" title="Why we built DCE">
              DCE began as an Online Exam Proctoring System, a Bachelor of Engineering project in {PROGRAM} at {INSTITUTION}.
            </Intro>
            <p className="body-copy" data-reveal style={{ '--i': 3 }}>{ABOUT.background}</p>
            <p className="body-copy" data-reveal style={{ '--i': 4 }}>{ABOUT.problem}</p>
          </div>
          <div className="panel-red" data-reveal="scale" style={{ '--i': 2 }}>
            <span className="icon-chip icon-chip-lg on-red"><Icon name="Target" size={30} /></span>
            <p className="panel-kicker">Our approach</p>
            <p className="panel-text">{ABOUT.approach}</p>
          </div>
        </div>
      </section>

      <section className="screen screen-tint" data-screen="Objectives" aria-labelledby="about-obj">
        <div className="container">
          <Intro id="about-obj" eyebrow="Objectives" title="What we set out to do">As set out in our project report.</Intro>
          <ol className="grid grid-3 plain">
            {ABOUT.objectives.map((o, i) => (
              <li key={o} className="card spotlight" data-reveal style={{ '--i': i + 2 }}>
                <span className="t-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <p>{o}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="screen" data-screen="Team" aria-labelledby="about-team">
        <div className="container">
          <Intro id="about-team" eyebrow="The team" title="The people behind DCE">
            Three fourth-year students of the Bachelor of Engineering program in {PROGRAM}, School of Applied
            Digital Technology, {INSTITUTION}.
          </Intro>
          <ul className="grid grid-3 plain">
            {students.map((m, i) => (
              <li key={m.id} className="card person spotlight" data-reveal style={{ '--i': i + 2 }}>
                {m.photo_path
                  ? <img className="avatar avatar-photo" src={photoUrl(m.photo_path)} alt={`Photo of ${m.name}`} loading="lazy" width="96" height="96" />
                  : <span className="avatar" aria-hidden="true">{initials(m.name)}</span>}
                <h3 className="card-title">{m.name}</h3>
                <p>{m.role}</p>
                {m.bio && <p className="person-bio">{m.bio}</p>}
              </li>
            ))}
          </ul>
          {advisors.map((m) => (
            <div key={m.id} className="card coordinator" data-reveal style={{ '--i': 5 }}>
              {m.photo_path
                ? <img className="avatar avatar-photo" src={photoUrl(m.photo_path)} alt={`Photo of ${m.name}`} loading="lazy" width="96" height="96" />
                : <span className="icon-chip"><Icon name="GraduationCap" /></span>}
              <div>
                <p className="eyebrow">{m.role || 'Advisor'}</p>
                <h3 className="card-title">{m.name}</h3>
                {m.bio && <p>{m.bio}</p>}
                <p>Examination committee: {ABOUT.committee.join(' and ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="screen screen-tint" data-screen="Limits" aria-labelledby="about-scope">
        <div className="container split">
          <Intro id="about-scope" eyebrow="Scope and limitations" title="What DCE is, and is not">
            We would rather be open about the limits. These points come directly from our report.
          </Intro>
          <ul className="plain limits">
            {ABOUT.limitations.map((l, i) => (
              <li key={l} className="card" data-reveal style={{ '--i': i + 1 }}><p>{l}</p></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

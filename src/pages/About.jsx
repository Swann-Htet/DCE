import Icon from '../components/Icon';
import Intro from '../components/Intro';
import Linkify from '../components/Linkify';
import { ABOUT, LOGO_STORY } from '../config/content';
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

      <section className="screen" data-screen="Our logo" aria-labelledby="about-logo">
        <div className="container logo-story">
          <div className="logo-stage" data-reveal="scale" style={{ '--i': 1 }}>
            <img src="/dce-logo.png" alt="The DCE logo: the letters D, C and E in bright and dark red, with a graduation cap on the D and a check mark inside the C" width="560" height="288" loading="lazy" />
            <ul className="swatches plain">
              {LOGO_STORY.colours.map((c) => (
                <li key={c.name}><i style={{ background: c.hex }} aria-hidden="true" /><span>{c.name}</span><code>{c.hex}</code></li>
              ))}
            </ul>
          </div>
          <div>
            <Intro id="about-logo" eyebrow="Our logo" title="Why this logo, and why these reds">{LOGO_STORY.intro}</Intro>
            <ul className="plain logo-parts">
              {LOGO_STORY.parts.map((p, i) => (
                <li key={p.title} data-reveal style={{ '--i': i + 2 }}>
                  <span className="icon-chip"><Icon name={p.icon} /></span>
                  <div><h3 className="card-title">{p.title}</h3><p>{p.text}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="screen screen-tint" data-screen="Colours" aria-labelledby="about-colours">
        <div className="container">
          <Intro id="about-colours" eyebrow="Our colours" title="Red and dark red: what they represent">{LOGO_STORY.together}</Intro>
          <ul className="grid grid-2 plain">
            {LOGO_STORY.colours.map((c, i) => (
              <li key={c.name} className="card colour-card" data-reveal style={{ '--i': i + 2 }}>
                <span className="colour-dot" style={{ background: c.hex }} aria-hidden="true" />
                <div><h3 className="card-title">{c.name} <code>{c.hex}</code></h3><p>{c.meaning}</p></div>
              </li>
            ))}
          </ul>
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
                {m.bio && <p className="person-bio"><Linkify text={m.bio} /></p>}
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
                {m.bio && <p className="person-bio"><Linkify text={m.bio} /></p>}
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

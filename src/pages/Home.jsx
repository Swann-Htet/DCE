import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, GraduationCap, Layers, Route as RouteIcon, ShieldCheck, Users } from 'lucide-react';
import Icon from '../components/Icon';
import Intro from '../components/Intro';
import Words from '../components/Words';
import HeroStage from '../components/HeroStage';
import { VALUE_POINTS } from '../config/content';
import { INSTITUTION, PROGRAM } from '../config/site';

const EXPLORE = [
  { to: '/features', icon: Layers, title: 'Features', text: 'Exam management, identity checks and configurable monitoring.' },
  { to: '/how-it-works', icon: RouteIcon, title: 'How it works', text: 'From exam setup to lecturer review, in four steps.' },
  { to: '/security', icon: ShieldCheck, title: 'Security & privacy', text: 'What we claim, and what we deliberately do not.' },
  { to: '/about', icon: Users, title: 'About us', text: 'The students and advisor behind DCE.' },
];

const FACTS = [
  'Used for online examinations in the program',
  'Designed and built by students of the program',
  'A prototype for academic use, with its limits stated openly',
];

export default function Home() {
  return (
    <>
      <section className="screen screen-hero" data-screen="Overview" aria-labelledby="hero-title">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="blob blob-2" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <p className="eyebrow eyebrow-light fade-up">For universities and educational institutions</p>
            <h1 id="hero-title" className="display">
              <Words text="Your Trusted Partner for Secure Online Examinations" />
            </h1>
            <p className="lead lead-light fade-up" style={{ '--i': 9 }}>
              Bring exam management, identity verification, and online proctoring into one streamlined
              experience designed for educational institutions.
            </p>
            <div className="btn-row fade-up" style={{ '--i': 11 }}>
              <Link to="/demo" className="btn btn-light btn-lg magnetic">Request a Demo <ArrowRight size={18} aria-hidden="true" /></Link>
              <Link to="/features" className="btn btn-outline-light btn-lg">Explore Features</Link>
            </div>
            <p className="hero-meta fade-up" style={{ '--i': 13 }}>
              <GraduationCap size={18} aria-hidden="true" /> In use at {INSTITUTION}
            </p>
          </div>
          <HeroStage />
        </div>
        <div className="scroll-cue" aria-hidden="true"><span /></div>
      </section>

      <section className="screen" data-screen="Value" aria-labelledby="value-title">
        <div className="container">
          <Intro eyebrow="Why DCE" id="value-title" title="Built for careful, reviewable assessment">
            DCE helps your team run online exams and gives lecturers the information they need to review what
            happened. It supports human judgement; it does not replace it.
          </Intro>
          <ul className="grid grid-4 plain">
            {VALUE_POINTS.map((p, i) => (
              <li key={p.title} className="card spotlight" data-reveal style={{ '--i': i + 2 }}>
                <span className="icon-chip"><Icon name={p.icon} /></span>
                <h3 className="card-title">{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="screen screen-tint" data-screen="Explore" aria-labelledby="explore-title">
        <div className="container">
          <Intro eyebrow="Explore" id="explore-title" title="Find what you need">
            Each part of DCE has its own page, so you can go straight to the detail you care about.
          </Intro>
          <ul className="grid grid-4 plain">
            {EXPLORE.map(({ to, icon: Ico, title, text }, i) => (
              <li key={to} data-reveal style={{ '--i': i + 2 }}>
                <Link to={to} className="tile spotlight">
                  <span className="icon-chip"><Ico size={22} aria-hidden="true" strokeWidth={1.75} /></span>
                  <h3 className="card-title">{title}</h3>
                  <p>{text}</p>
                  <span className="tile-arrow" aria-hidden="true"><ArrowUpRight size={20} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="screen" data-screen="In use" aria-labelledby="usage-title">
        <div className="container split">
          <div>
            <Intro eyebrow="In use today" id="usage-title" title={`Currently used at ${INSTITUTION}`}>
              DCE is used for online examinations in the {PROGRAM} program at {INSTITUTION}. It was built by
              students of that program as a university-oriented alternative to costly or rigid commercial tools.
            </Intro>
            <div className="btn-row" data-reveal style={{ '--i': 3 }}>
              <Link to="/about" className="btn btn-primary btn-lg magnetic">Meet the team <ArrowRight size={18} aria-hidden="true" /></Link>
            </div>
          </div>
          <div className="panel-red" data-reveal="scale" style={{ '--i': 2 }}>
            <span className="icon-chip icon-chip-lg on-red"><GraduationCap size={32} aria-hidden="true" strokeWidth={1.6} /></span>
            <p className="panel-kicker">{INSTITUTION}</p>
            <p className="panel-title">{PROGRAM}</p>
            <ul className="plain facts">
              {FACTS.map((f) => <li key={f}><span aria-hidden="true" className="fact-dot" />{f}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section className="screen screen-dark" data-screen="Get started" aria-labelledby="cta-title">
        <div className="blob blob-1" aria-hidden="true" />
        <div className="grid-bg" aria-hidden="true" />
        <div className="container center-stack">
          <p className="eyebrow eyebrow-light" data-reveal>Get started</p>
          <h2 id="cta-title" className="display-md light" data-reveal style={{ '--i': 1 }}>Ready to Rethink Online Examinations?</h2>
          <p className="lead lead-light" data-reveal style={{ '--i': 2 }}>
            Tell us about your institution and what you need from online exams. We will get in touch to
            discuss your needs and arrange a product demonstration.
          </p>
          <div className="btn-row center-row" data-reveal style={{ '--i': 3 }}>
            <Link to="/demo" className="btn btn-light btn-lg magnetic">Request a Demo <ArrowRight size={18} aria-hidden="true" /></Link>
            <Link to="/how-it-works" className="btn btn-outline-light btn-lg">See How It Works</Link>
          </div>
        </div>
      </section>
    </>
  );
}

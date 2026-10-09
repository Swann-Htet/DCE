import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, TriangleAlert } from 'lucide-react';
import Intro from '../components/Intro';
import BrandLogo from '../components/BrandLogo';
import {
  ADVISOR, COLLECTED, ISO, ISO_NOTE, MFU, NOT_COLLECTED, OWNERS, POLICY_DATE, POLICY_VERSION, PROCESSORS,
  RETENTION, RIGHTS, RIGHTS_NOTE, SECTIONS, SECURITY,
} from '../config/legal';
import { CONTACT_EMAIL, INSTITUTION, PROGRAM } from '../config/site';

const SCHOOL = 'School of Applied Digital Technology';

export default function Privacy() {
  const [active, setActive] = useState(SECTIONS[0].id);

  // Highlight the table-of-contents entry for the section being read.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: '-20% 0px -70% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="screen screen-page" aria-labelledby="privacy-title">
        <div className="blob blob-soft" aria-hidden="true" />
        <div className="container split">
          <div>
            <Intro as="h1" id="privacy-title" eyebrow="Legal" title="Privacy Policy">
              How DCE handles personal data: who owns it, what we collect, which standards guide us and which
              university rules apply.
            </Intro>
            <p className="legal-meta" data-reveal style={{ '--i': 3 }}>Version {POLICY_VERSION} · Last updated {POLICY_DATE}</p>
            <div className="notice notice-info" role="note" data-reveal style={{ '--i': 4 }}>
              <TriangleAlert size={22} aria-hidden="true" />
              <div>
                <p className="notice-title">Draft policy, pending review.</p>
                <p>
                  This policy is being reviewed by the project advisor. References to university regulations are
                  general and will be updated with their official titles once the university confirms them.
                </p>
              </div>
            </div>
          </div>
          <div className="panel-light" data-reveal="scale" style={{ '--i': 2 }}>
            <p className="panel-kicker dark">Project owners</p>
            <ul className="plain owners">
              {OWNERS.map((o) => <li key={o.name}><strong>{o.name}</strong><span>{o.role}</span></li>)}
            </ul>
            <p className="owners-advisor"><span>Advisor and coordinator</span>{ADVISOR}</p>
            <div className="logo-row">
              <BrandLogo height={52} />
              <img src="/dce-department.png" alt={`${PROGRAM}, ${INSTITUTION}`} width="64" height="64" loading="lazy" />
            </div>
            <p className="logo-caption">{PROGRAM}, {SCHOOL}, {INSTITUTION}</p>
          </div>
        </div>
      </section>

      <section className="legal-wrap" aria-label="Policy text">
        <div className="container legal">
          <nav className="toc" aria-label="On this page">
            <p className="toc-title">On this page</p>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}><a href={`#${s.id}`} className={active === s.id ? 'is-active' : ''} aria-current={active === s.id ? 'true' : undefined}>{s.title}</a></li>
              ))}
            </ol>
          </nav>

          <article className="legal-body">
            <section id="who">
              <h2>Who we are</h2>
              <p>
                DCE is a university project by {OWNERS.map((o) => o.name).join(', ')}, students of the Bachelor of Engineering
                program in {PROGRAM}, {SCHOOL}, {INSTITUTION}. The project advisor and coordinator is {ADVISOR}.
              </p>
              <p>
                The three project owners decide why and how data collected through this website is used (the &ldquo;data
                controller&rdquo;). DCE is an academic prototype, not a commercial company.
              </p>
            </section>

            <section id="scope">
              <h2>What this policy covers</h2>
              <p>
                This policy covers this website: the information pages, the demo request form, the three surveys and the
                administrator panel. The exam application itself is used inside university courses under the course
                rules set by each lecturer and under the university&rsquo;s regulations (see &ldquo;MFU rules and regulations&rdquo;).
              </p>
            </section>

            <section id="collect">
              <h2>What we collect and why</h2>
              <div className="legal-table" role="region" aria-label="Data we collect" tabIndex={0}>
                <table>
                  <thead><tr><th>Source</th><th>What we collect</th><th>Why</th></tr></thead>
                  <tbody>
                    {COLLECTED.map((c) => <tr key={c.what}><th scope="row">{c.what}</th><td>{c.data}</td><td>{c.why}</td></tr>)}
                  </tbody>
                </table>
              </div>
              <p>{NOT_COLLECTED}</p>
              <p>
                <strong>Legal basis.</strong> We rely on your consent for demo requests and survey answers, which you give by
                submitting the form (the demo form has a consent box). We rely on our legitimate interest in keeping the site
                and the admin panel secure for hosting logs and administrator accounts. This follows Thailand&rsquo;s Personal
                Data Protection Act B.E. 2562 (2019).
              </p>
            </section>

            <section id="sharing">
              <h2>Who handles your data</h2>
              <p>We do not sell personal data and we do not share it with advertisers. These service providers process data for us:</p>
              <ul className="legal-list">
                {PROCESSORS.map((p) => <li key={p.name}><strong>{p.name}.</strong> {p.does}</li>)}
              </ul>
              <p>
                These providers may store or process data outside Thailand. We choose providers with appropriate security
                practices and share only what the service needs. We may disclose data if the law or a university authority
                requires it.
              </p>
            </section>

            <section id="retention">
              <h2>How long we keep it</h2>
              <div className="legal-table" role="region" aria-label="Retention periods" tabIndex={0}>
                <table>
                  <thead><tr><th>Data</th><th>Kept for</th></tr></thead>
                  <tbody>{RETENTION.map((r) => <tr key={r.item}><th scope="row">{r.item}</th><td>{r.period}</td></tr>)}</tbody>
                </table>
              </div>
              <p>You can ask us to delete your data sooner at any time.</p>
            </section>

            <section id="security">
              <h2>How we protect it</h2>
              <ul className="legal-list">{SECURITY.map((s) => <li key={s}>{s}</li>)}</ul>
            </section>

            <section id="iso">
              <h2>ISO standards we use as guidance</h2>
              <p className="legal-callout"><ShieldCheck size={18} aria-hidden="true" /> {ISO_NOTE}</p>
              <div className="legal-table" role="region" aria-label="ISO standards" tabIndex={0}>
                <table>
                  <thead><tr><th>Standard</th><th>Topic</th><th>How we apply it</th></tr></thead>
                  <tbody>{ISO.map((i) => <tr key={i.std}><th scope="row">{i.std}</th><td>{i.topic}</td><td>{i.how}</td></tr>)}</tbody>
                </table>
              </div>
            </section>

            <section id="mfu">
              <h2>MFU rules and regulations</h2>
              <ul className="legal-list">{MFU.map((m) => <li key={m}>{m}</li>)}</ul>
            </section>

            <section id="rights">
              <h2>Your rights</h2>
              <p>Under Thailand&rsquo;s Personal Data Protection Act you can:</p>
              <ul className="legal-list">{RIGHTS.map((r) => <li key={r}>{r}</li>)}</ul>
              <p>{RIGHTS_NOTE}</p>
            </section>

            <section id="other">
              <h2>Cookies, children and surveys</h2>
              <ul className="legal-list">
                <li><strong>Cookies and similar storage.</strong> Visitors are not tracked and the site sets no advertising or analytics cookies. When an administrator signs in, the browser keeps a sign-in session so they stay signed in.</li>
                <li><strong>Children.</strong> This website is for university staff, students and institutions. It is not directed at children, and we do not knowingly collect their data.</li>
                <li><strong>Promotional content.</strong> The advertising survey only asks about preferences. No ad network is used, answers are not used to target individuals, and promotional content will never appear during an active exam or inside the exam application.</li>
              </ul>
            </section>

            <section id="changes">
              <h2>Changes and contact</h2>
              <p>
                We will update this policy when how we handle data changes, and show the new version and date at the top of
                this page. Material changes will be announced on the site.
              </p>
              <p>
                <strong>Contact.</strong>{' '}
                {CONTACT_EMAIL
                  ? <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                  : <>use the <Link to="/demo">demo request form</Link>, or speak to the project advisor at {INSTITUTION}.</>}
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

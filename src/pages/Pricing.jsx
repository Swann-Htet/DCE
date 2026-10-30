import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import Intro from '../components/Intro';
import { usePricing } from '../lib/supabase';
import { safeLink } from '../config/pricing';
import '../styles/pricing.css';

function PlanCard({ plan, index }) {
  const href = safeLink(plan.cta_link);
  const external = href.startsWith('https://');
  const cta = (
    <>{plan.cta_label} <ArrowUpRight size={16} aria-hidden="true" /></>
  );
  return (
    <li className={`card plan${plan.highlight ? ' plan-featured' : ''}`} data-reveal style={{ '--i': index + 2 }}>
      {plan.highlight && plan.badge_text && <span className="plan-badge">{plan.badge_text}</span>}
      <h2 className="plan-name">{plan.name}</h2>
      {plan.tagline && <p className="plan-tagline">{plan.tagline}</p>}
      <p className="plan-price">
        <strong>{plan.price_text}</strong>
        {plan.price_note && <span>{plan.price_note}</span>}
      </p>
      <ul className="plain plan-features" aria-label={`${plan.name} includes`}>
        {(plan.features || []).map((f) => (
          <li key={f}><Check size={18} aria-hidden="true" /><span>{f}</span></li>
        ))}
      </ul>
      {external
        ? <a href={href} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`} rel="noopener noreferrer">{cta}</a>
        : <Link to={href} className={`btn ${plan.highlight ? 'btn-primary' : 'btn-outline'}`}>{cta}</Link>}
    </li>
  );
}

export default function Pricing() {
  const { plans, text } = usePricing();
  return (
    <section className="screen screen-page" data-screen="Pricing" aria-labelledby="pricing-title">
      <div className="blob blob-soft" aria-hidden="true" />
      <div className="container">
        <Intro as="h1" id="pricing-title" eyebrow="Pricing" title="Plans that grow with your institution">
          {text.intro}
        </Intro>
        <ul className="plain pricing-grid">
          {plans.map((p, i) => <PlanCard key={p.slug || p.id || p.name} plan={p} index={i} />)}
        </ul>
        {text.footnote && <p className="pricing-note" data-reveal style={{ '--i': 6 }}>{text.footnote}</p>}
      </div>
    </section>
  );
}

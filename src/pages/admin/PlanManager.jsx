import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Pencil, Plus, Save, Star, Trash2, X } from 'lucide-react';
import Field from '../../components/forms/Field';
import { supabase } from '../../lib/supabase';
import { DEFAULT_PLANS, DEFAULT_PRICING_TEXT } from '../../config/pricing';

const EMPTY = {
  id: null, slug: '', sort_order: 0, is_active: true, name: '', tagline: '', price_text: '', price_note: '',
  featuresText: '', highlight: false, badge_text: '', cta_label: 'Request a demo', cta_link: '/demo',
};
const LINK_OK = /^(\/[A-Za-z0-9/_?=&%.-]*|https:\/\/\S+)$/;
const slugOf = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
const toForm = (p) => ({ ...EMPTY, ...p, tagline: p.tagline || '', price_note: p.price_note || '', badge_text: p.badge_text || '', featuresText: (p.features || []).join('\n') });
const missingTable = (err) => /pricing_(plans|settings)|schema cache|does not exist/i.test(err?.message || '');

export default function PlanManager() {
  const [plans, setPlans] = useState(null);
  const [text, setText] = useState(DEFAULT_PRICING_TEXT);
  const [form, setForm] = useState(null); // null = closed
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const [p, s] = await Promise.all([
      supabase.from('pricing_plans').select('*').order('sort_order').order('created_at'),
      supabase.from('pricing_settings').select('*').eq('id', 1).maybeSingle(),
    ]);
    if (p.error) {
      setPlans([]);
      setError(missingTable(p.error) ? 'The pricing tables do not exist yet. Run supabase/pricing.sql in the Supabase SQL Editor, then reload.' : p.error.message);
      return;
    }
    setError('');
    setPlans(p.data);
    if (s.data) setText({ intro: s.data.intro || '', footnote: s.data.footnote || '' });
  }, []);
  useEffect(() => { load(); }, [load]);

  const flash = (msg) => { setNotice(msg); setTimeout(() => setNotice(''), 4000); };
  const open = (p) => { setForm(p ? toForm(p) : { ...EMPTY, sort_order: (plans?.length || 0) + 1 }); setError(''); };
  const close = () => setForm(null);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: k === 'sort_order' ? Number(e.target.value) : e.target.value }));
  const flag = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  const save = async (e) => {
    e.preventDefault();
    const features = form.featuresText.split('\n').map((l) => l.trim()).filter(Boolean);
    const slug = form.id ? form.slug : slugOf(form.slug || form.name);
    if (!form.name.trim()) { setError('Plan name is required.'); return; }
    if (!form.price_text.trim()) { setError('Price is required (for example "THB 19,900", "Free" or "Custom").'); return; }
    if (!slug) { setError('The plan needs a name made of letters or numbers.'); return; }
    if (features.length > 16) { setError('A plan can list at most 16 features.'); return; }
    if (features.some((f) => f.length > 200)) { setError('Each feature line must be 200 characters or fewer.'); return; }
    if (!LINK_OK.test(form.cta_link.trim())) { setError('The button link must start with / (a page on this site) or https://.'); return; }

    const row = {
      slug, sort_order: form.sort_order || 0, is_active: form.is_active, name: form.name.trim(),
      tagline: form.tagline.trim() || null, price_text: form.price_text.trim(), price_note: form.price_note.trim() || null,
      features, highlight: form.highlight, badge_text: form.badge_text.trim() || null,
      cta_label: form.cta_label.trim() || 'Request a demo', cta_link: form.cta_link.trim(),
    };
    setBusy(true);
    setError('');
    const res = form.id ? await supabase.from('pricing_plans').update(row).eq('id', form.id) : await supabase.from('pricing_plans').insert(row);
    setBusy(false);
    if (res.error) { setError(/duplicate key/i.test(res.error.message) ? 'Another plan already uses that name. Choose a different name.' : res.error.message); return; }
    close();
    flash('Plan saved. It is live on the Pricing page now.');
    load();
  };

  const toggle = async (p) => {
    const { error: err } = await supabase.from('pricing_plans').update({ is_active: !p.is_active }).eq('id', p.id);
    if (err) setError(err.message); else load();
  };

  const remove = async (p) => {
    if (!window.confirm(`Delete the "${p.name}" plan? This cannot be undone. (Use Hide to keep it but not show it.)`)) return;
    const { error: err } = await supabase.from('pricing_plans').delete().eq('id', p.id);
    if (err) setError(err.message); else load();
  };

  const saveText = async (e) => {
    e.preventDefault();
    setBusy(true);
    const { error: err } = await supabase.from('pricing_settings').upsert({ id: 1, intro: text.intro.trim() || null, footnote: text.footnote.trim() || null });
    setBusy(false);
    if (err) setError(err.message); else { setError(''); flash('Page texts saved.'); }
  };

  const loadSuggested = async () => {
    setBusy(true);
    const rows = DEFAULT_PLANS.map((p) => ({ ...p, badge_text: p.badge_text || null }));
    const { error: err } = await supabase.from('pricing_plans').insert(rows);
    if (!err) await supabase.from('pricing_settings').upsert({ id: 1, ...DEFAULT_PRICING_TEXT });
    setBusy(false);
    if (err) setError(err.message); else { flash('Suggested plans added. Edit them to match your real prices.'); load(); }
  };

  return (
    <>
      <div className="admin-head">
        <h1 className="admin-title">Pricing plans</h1>
        <div className="btn-row-tight">
          <Link to="/pricing" target="_blank" className="btn btn-sm btn-ghost">View public page</Link>
          {!form && <button type="button" className="btn btn-sm btn-primary" onClick={() => open(null)}><Plus size={16} aria-hidden="true" /> Add plan</button>}
        </div>
      </div>
      <p className="admin-note">These plans appear on the public Pricing page the moment you save. Three plans work best; hide a plan instead of deleting it if you may need it again.</p>
      {error && <div className="notice notice-error" role="alert"><p>{error}</p></div>}
      {notice && <div className="notice" role="status"><p>{notice}</p></div>}

      {form && (
        <form className="card admin-panel plan-form" onSubmit={save} noValidate aria-label={form.id ? 'Edit plan' : 'Add plan'}>
          <h2 className="panel-h">{form.id ? `Edit ${form.name || 'plan'}` : 'Add plan'}</h2>
          <div className="form-grid">
            <Field id="pl-name" label="Plan name" required maxLength={60} value={form.name} onChange={set('name')} />
            <Field id="pl-order" label="Display order (smaller first)" type="number" value={form.sort_order} onChange={set('sort_order')} />
            <Field id="pl-price" label="Price" required maxLength={40} value={form.price_text} onChange={set('price_text')}
              hint={'Shown large, for example "THB 19,900", "Free" or "Custom".'} />
            <Field id="pl-note" label="Price note" maxLength={120} value={form.price_note} onChange={set('price_note')}
              hint={'Shown under the price, for example "per department, per year".'} />
          </div>
          <Field id="pl-tagline" label="Short description" maxLength={200} value={form.tagline} onChange={set('tagline')} />
          <Field id="pl-features" label="What is included" as="textarea" rows={8} value={form.featuresText} onChange={set('featuresText')}
            hint="One feature per line, up to 16 lines." />
          <div className="form-grid">
            <Field id="pl-cta" label="Button text" maxLength={40} value={form.cta_label} onChange={set('cta_label')} />
            <Field id="pl-link" label="Button link" maxLength={300} value={form.cta_link} onChange={set('cta_link')}
              hint="A page on this site such as /demo?plan=department, or a full https:// address." />
          </div>
          <div className="plan-flags">
            <label className="plan-flag"><input type="checkbox" checked={form.highlight} onChange={flag('highlight')} /> Highlight as the recommended plan</label>
            {form.highlight && (
              <Field id="pl-badge" label="Badge text" maxLength={30} value={form.badge_text} onChange={set('badge_text')} hint='For example "Recommended" or "Most popular".' />
            )}
            <label className="plan-flag"><input type="checkbox" checked={form.is_active} onChange={flag('is_active')} /> Show this plan on the Pricing page</label>
          </div>
          <div className="btn-row-tight">
            <button type="submit" className="btn btn-primary" disabled={busy}><Save size={16} aria-hidden="true" /> {busy ? 'Saving...' : 'Save plan'}</button>
            <button type="button" className="btn btn-ghost" onClick={close}><X size={16} aria-hidden="true" /> Cancel</button>
          </div>
        </form>
      )}

      <ul className="team-list plain">
        {(plans || []).map((p) => (
          <li key={p.id} className="card team-row plan-row">
            <div className="team-info">
              <strong>{p.name} {p.highlight && <Star size={14} aria-label="Recommended plan" className="plan-star" />}</strong>
              <span>{p.price_text}{p.price_note ? ` - ${p.price_note}` : ''}</span>
              <small className="pill">{p.is_active ? `Shown, order ${p.sort_order}` : 'Hidden'}</small>
            </div>
            <div className="team-actions">
              <button type="button" className="icon-btn" aria-label={`${p.is_active ? 'Hide' : 'Show'} ${p.name}`} onClick={() => toggle(p)}>
                {p.is_active ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button type="button" className="icon-btn" aria-label={`Edit ${p.name}`} onClick={() => open(p)}><Pencil size={16} /></button>
              <button type="button" className="icon-btn danger" aria-label={`Delete ${p.name}`} onClick={() => remove(p)}><Trash2 size={16} /></button>
            </div>
          </li>
        ))}
        {plans && plans.length === 0 && !error && (
          <li className="admin-empty">
            No plans saved yet, so visitors see the built-in suggested plans.{' '}
            <button type="button" className="btn btn-sm btn-primary" onClick={loadSuggested} disabled={busy}>Add the suggested plans</button>
          </li>
        )}
      </ul>

      <form className="card admin-panel plan-form" onSubmit={saveText} aria-label="Pricing page texts">
        <h2 className="panel-h">Page texts</h2>
        <Field id="pt-intro" label="Introduction under the title" as="textarea" rows={2} maxLength={400} value={text.intro} onChange={(e) => setText((t) => ({ ...t, intro: e.target.value }))} />
        <Field id="pt-foot" label="Small print under the plans" as="textarea" rows={3} maxLength={400} value={text.footnote}
          onChange={(e) => setText((t) => ({ ...t, footnote: e.target.value }))} hint="For example currency, VAT and how student limits are counted." />
        <div className="btn-row-tight">
          <button type="submit" className="btn btn-primary" disabled={busy}><Save size={16} aria-hidden="true" /> Save texts</button>
        </div>
      </form>
    </>
  );
}

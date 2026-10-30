import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/forms';
import { DEFAULT_PLANS, DEFAULT_PRICING_TEXT } from '../config/pricing';

// null when Supabase is not configured (the public site then falls back to static content).
export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

export const PHOTO_BUCKET = 'team-photos';
export const photoUrl = (path) => (supabase && path ? supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl : null);

// Public team/advisor profiles. Returns null while loading or when unavailable, so callers can fall back.
export function useTeam() {
  const [members, setMembers] = useState(null);
  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    supabase.from('team_members').select('*').order('sort_order').order('created_at').then(({ data, error }) => {
      if (alive && !error && data?.length) setMembers(data);
    });
    return () => { alive = false; };
  }, []);
  return members;
}

// Public pricing. Starts with the built-in defaults so the page is never empty, then swaps in what the admin saved
// (active plans only). If Supabase is off, the table is missing or it holds no plans, the defaults stay.
export function usePricing() {
  const [state, setState] = useState({ plans: DEFAULT_PLANS, text: DEFAULT_PRICING_TEXT, custom: false });
  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    Promise.all([
      supabase.from('pricing_plans').select('*').eq('is_active', true).order('sort_order').order('created_at'),
      supabase.from('pricing_settings').select('*').eq('id', 1).maybeSingle(),
    ]).then(([p, s]) => {
      if (!alive || p.error || !p.data?.length) return;
      setState({ plans: p.data, text: { ...DEFAULT_PRICING_TEXT, ...(s.data ? { intro: s.data.intro ?? '', footnote: s.data.footnote ?? '' } : {}) }, custom: true });
    });
    return () => { alive = false; };
  }, []);
  return state;
}

// Auth state for the admin panel. isAdmin comes from the database (is_admin()), not from the browser.
export function useAdminSession() {
  const [state, setState] = useState({ loading: Boolean(supabase), session: null, isAdmin: false });
  useEffect(() => {
    if (!supabase) return undefined;
    let alive = true;
    const check = async (session) => {
      if (!session) { if (alive) setState({ loading: false, session: null, isAdmin: false }); return; }
      const { data, error } = await supabase.rpc('is_admin');
      if (alive) setState({ loading: false, session, isAdmin: !error && data === true });
    };
    supabase.auth.getSession().then(({ data }) => check(data.session));
    // Do not call Supabase inside this callback directly (it can deadlock); defer instead.
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => { setTimeout(() => check(session), 0); });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);
  return state;
}

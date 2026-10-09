import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../config/forms';

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

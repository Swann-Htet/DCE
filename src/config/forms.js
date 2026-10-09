// FORM DELIVERY (checked in this order)
// 1. Supabase  - set the project URL + anon key (production plan, see supabase/schema.sql).
//                Accepted names: VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY, or the names the Vercel Supabase
//                integration creates: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
// 2. Endpoint  - set VITE_DEMO_ENDPOINT / VITE_FEEDBACK_ENDPOINT to any URL accepting POST + JSON
//                (the local dev collector at /api/* uses this).
// 3. Neither   - forms validate but never report success.
//
// The anon key is meant to be public: it only has the rights granted by Row Level Security.
// vite.config.js exposes ONLY variables starting with VITE_ or NEXT_PUBLIC_ to the browser, so server secrets
// (SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SECRET_KEY, POSTGRES_URL ...) are never bundled.
const env = import.meta.env;
export const SUPABASE_URL = (env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
// Use the legacy "anon" JWT key here, not the sb_publishable key (it is sent as a Bearer token).
export const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
export const DEMO_ENDPOINT = env.VITE_DEMO_ENDPOINT || '';
export const FEEDBACK_ENDPOINT = env.VITE_FEEDBACK_ENDPOINT || '';

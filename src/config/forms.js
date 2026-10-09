// FORM DELIVERY (checked in this order)
// 1. Supabase  - set VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY (production plan, see supabase/schema.sql).
// 2. Endpoint  - set VITE_DEMO_ENDPOINT / VITE_FEEDBACK_ENDPOINT to any URL accepting POST + JSON
//                (the local dev collector at /api/* uses this).
// 3. Neither   - forms validate but never report success.
//
// The anon key is meant to be public: it only has the INSERT rights granted by Row Level Security.
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const DEMO_ENDPOINT = import.meta.env.VITE_DEMO_ENDPOINT || '';
export const FEEDBACK_ENDPOINT = import.meta.env.VITE_FEEDBACK_ENDPOINT || '';

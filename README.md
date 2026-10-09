# Marketing Website and Feedback Surveys

Public marketing site for the online exam proctoring system in `D:\DCE EXAM\dce-exam-system`.
It is a **separate project** and does not touch or duplicate the exam app.

Stack matches the existing client: React 18, Vite 5, React Router 6, lucide-react. Font: DM Sans.

```bash
npm install
npm run dev     # http://localhost:5174
npm run lint
npm run build
```

Routes: `/` (home), `/features`, `/how-it-works`, `/security`, `/about`, `/demo` (demo request), `/feedback` (UX survey and advertising survey), `/privacy` (placeholder).

## Deploy: Supabase (database) + Vercel (frontend)

1. Supabase: create a project, run `supabase/schema.sql` in the SQL Editor.
2. Copy Project URL and anon key (Project Settings -> API) into `.env.local` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`), then `npm run dev` and submit a test form.
3. Push this folder to GitHub, import it in Vercel (framework: Vite, build `npm run build`, output `dist`), add the same two variables under Settings -> Environment Variables, deploy.
4. Read answers in Supabase -> Table Editor (`demo_requests`, `survey_responses`), export CSV from there.

`vercel.json` rewrites all paths to `index.html` so deep links such as `/features` work.

## Still needs configuring before launch

1. **Contact** - `VITE_CONTACT_EMAIL` (empty today, so the footer shows a placeholder). Product name is "DCE".
2. **Privacy Policy** - `/privacy` is a placeholder; supply the real, reviewed policy. Demo requests contain personal data (name, email).
3. **Wording to confirm** - see `check` entries in `src/config/content.js` (run with `VITE_SHOW_REVIEW_MARKERS=true` to see them on the page).

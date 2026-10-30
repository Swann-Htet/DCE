-- Run AFTER admin.sql: Supabase -> SQL Editor -> New query -> paste -> Run. Safe to run again.
--
-- Adds the pricing plans shown on /pricing. The public (anon) can only READ active plans; only admins listed in
-- public.admins can add, edit or delete (same is_admin() rule as the team profiles). Edit them in Admin -> Pricing.
-- Prices below are SUGGESTED STARTING POINTS for a business decision, not an agreed price list.

-- 1) Plans --------------------------------------------------------------------------------------------------------
create table if not exists public.pricing_plans (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  slug        text not null unique check (slug ~ '^[a-z0-9-]{1,40}$'),
  sort_order  int not null default 0,
  is_active   boolean not null default true,
  name        text not null check (char_length(name) between 1 and 60),
  tagline     text check (char_length(tagline) <= 200),
  price_text  text not null check (char_length(price_text) between 1 and 40),     -- e.g. 'THB 19,900' or 'Custom'
  price_note  text check (char_length(price_note) <= 120),                        -- e.g. 'per department, per year'
  features    text[] not null default '{}' check (cardinality(features) <= 16),
  highlight   boolean not null default false,                                      -- the recommended plan
  badge_text  text check (char_length(badge_text) <= 30),
  cta_label   text not null default 'Request a demo' check (char_length(cta_label) between 1 and 40),
  cta_link    text not null default '/demo' check (cta_link ~ '^(/[A-Za-z0-9/_?=&%.-]*|https://[^[:space:]]+)$' and char_length(cta_link) <= 300)
);
alter table public.pricing_plans enable row level security;

grant select on public.pricing_plans to anon, authenticated;
grant insert, update, delete on public.pricing_plans to authenticated;

drop policy if exists "anyone reads active plans" on public.pricing_plans;
create policy "anyone reads active plans" on public.pricing_plans for select to anon, authenticated
  using (is_active or public.is_admin());
drop policy if exists "admin adds plans" on public.pricing_plans;
create policy "admin adds plans" on public.pricing_plans for insert to authenticated with check (public.is_admin());
drop policy if exists "admin edits plans" on public.pricing_plans;
create policy "admin edits plans" on public.pricing_plans for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin deletes plans" on public.pricing_plans;
create policy "admin deletes plans" on public.pricing_plans for delete to authenticated using (public.is_admin());

-- 2) Page texts (one row) ------------------------------------------------------------------------------------------
create table if not exists public.pricing_settings (
  id        int primary key check (id = 1),
  intro     text check (char_length(intro) <= 400),
  footnote  text check (char_length(footnote) <= 400)
);
alter table public.pricing_settings enable row level security;

grant select on public.pricing_settings to anon, authenticated;
grant insert, update on public.pricing_settings to authenticated;

drop policy if exists "anyone reads pricing texts" on public.pricing_settings;
create policy "anyone reads pricing texts" on public.pricing_settings for select to anon, authenticated using (true);
drop policy if exists "admin adds pricing texts" on public.pricing_settings;
create policy "admin adds pricing texts" on public.pricing_settings for insert to authenticated with check (public.is_admin());
drop policy if exists "admin edits pricing texts" on public.pricing_settings;
create policy "admin edits pricing texts" on public.pricing_settings for update to authenticated using (public.is_admin()) with check (public.is_admin());

-- 3) Starting content (only when the tables are empty). Keep in step with src/config/pricing.js. -----------------------
insert into public.pricing_settings (id, intro, footnote)
select 1,
  'Start with a free pilot in one course, then license DCE for a department or the whole institution.',
  'Prices are in Thai baht, per year, excluding VAT. Student limits are per academic year. Final terms are agreed in the quotation.'
where not exists (select 1 from public.pricing_settings);

insert into public.pricing_plans (slug, sort_order, name, tagline, price_text, price_note, features, highlight, badge_text, cta_label, cta_link)
select * from (values
  ('pilot', 1, 'Pilot', 'Try DCE in one course for one semester.', 'Free', 'one course, one semester, up to 60 students',
    array['Exam builder with true/false, single choice, multiple choice and sorting questions',
          'Student sign-in with student ID, course access code, QR checkpoint and selfie',
          'Tab-switch and cursor-boundary warnings with lecturer-set limits',
          'Automatic scoring and results export (CSV / Excel)',
          'Student answer review, set by the lecturer',
          'Email support'],
    false, null, 'Start a pilot', '/demo?plan=pilot'),
  ('department', 2, 'Department', 'For a department that runs its exams on DCE.', 'THB 19,900', 'per department, per year, up to 500 students',
    array['Everything in Pilot',
          'Unlimited courses, exams and lecturers',
          'Camera eye check (warning only) and live camera view for lecturers',
          'Question import from Excel and AI-assisted import',
          'Lecturer audit, login logs and one-device-per-student control',
          'Branded email with login details for new lecturers',
          'Email support'],
    true, 'Recommended', 'Request a demo', '/demo?plan=department'),
  ('institution', 3, 'Institution', 'For a faculty or the whole university.', 'Custom', 'per institution, per year - volume pricing',
    array['Everything in Department',
          'LMS integration with Moodle (LTI 1.3)',
          'Several administrators with emailed one-time codes',
          'Server workload and login monitoring for administrators',
          'Onboarding and lecturer training',
          'Setup help for running on your own server',
          'Priority support'],
    false, null, 'Contact us', '/demo?plan=institution')
) as seed(slug, sort_order, name, tagline, price_text, price_note, features, highlight, badge_text, cta_label, cta_link)
where not exists (select 1 from public.pricing_plans);

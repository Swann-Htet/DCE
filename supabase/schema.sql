-- Run this once in Supabase: Dashboard -> SQL Editor -> New query -> paste -> Run.
--
-- Model: the public website (anon key) may only INSERT. Nobody can read, change or delete rows through the
-- public API. You read the data as the project owner in the Supabase dashboard (Table Editor / SQL / CSV export).

create table if not exists public.demo_requests (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) <= 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]{2,}$'),
  institution text check (char_length(institution) <= 160),
  role        text check (char_length(role) <= 40),
  interest    text check (char_length(interest) <= 1000),
  consent     boolean not null check (consent = true)
);

create table if not exists public.survey_responses (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  survey      text not null check (survey in ('website-ux', 'lecturer-panel', 'advertising-preferences')),
  answers     jsonb not null check (jsonb_typeof(answers) = 'object' and pg_column_size(answers) < 20000)
);

alter table public.demo_requests    enable row level security;
alter table public.survey_responses enable row level security;

-- Insert-only for the public website. No select/update/delete policies exist, so those are denied.
drop policy if exists "public can submit demo requests" on public.demo_requests;
create policy "public can submit demo requests" on public.demo_requests
  for insert to anon with check (true);

drop policy if exists "public can submit survey responses" on public.survey_responses;
create policy "public can submit survey responses" on public.survey_responses
  for insert to anon with check (true);

grant usage on schema public to anon;
grant insert on public.demo_requests, public.survey_responses to anon;

-- Handy views for reading (run as owner in the SQL editor):
--   select * from public.demo_requests order by created_at desc;
--   select survey, count(*) from public.survey_responses group by survey;
--   select (answers->>'qbExperience')::int as score from public.survey_responses where survey = 'lecturer-panel';

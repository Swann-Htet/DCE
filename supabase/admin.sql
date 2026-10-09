-- Run AFTER schema.sql: Supabase -> SQL Editor -> New query -> paste -> Run.
--
-- Adds: admin allow-list, admin read/delete access to submissions, a team_members table (public read, admin write)
-- and a public "team-photos" storage bucket that only admins can upload to.
--
-- You still need to create the admin USER itself (Authentication -> Users -> Add user, tick "Auto Confirm User").
-- No password is stored in this file or in the website code.

-- 1) Admin allow-list -------------------------------------------------------------------------------------------
create table if not exists public.admins (email text primary key);
alter table public.admins enable row level security;   -- no policies: nobody can read it through the API

insert into public.admins (email) values (lower('6631502028@lamduan.mfu.ac.th')) on conflict do nothing;

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.admins a where a.email = lower(coalesce(auth.jwt() ->> 'email', '')));
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- 2) Admin can read and delete submissions ------------------------------------------------------------------------
grant select, delete on public.demo_requests, public.survey_responses to authenticated;

drop policy if exists "admin reads demo requests" on public.demo_requests;
create policy "admin reads demo requests" on public.demo_requests for select to authenticated using (public.is_admin());
drop policy if exists "admin deletes demo requests" on public.demo_requests;
create policy "admin deletes demo requests" on public.demo_requests for delete to authenticated using (public.is_admin());

drop policy if exists "admin reads survey responses" on public.survey_responses;
create policy "admin reads survey responses" on public.survey_responses for select to authenticated using (public.is_admin());
drop policy if exists "admin deletes survey responses" on public.survey_responses;
create policy "admin deletes survey responses" on public.survey_responses for delete to authenticated using (public.is_admin());

-- 3) Team / advisor profiles shown on the About page ---------------------------------------------------------------
create table if not exists public.team_members (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  kind        text not null check (kind in ('student', 'advisor')),
  name        text not null check (char_length(name) between 1 and 120),
  role        text check (char_length(role) <= 120),
  bio         text check (char_length(bio) <= 600),
  photo_path  text check (char_length(photo_path) <= 300),
  sort_order  int not null default 0
);
alter table public.team_members enable row level security;

grant select on public.team_members to anon, authenticated;
grant insert, update, delete on public.team_members to authenticated;

drop policy if exists "anyone can read team" on public.team_members;
create policy "anyone can read team" on public.team_members for select to anon, authenticated using (true);
drop policy if exists "admin adds team" on public.team_members;
create policy "admin adds team" on public.team_members for insert to authenticated with check (public.is_admin());
drop policy if exists "admin edits team" on public.team_members;
create policy "admin edits team" on public.team_members for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin deletes team" on public.team_members;
create policy "admin deletes team" on public.team_members for delete to authenticated using (public.is_admin());

-- Starting content (from the project report). Edit or replace it from the admin panel.
insert into public.team_members (kind, name, role, sort_order)
select * from (values
  ('student', 'Swan Htet',       'Project Manager', 1),
  ('student', 'Arkar Pyae Phyo', 'AI Engineer',     2),
  ('student', 'Aung Myint Myat', 'Cloud Engineer',  3),
  ('advisor', 'Asst. Prof. Dr. Suppakarn Chansareewittaya, Ph.D.', 'Project Advisor and Coordinator', 4)
) as seed(kind, name, role, sort_order)
where not exists (select 1 from public.team_members);

-- 4) Photo storage -----------------------------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('team-photos', 'team-photos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = true, file_size_limit = 2097152, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "admin uploads team photos" on storage.objects;
create policy "admin uploads team photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'team-photos' and public.is_admin());
drop policy if exists "admin updates team photos" on storage.objects;
create policy "admin updates team photos" on storage.objects for update to authenticated
  using (bucket_id = 'team-photos' and public.is_admin());
drop policy if exists "admin deletes team photos" on storage.objects;
create policy "admin deletes team photos" on storage.objects for delete to authenticated
  using (bucket_id = 'team-photos' and public.is_admin());

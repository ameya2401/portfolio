-- Initial Supabase schema for portfolio content + admin editing

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  hero_status_text text not null,
  hero_heading_prefix text not null,
  hero_name text not null,
  hero_subtitle text not null,
  hero_cta_label text not null,
  hero_cta_href text not null,
  hero_explore_label text not null,
  hero_ticker_text text not null,
  contact_email text not null,
  footer_heading text not null,
  copyright_name text not null,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists public.nav_items (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon_key text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.social_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  href text not null,
  icon_key text not null,
  placement text not null default 'both',
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.work_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_path text,
  gradient_key text not null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.work_project_tags (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.work_projects(id) on delete cascade,
  label text not null,
  icon_key text not null,
  style_key text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.framer_builds (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_path text,
  gradient_key text not null,
  accent_class text not null,
  is_dark boolean not null default false,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.about_profile (
  id int primary key default 1,
  title text not null,
  intro text not null,
  message_placeholder text not null,
  updated_at timestamptz not null default now(),
  constraint about_profile_singleton check (id = 1)
);

create table if not exists public.about_tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  gradient_class text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.about_interests (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  gradient_class text not null,
  icon text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.about_experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  company text not null,
  period text not null,
  description text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.about_photos (
  id uuid primary key default gen_random_uuid(),
  image_path text,
  alt text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.photography_destinations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text not null,
  image_path text,
  gradient_key text not null,
  sort_order int not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.nav_items enable row level security;
alter table public.social_links enable row level security;
alter table public.work_projects enable row level security;
alter table public.work_project_tags enable row level security;
alter table public.framer_builds enable row level security;
alter table public.about_profile enable row level security;
alter table public.about_tools enable row level security;
alter table public.about_interests enable row level security;
alter table public.about_experience enable row level security;
alter table public.about_photos enable row level security;
alter table public.photography_destinations enable row level security;

create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles p
    where p.id = auth.uid() and p.is_admin = true
  );
$$;

create policy "public read site settings"
on public.site_settings for select
using (true);

create policy "public read nav items"
on public.nav_items for select
using (is_active = true);

create policy "public read social links"
on public.social_links for select
using (is_active = true);

create policy "public read work projects"
on public.work_projects for select
using (is_published = true);

create policy "public read work tags"
on public.work_project_tags for select
using (true);

create policy "public read framer builds"
on public.framer_builds for select
using (is_published = true);

create policy "public read about profile"
on public.about_profile for select
using (true);

create policy "public read about tools"
on public.about_tools for select
using (is_active = true);

create policy "public read about interests"
on public.about_interests for select
using (is_active = true);

create policy "public read about experience"
on public.about_experience for select
using (is_active = true);

create policy "public read about photos"
on public.about_photos for select
using (is_active = true);

create policy "public read destinations"
on public.photography_destinations for select
using (is_published = true);

create policy "admin manage profiles"
on public.profiles
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage site settings"
on public.site_settings
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage nav items"
on public.nav_items
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage social links"
on public.social_links
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage work projects"
on public.work_projects
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage work tags"
on public.work_project_tags
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage framer builds"
on public.framer_builds
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage about profile"
on public.about_profile
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage about tools"
on public.about_tools
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage about interests"
on public.about_interests
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage about experience"
on public.about_experience
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage about photos"
on public.about_photos
for all
using (public.is_admin_user())
with check (public.is_admin_user());

create policy "admin manage destinations"
on public.photography_destinations
for all
using (public.is_admin_user())
with check (public.is_admin_user());

insert into storage.buckets (id, name, public)
values ('portfolio-public', 'portfolio-public', true)
on conflict (id) do nothing;

create policy "public read portfolio assets"
on storage.objects
for select
using (bucket_id = 'portfolio-public');

create policy "admin upload portfolio assets"
on storage.objects
for insert
with check (
  bucket_id = 'portfolio-public'
  and public.is_admin_user()
);

create policy "admin update portfolio assets"
on storage.objects
for update
using (
  bucket_id = 'portfolio-public'
  and public.is_admin_user()
)
with check (
  bucket_id = 'portfolio-public'
  and public.is_admin_user()
);

create policy "admin delete portfolio assets"
on storage.objects
for delete
using (
  bucket_id = 'portfolio-public'
  and public.is_admin_user()
);

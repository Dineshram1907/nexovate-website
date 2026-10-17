-- Nexovate certificate email delivery
-- Run this migration in the Supabase SQL Editor before deploying the Edge Function.

create extension if not exists pgcrypto;

create table if not exists public.certificate_email_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.certificate_email_deliveries (
  id uuid primary key default gen_random_uuid(),
  student_name text not null check (char_length(trim(student_name)) between 2 and 160),
  student_email text not null check (char_length(student_email) <= 254),
  event_name text not null check (char_length(trim(event_name)) between 2 and 200),
  event_date date,
  certificate_file_path text,
  status text not null default 'pending' check (status in ('pending', 'sending', 'sent', 'failed')),
  provider_message_id text,
  attempt_count integer not null default 0 check (attempt_count >= 0),
  last_error text,
  sent_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists certificate_email_deliveries_created_at_idx
  on public.certificate_email_deliveries (created_at desc);
create index if not exists certificate_email_deliveries_status_idx
  on public.certificate_email_deliveries (status);

alter table public.certificate_email_admins enable row level security;
alter table public.certificate_email_deliveries enable row level security;

-- No client-side table access. The Edge Function uses the service role only
-- after validating the user's JWT and checking certificate_email_admins.
revoke all on public.certificate_email_admins from anon, authenticated;
revoke all on public.certificate_email_deliveries from anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('certificate-pdfs', 'certificate-pdfs', false, 8388608, array['application/pdf'])
on conflict (id) do update set
  public = false,
  file_size_limit = 8388608,
  allowed_mime_types = array['application/pdf'];

-- Do not add public storage policies. Only the service-role Edge Function
-- may upload/read certificate files.

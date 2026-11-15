-- Qisaget ön sifariş cədvəli. Supabase panelində SQL Editor-a yapışdırıb Run et.

create table if not exists public.preorders (
  user_id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  username text not null,
  plan text not null default 'Pulsuz',
  purpose text,
  platforms text[] not null default '{}',
  links jsonb not null default '[]'::jsonb,
  display_name text,
  bio text,
  theme int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint preorders_username_format check (username ~ '^[a-z0-9._-]{3,24}$')
);

create unique index if not exists preorders_username_key on public.preorders (lower(username));

alter table public.preorders enable row level security;

-- Yeni cədvəllər avtomatik açılmadığı üçün giriş etmiş istifadəçilərə icazəni özümüz veririk.
grant select, insert, update on public.preorders to authenticated;

-- Hər istifadəçi yalnız öz sətrini görə, yarada və dəyişə bilər.
create policy "oz melumatini oxu" on public.preorders
  for select to authenticated using (auth.uid() = user_id);
create policy "oz melumatini yarat" on public.preorders
  for insert to authenticated with check (auth.uid() = user_id);
create policy "oz melumatini deyis" on public.preorders
  for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- İstifadəçi adı götürülübmü? Cədvəli açmadan yalnız bəli/xeyir qaytarır.
create or replace function public.username_taken(u text)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (select 1 from public.preorders where lower(username) = lower(u));
$$;

revoke all on function public.username_taken(text) from public;
grant execute on function public.username_taken(text) to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists preorders_updated on public.preorders;
create trigger preorders_updated before update on public.preorders
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------
-- Admin panel üçün əlavələr (əvvəlki hissədən sonra işə sal)
-- ---------------------------------------------------------------

-- Admin panelin profil məlumatı (ad, bio, linklər, dizayn və s.)
alter table public.preorders add column if not exists profile jsonb not null default '{}'::jsonb;
alter table public.preorders drop constraint if exists preorders_profile_size;
alter table public.preorders add constraint preorders_profile_size check (octet_length(profile::text) < 200000);

-- Şəkil anbarı: hamı görür, hər kəs yalnız öz qovluğuna (uid/) yazır, 1 MB, yalnız şəkil
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 1048576, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists media_insert on storage.objects;
drop policy if exists media_update on storage.objects;
drop policy if exists media_delete on storage.objects;
create policy media_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy media_update on storage.objects for update to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);
create policy media_delete on storage.objects for delete to authenticated
  using (bucket_id = 'media' and (storage.foldername(name))[1] = auth.uid()::text);

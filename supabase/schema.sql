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

create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text unique not null,
  role text not null default 'viewer' check (role in ('admin', 'author', 'viewer')),
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  image_url text,
  author_id uuid not null references public.users(id) on delete cascade,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  comment_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists users_role_idx on public.users(role);
create index if not exists posts_author_id_idx on public.posts(author_id);
create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists comments_post_id_idx on public.comments(post_id);
create index if not exists comments_user_id_idx on public.comments(user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    'viewer'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_posts_updated_at on public.posts;

create trigger set_posts_updated_at
before update on public.posts
for each row execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists "Users can read own profile" on public.users;
create policy "Users can read own profile"
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users;
create policy "Users can update own profile"
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Anyone can read posts" on public.posts;
create policy "Anyone can read posts"
on public.posts
for select
to anon, authenticated
using (true);

drop policy if exists "Authors and admins can create posts" on public.posts;
create policy "Authors and admins can create posts"
on public.posts
for insert
to authenticated
with check (
  auth.uid() = author_id
  and exists (
    select 1
    from public.users
    where id = auth.uid()
      and role in ('author', 'admin')
  )
);

drop policy if exists "Authors can update own posts and admins all posts" on public.posts;
create policy "Authors can update own posts and admins all posts"
on public.posts
for update
to authenticated
using (
  exists (
    select 1
    from public.users
    where id = auth.uid()
      and (
        role = 'admin'
        or (role = 'author' and public.posts.author_id = auth.uid())
      )
  )
)
with check (
  exists (
    select 1
    from public.users
    where id = auth.uid()
      and (
        role = 'admin'
        or (role = 'author' and public.posts.author_id = auth.uid())
      )
  )
);

drop policy if exists "Anyone can read comments" on public.comments;
create policy "Anyone can read comments"
on public.comments
for select
to anon, authenticated
using (true);

drop policy if exists "Authenticated users can create comments" on public.comments;
create policy "Authenticated users can create comments"
on public.comments
for insert
to authenticated
with check (auth.uid() = user_id);

insert into storage.buckets (id, name, public)
values ('post-images', 'post-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view post images" on storage.objects;
create policy "Public can view post images"
on storage.objects
for select
to public
using (bucket_id = 'post-images');

drop policy if exists "Authenticated users can upload own images" on storage.objects;
create policy "Authenticated users can upload own images"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "Authenticated users can update own images" on storage.objects;
create policy "Authenticated users can update own images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'post-images'
  and (storage.foldername(name))[1] = auth.uid()::text
);

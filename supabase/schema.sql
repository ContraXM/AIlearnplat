-- AIlearnplat — Supabase schema
--
-- 使用方式：
--   1) 在 Supabase Dashboard > SQL Editor 開啟新 query
--   2) 把整份貼上去，按 Run
--   3) 到 Authentication > Providers，把 "Anonymous Sign-Ins" 打開
--      （Dashboard 路徑：Authentication > Sign In / Up > Anonymous Sign-Ins → Enable）
--
-- Schema 設計：
--   - favorites 表：user_id + card_id 為複合主鍵，避免重複收藏
--   - RLS：每個 user 只能讀寫自己的 row
--   - 匿名 user 與 email user 共用同一張表；
--     之後呼叫 supabase.auth.linkIdentity() 把匿名帳號升級成 email 帳號，
--     user_id 不變，資料自動轉移過去。

create extension if not exists "pgcrypto";

create table if not exists public.favorites (
  user_id    uuid        not null references auth.users(id) on delete cascade,
  card_id    text        not null,
  created_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index if not exists favorites_user_idx on public.favorites (user_id, created_at desc);

alter table public.favorites enable row level security;

drop policy if exists "favorites_select_own" on public.favorites;
create policy "favorites_select_own"
  on public.favorites for select
  using (auth.uid() = user_id);

drop policy if exists "favorites_insert_own" on public.favorites;
create policy "favorites_insert_own"
  on public.favorites for insert
  with check (auth.uid() = user_id);

drop policy if exists "favorites_delete_own" on public.favorites;
create policy "favorites_delete_own"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- ============================================================
-- progress
-- 學習進度：每張卡片紀錄看過次數 + 熟練度。
-- 共用 (user_id, card_id) 主鍵；mastery null 表示還沒評估熟練度。
-- ============================================================

create table if not exists public.progress (
  user_id      uuid        not null references auth.users(id) on delete cascade,
  card_id      text        not null,
  seen_count   integer     not null default 0,
  mastery      smallint    null check (mastery in (1, 2, 3)),
  last_seen_at timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  primary key (user_id, card_id)
);

create index if not exists progress_user_last_seen_idx
  on public.progress (user_id, last_seen_at desc);

alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
create policy "progress_select_own"
  on public.progress for select
  using (auth.uid() = user_id);

drop policy if exists "progress_insert_own" on public.progress;
create policy "progress_insert_own"
  on public.progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "progress_update_own" on public.progress;
create policy "progress_update_own"
  on public.progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "progress_delete_own" on public.progress;
create policy "progress_delete_own"
  on public.progress for delete
  using (auth.uid() = user_id);

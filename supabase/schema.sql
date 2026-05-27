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

-- progress 之後再加：相同 user_id + card_id 主鍵，多一個 mastery / seen_count / last_seen_at 欄位

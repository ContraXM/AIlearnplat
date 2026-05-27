/**
 * Supabase client (browser-only).
 *
 * env 缺失時回傳 null — 上層所有同步邏輯都會自動降級成純 localStorage，
 * 開發者可以不設定 env 就跑 dev server。
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase: SupabaseClient | null =
  url && anonKey
    ? createClient(url, anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      })
    : null;

export const isSupabaseEnabled = supabase !== null;

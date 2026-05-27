/**
 * Anonymous auth bootstrap + reactive user store.
 *
 * 行為：
 *   - App 啟動呼叫 ensureSession()：有 session 就用，沒有就 signInAnonymously。
 *   - useAuthUser() 提供 React component 訂閱當前 user。
 *   - 之後要升級成 email 帳號：呼叫 supabase.auth.linkIdentity({ provider: ... })
 *     user_id 會延用，favorites 資料自動跟過去。
 */

import { create } from "zustand";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (u: User | null) => void;
  setLoading: (l: boolean) => void;
}

export const useAuthUser = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

let bootstrapped = false;

export async function ensureSession(): Promise<User | null> {
  if (!supabase) {
    useAuthUser.getState().setLoading(false);
    return null;
  }

  if (bootstrapped) return useAuthUser.getState().user;
  bootstrapped = true;

  const { data: sessionData } = await supabase.auth.getSession();
  let user = sessionData.session?.user ?? null;

  if (!user) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.warn("[auth] signInAnonymously failed:", error.message);
      useAuthUser.getState().setLoading(false);
      return null;
    }
    user = data.user;
  }

  useAuthUser.getState().setUser(user);
  useAuthUser.getState().setLoading(false);

  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthUser.getState().setUser(session?.user ?? null);
  });

  return user;
}

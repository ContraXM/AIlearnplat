/**
 * 收藏資料層 — 目前用 localStorage（透過 Zustand persist）。
 * 之後切 Supabase 只要改這個介面的實作，UI 不用動。
 *
 * 介面：
 *   - useFavorites()         讀取 + 操作 hook
 *   - isFavorite(id)         同步檢查
 *
 * 之後接 Supabase：
 *   - 把 zustand persist 換成 SWR / TanStack Query
 *   - mutate 改成呼叫 supabase.from("favorites").upsert(...)
 *   - anonymous auth user_id 自動帶入
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoritesState {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      clear: () => set({ ids: [] }),
    }),
    { name: "ailearnplat:favorites" },
  ),
);

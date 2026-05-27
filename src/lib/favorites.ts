/**
 * 收藏資料層 — 本地優先 + Supabase 雲同步。
 *
 * 設計：
 *   - localStorage 仍保留為快取，保證首屏即可看到上次的收藏（離線可用）。
 *   - App 啟動呼叫 bootstrapFavorites()：建立匿名 session、從雲端 pull，
 *     首次同步會把本地新項目 push 上雲（從舊版 localStorage-only 升級無痛）。
 *   - toggle / clear 採樂觀更新：先動本地、再寫雲；網路失敗只記 warn，
 *     下次 pull 會自動 reconcile。
 *   - 若 Supabase env 未設定，所有雲操作降級為 noop（純本地模式）。
 *
 * UI 對外 API 不變：useFavorites().ids / toggle / has / clear
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import { ensureSession } from "@/lib/auth";

interface FavoritesState {
  ids: string[];
  hydrated: boolean;
  toggle: (id: string) => void;
  has: (id: string) => boolean;
  clear: () => void;
  _setIds: (ids: string[]) => void;
  _setHydrated: (v: boolean) => void;
}

export const useFavorites = create<FavoritesState>()(
  persist(
    (set, get) => ({
      ids: [],
      hydrated: false,
      toggle: (id) => {
        const next = get().ids.includes(id)
          ? get().ids.filter((x) => x !== id)
          : [...get().ids, id];
        set({ ids: next });
        void writeToCloud(id, next.includes(id));
      },
      has: (id) => get().ids.includes(id),
      clear: () => {
        const prev = get().ids;
        set({ ids: [] });
        void clearOnCloud(prev);
      },
      _setIds: (ids) => set({ ids }),
      _setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "ailearnplat:favorites",
      partialize: (s) => ({ ids: s.ids }),
    },
  ),
);

async function writeToCloud(cardId: string, nowFavorited: boolean) {
  if (!supabase) return;
  const user = await ensureSession();
  if (!user) return;

  try {
    if (nowFavorited) {
      const { error } = await supabase
        .from("favorites")
        .upsert(
          { user_id: user.id, card_id: cardId },
          { onConflict: "user_id,card_id" },
        );
      if (error) console.warn("[favorites] upsert failed:", error.message);
    } else {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("card_id", cardId);
      if (error) console.warn("[favorites] delete failed:", error.message);
    }
  } catch (e) {
    console.warn("[favorites] write threw:", e);
  }
}

async function clearOnCloud(prevIds: string[]) {
  if (!supabase || prevIds.length === 0) return;
  const user = await ensureSession();
  if (!user) return;

  const { error } = await supabase
    .from("favorites")
    .delete()
    .eq("user_id", user.id);
  if (error) console.warn("[favorites] clear failed:", error.message);
}

/**
 * App 啟動呼叫一次：登入 → pull → 把本地新增的項目 push 回雲。
 * 若無 Supabase env：直接標記 hydrated（純本地模式）。
 */
export async function bootstrapFavorites() {
  if (!supabase) {
    useFavorites.getState()._setHydrated(true);
    return;
  }

  const user = await ensureSession();
  if (!user) {
    useFavorites.getState()._setHydrated(true);
    return;
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("card_id")
    .eq("user_id", user.id);

  if (error) {
    console.warn("[favorites] pull failed:", error.message);
    useFavorites.getState()._setHydrated(true);
    return;
  }

  const cloudIds = (data ?? []).map((r) => r.card_id);
  const localIds = useFavorites.getState().ids;

  const merged = Array.from(new Set([...cloudIds, ...localIds]));
  const localOnly = localIds.filter((id) => !cloudIds.includes(id));

  useFavorites.getState()._setIds(merged);
  useFavorites.getState()._setHydrated(true);

  if (localOnly.length > 0) {
    const rows = localOnly.map((card_id) => ({ user_id: user.id, card_id }));
    const { error: pushError } = await supabase
      .from("favorites")
      .upsert(rows, { onConflict: "user_id,card_id" });
    if (pushError) {
      console.warn("[favorites] initial push failed:", pushError.message);
    }
  }
}

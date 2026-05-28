/**
 * 學習進度 — 本地優先 + Supabase 雲同步（模式與 favorites 相同）。
 *
 * 行為：
 *   - markSeen(id)：seenCount +1、lastSeenAt = now。
 *   - setMastery(id, 1|2|3)：寫熟練度，不動 seenCount。
 *   - 樂觀更新：先動本地、再 upsert 雲；失敗 console.warn，下次 pull reconcile。
 *   - bootstrap：pull 雲端為主、本地獨有的 row 補 push 上去（一次性遷移）。
 *   - 無 Supabase env：純本地模式，所有雲呼叫降級 noop。
 *
 * 對外 API：useProgress() — Zustand store hook
 *   useProgress((s) => s.entries[cardId])  讀單張
 *   useProgress((s) => s.markSeen)         action
 *   useProgress((s) => s.setMastery)       action
 *   useProgress((s) => Object.values(s.entries))  全部（請小心 selector 穩定性）
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import { ensureSession } from "@/lib/auth";
import type { ProgressEntry } from "@/lib/types";

interface ProgressState {
  entries: Record<string, ProgressEntry>;
  hydrated: boolean;
  markSeen: (cardId: string) => void;
  setMastery: (cardId: string, mastery: 1 | 2 | 3) => void;
  get: (cardId: string) => ProgressEntry | undefined;
  all: () => ProgressEntry[];
  _setEntries: (entries: Record<string, ProgressEntry>) => void;
  _setHydrated: (v: boolean) => void;
}

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      entries: {},
      hydrated: false,
      markSeen: (cardId) => {
        const now = new Date().toISOString();
        const prev = get().entries[cardId];
        const next: ProgressEntry = {
          cardId,
          seenCount: (prev?.seenCount ?? 0) + 1,
          lastSeenAt: now,
          mastery: prev?.mastery,
        };
        set({ entries: { ...get().entries, [cardId]: next } });
        void writeToCloud(next);
      },
      setMastery: (cardId, mastery) => {
        const now = new Date().toISOString();
        const prev = get().entries[cardId];
        const next: ProgressEntry = {
          cardId,
          seenCount: prev?.seenCount ?? 0,
          lastSeenAt: prev?.lastSeenAt ?? now,
          mastery,
        };
        set({ entries: { ...get().entries, [cardId]: next } });
        void writeToCloud(next);
      },
      get: (cardId) => get().entries[cardId],
      all: () => Object.values(get().entries),
      _setEntries: (entries) => set({ entries }),
      _setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: "ailearnplat:progress",
      partialize: (s) => ({ entries: s.entries }),
    },
  ),
);

async function writeToCloud(entry: ProgressEntry) {
  if (!supabase) return;
  const user = await ensureSession();
  if (!user) return;

  try {
    const { error } = await supabase.from("progress").upsert(
      {
        user_id: user.id,
        card_id: entry.cardId,
        seen_count: entry.seenCount,
        last_seen_at: entry.lastSeenAt,
        mastery: entry.mastery ?? null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,card_id" },
    );
    if (error) console.warn("[progress] upsert failed:", error.message);
  } catch (e) {
    console.warn("[progress] write threw:", e);
  }
}

/**
 * App 啟動呼叫一次：pull 雲端 → 雲為主合併本地 → 本地獨有 row push 上雲。
 */
export async function bootstrapProgress() {
  if (!supabase) {
    useProgress.getState()._setHydrated(true);
    return;
  }

  const user = await ensureSession();
  if (!user) {
    useProgress.getState()._setHydrated(true);
    return;
  }

  const { data, error } = await supabase
    .from("progress")
    .select("card_id, seen_count, mastery, last_seen_at")
    .eq("user_id", user.id);

  if (error) {
    console.warn("[progress] pull failed:", error.message);
    useProgress.getState()._setHydrated(true);
    return;
  }

  const cloudEntries: Record<string, ProgressEntry> = {};
  for (const row of data ?? []) {
    cloudEntries[row.card_id] = {
      cardId: row.card_id,
      seenCount: row.seen_count,
      lastSeenAt: row.last_seen_at,
      mastery: (row.mastery ?? undefined) as 1 | 2 | 3 | undefined,
    };
  }

  const localEntries = useProgress.getState().entries;
  const merged: Record<string, ProgressEntry> = { ...cloudEntries };
  const localOnly: ProgressEntry[] = [];
  for (const [cardId, entry] of Object.entries(localEntries)) {
    if (!cloudEntries[cardId]) {
      merged[cardId] = entry;
      localOnly.push(entry);
    }
  }

  useProgress.getState()._setEntries(merged);
  useProgress.getState()._setHydrated(true);

  if (localOnly.length > 0) {
    const rows = localOnly.map((e) => ({
      user_id: user.id,
      card_id: e.cardId,
      seen_count: e.seenCount,
      last_seen_at: e.lastSeenAt,
      mastery: e.mastery ?? null,
      updated_at: new Date().toISOString(),
    }));
    const { error: pushError } = await supabase
      .from("progress")
      .upsert(rows, { onConflict: "user_id,card_id" });
    if (pushError) {
      console.warn("[progress] initial push failed:", pushError.message);
    }
  }
}

interface ProgressRow {
  card_id: string;
  seen_count: number;
  mastery: number | null;
  last_seen_at: string;
}

/**
 * 訂閱 progress 表的 realtime 變動。
 * INSERT / UPDATE 都把整列覆蓋進本地 entries；DELETE 移除該 cardId。
 * 自己 device 的 echo event 因為值相同會變 no-op。
 */
export function subscribeProgressRealtime(userId: string): () => void {
  if (!supabase) return () => {};
  const client = supabase;

  const applyRow = (row: ProgressRow) => {
    const state = useProgress.getState();
    state._setEntries({
      ...state.entries,
      [row.card_id]: {
        cardId: row.card_id,
        seenCount: row.seen_count,
        lastSeenAt: row.last_seen_at,
        mastery: (row.mastery ?? undefined) as 1 | 2 | 3 | undefined,
      },
    });
  };

  const channel = client
    .channel(`progress:${userId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "progress",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => applyRow(payload.new as ProgressRow),
    )
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "progress",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => applyRow(payload.new as ProgressRow),
    )
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "progress",
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        const cardId = (payload.old as { card_id: string }).card_id;
        const state = useProgress.getState();
        if (state.entries[cardId]) {
          const next = { ...state.entries };
          delete next[cardId];
          state._setEntries(next);
        }
      },
    )
    .subscribe();

  return () => {
    void client.removeChannel(channel);
  };
}

/**
 * 預留擴充口：學習進度追蹤
 * 目前未實作，僅留 stub 介面，避免 UI 直接耦合 storage。
 */

import type { ProgressEntry } from "@/lib/types";

export interface ProgressStore {
  get(cardId: string): ProgressEntry | undefined;
  markSeen(cardId: string): void;
  setMastery(cardId: string, mastery: 1 | 2 | 3): void;
  all(): ProgressEntry[];
}

// noop stub — 之後實作可改成 Zustand persist 或 Supabase
export const progress: ProgressStore = {
  get: () => undefined,
  markSeen: () => {},
  setMastery: () => {},
  all: () => [],
};

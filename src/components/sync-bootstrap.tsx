"use client";

import { useEffect } from "react";
import { bootstrapFavorites, subscribeFavoritesRealtime } from "@/lib/favorites";
import { bootstrapProgress, subscribeProgressRealtime } from "@/lib/progress";
import { ensureSession } from "@/lib/auth";

/**
 * Mount 一次：
 *   1. 建立匿名 session
 *   2. pull favorites + progress 雲端資料 → 本地
 *   3. 啟動 realtime 訂閱，多裝置即時同步
 *
 * Unmount / strict-mode 重 mount 時清掉 channel，避免 leak / 重複訂閱。
 */
export function SyncBootstrap() {
  useEffect(() => {
    let cancelled = false;
    const cleanups: Array<() => void> = [];

    (async () => {
      await bootstrapFavorites();
      await bootstrapProgress();
      if (cancelled) return;

      const user = await ensureSession();
      if (cancelled || !user) return;

      const cleanupFav = subscribeFavoritesRealtime(user.id);
      const cleanupProg = subscribeProgressRealtime(user.id);

      // 競態保險：如果 cleanup 在 subscribe 之間先跑了，立刻收回剛建的 channel
      if (cancelled) {
        cleanupFav();
        cleanupProg();
        return;
      }
      cleanups.push(cleanupFav, cleanupProg);
    })();

    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { bootstrapFavorites } from "@/lib/favorites";
import { bootstrapProgress } from "@/lib/progress";

/**
 * Mount 一次，啟動 anonymous session 並把雲端資料 pull 下來。
 * 故意不 render 任何 UI；同步狀態各 view 自行訂閱 useFavorites().hydrated / useProgress().hydrated。
 */
export function SyncBootstrap() {
  useEffect(() => {
    void bootstrapFavorites();
    void bootstrapProgress();
  }, []);
  return null;
}

"use client";

import { useEffect } from "react";
import { bootstrapFavorites } from "@/lib/favorites";

/**
 * Mount 一次，啟動 anonymous session 並把雲端收藏 pull 下來。
 * 故意不 render 任何 UI；同步狀態未來若要顯示，再由各 view 自己訂閱 useFavorites().hydrated。
 */
export function SyncBootstrap() {
  useEffect(() => {
    void bootstrapFavorites();
  }, []);
  return null;
}

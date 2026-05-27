"use client";

import { Moon, Sun } from "lucide-react";
import type { Card } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { useUIStore } from "@/stores/ui-store";

export function SettingsView({ allCards }: { allCards: Card[] }) {
  const theme = useUIStore((s) => s.theme);
  const setTheme = useUIStore((s) => s.setTheme);

  const stats = countByGroup(allCards);

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">設定</h1>
        <p className="text-sm text-muted-foreground">外觀偏好與資料統計。</p>
      </div>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          外觀
        </h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" aria-hidden />
            ) : (
              <Sun className="h-4 w-4" aria-hidden />
            )}
            <span className="text-sm">深色模式</span>
          </div>
          <Switch
            checked={theme === "dark"}
            onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
            aria-label="切換深色模式"
          />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          卡片統計
        </h2>
        <div className="space-y-3">
          <div className="flex items-baseline justify-between border-b border-border pb-2">
            <span className="text-sm">總卡片數</span>
            <span className="text-xl font-bold">{allCards.length}</span>
          </div>
          {Object.entries(stats).map(([level, byCat]) => (
            <div key={level} className="space-y-1.5">
              <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {level}
              </div>
              {Object.entries(byCat).length === 0 ? (
                <div className="pl-2 text-sm text-muted-foreground">—</div>
              ) : (
                <ul className="space-y-0.5 pl-2">
                  {Object.entries(byCat).map(([cat, count]) => (
                    <li
                      key={cat}
                      className="flex items-baseline justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{cat}</span>
                      <span className="font-medium">{count}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-dashed border-border p-5">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          學習進度（即將推出）
        </h2>
        <p className="text-sm text-muted-foreground">
          完成過的卡片、各題庫熟練度、最近複習時間將會顯示在這裡。
        </p>
      </section>
    </div>
  );
}

function countByGroup(cards: Card[]) {
  const groups: Record<string, Record<string, number>> = {
    初級: {},
    中級: {},
    實戰專案: {},
  };
  for (const c of cards) {
    const lvl = groups[c.level] ?? (groups[c.level] = {});
    lvl[c.category] = (lvl[c.category] ?? 0) + 1;
  }
  return groups;
}

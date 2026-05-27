"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
  }, [theme]);

  return <>{children}</>;
}

/**
 * 在 SSR 階段就把 dark class 加上去，避免閃白。
 * 從 localStorage 直接讀（同 zustand persist 的 key）。
 */
export function ThemeNoFlashScript() {
  const code = `
    (function () {
      try {
        var raw = localStorage.getItem('ailearnplat:ui');
        var theme = 'dark';
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && parsed.state && parsed.state.theme) {
            theme = parsed.state.theme;
          }
        }
        var root = document.documentElement;
        if (theme === 'dark') {
          root.classList.add('dark');
          root.style.colorScheme = 'dark';
        } else {
          root.style.colorScheme = 'light';
        }
      } catch (e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

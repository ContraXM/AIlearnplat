"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Star, GraduationCap, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { href: "/", label: "首頁", icon: Home },
  { href: "/favorites", label: "收藏", icon: Star },
  { href: "/exam", label: "考試", icon: GraduationCap },
  { href: "/settings", label: "設定", icon: Settings },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <ul className="mx-auto flex max-w-3xl">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-2.5 text-xs transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={active ? 2.4 : 1.8}
                  aria-hidden
                />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

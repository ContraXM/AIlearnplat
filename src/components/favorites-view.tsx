"use client";

import { useMemo, useState } from "react";
import { Star } from "lucide-react";
import type { Card, Category, Level } from "@/lib/types";
import { useFavorites } from "@/lib/favorites";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";
import { CardGrid } from "@/components/card-grid";
import { searchCards } from "@/lib/search";

export function FavoritesView({ allCards }: { allCards: Card[] }) {
  const ids = useFavorites((s) => s.ids);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level | "全部">("全部");
  const [category, setCategory] = useState<Category | "全部">("全部");

  const favCards = useMemo(
    () => allCards.filter((c) => ids.includes(c.id)),
    [allCards, ids],
  );

  const filtered = useMemo(() => {
    let result = favCards;
    if (level !== "全部") result = result.filter((c) => c.level === level);
    if (category !== "全部")
      result = result.filter((c) => c.category === category);
    if (query.trim()) result = searchCards(result, query);
    return result;
  }, [favCards, level, category, query]);

  if (favCards.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold tracking-tight">收藏</h1>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border py-16 text-center">
          <Star className="h-8 w-8 text-muted-foreground" aria-hidden />
          <div className="text-sm text-muted-foreground">
            還沒有收藏卡片。
            <br />
            進入任一張卡片詳細頁，按右上角「收藏」即可加入。
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">收藏</h1>
        <p className="text-sm text-muted-foreground">
          已收藏 {favCards.length} 張，目前顯示 {filtered.length} 張。
        </p>
      </div>
      <SearchBar value={query} onChange={setQuery} />
      <FilterBar
        level={level}
        category={category}
        onLevelChange={setLevel}
        onCategoryChange={setCategory}
      />
      <CardGrid cards={filtered} />
    </div>
  );
}

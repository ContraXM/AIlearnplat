"use client";

import { useMemo, useState } from "react";
import type { Card, Category, Level } from "@/lib/types";
import { SearchBar } from "@/components/search-bar";
import { FilterBar } from "@/components/filter-bar";
import { CardGrid } from "@/components/card-grid";
import { searchCards } from "@/lib/search";

interface HomeViewProps {
  cards: Card[];
}

export function HomeView({ cards }: HomeViewProps) {
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<Level | "全部">("全部");
  const [category, setCategory] = useState<Category | "全部">("全部");

  const filtered = useMemo(() => {
    let result = cards;
    if (level !== "全部") result = result.filter((c) => c.level === level);
    if (category !== "全部")
      result = result.filter((c) => c.category === category);
    if (query.trim()) result = searchCards(result, query);
    return result;
  }, [cards, level, category, query]);

  return (
    <div className="flex flex-col gap-5">
      <div className="space-y-1.5">
        <h1 className="text-2xl font-bold tracking-tight">卡片牆</h1>
        <p className="text-sm text-muted-foreground">
          總共 {cards.length} 張卡片，目前顯示 {filtered.length} 張。
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

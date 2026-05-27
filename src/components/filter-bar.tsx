"use client";

import { cn } from "@/lib/utils";
import { LEVELS, getCategoriesByLevel } from "@/data/taxonomy";
import type { Category, Level } from "@/lib/types";

interface FilterBarProps {
  level: Level | "全部";
  category: Category | "全部";
  onLevelChange: (l: Level | "全部") => void;
  onCategoryChange: (c: Category | "全部") => void;
}

export function FilterBar({
  level,
  category,
  onLevelChange,
  onCategoryChange,
}: FilterBarProps) {
  const categories: (Category | "全部")[] =
    level === "全部"
      ? ["全部"]
      : ["全部", ...getCategoriesByLevel(level as Level)];

  return (
    <div className="flex flex-col gap-2">
      <Chips
        items={["全部", ...LEVELS] as (Level | "全部")[]}
        active={level}
        onChange={(v) => {
          onLevelChange(v as Level | "全部");
          onCategoryChange("全部");
        }}
      />
      {level !== "全部" && categories.length > 1 && (
        <Chips
          items={categories}
          active={category}
          onChange={(v) => onCategoryChange(v as Category | "全部")}
          subtle
        />
      )}
    </div>
  );
}

function Chips<T extends string>({
  items,
  active,
  onChange,
  subtle = false,
}: {
  items: T[];
  active: T;
  onChange: (v: T) => void;
  subtle?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs transition-colors",
            active === item
              ? subtle
                ? "border-foreground/40 bg-muted text-foreground"
                : "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

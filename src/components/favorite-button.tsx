"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/lib/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({ id }: { id: string }) {
  const ids = useFavorites((s) => s.ids);
  const toggle = useFavorites((s) => s.toggle);
  const active = ids.includes(id);

  return (
    <Button
      variant={active ? "default" : "outline"}
      size="sm"
      onClick={() => toggle(id)}
      aria-pressed={active}
    >
      <Star
        className={cn("h-4 w-4", active && "fill-current")}
        aria-hidden
      />
      {active ? "已收藏" : "收藏"}
    </Button>
  );
}

import Link from "next/link";
import type { Card } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CardPreview({ card }: { card: Card }) {
  return (
    <Link
      href={`/card/${card.id}`}
      className="group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30 hover:bg-card-hover"
    >
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge variant="outline">{card.level}</Badge>
        <Badge variant="secondary">{card.subcategory}</Badge>
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-foreground">
        {card.name}
      </h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {card.oneLiner}
      </p>
    </Link>
  );
}

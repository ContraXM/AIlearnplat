import type { Card } from "@/lib/types";
import { CardPreview } from "@/components/card-preview";

export function CardGrid({ cards }: { cards: Card[] }) {
  if (cards.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
        沒有符合條件的卡片
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <CardPreview key={c.id} card={c} />
      ))}
    </div>
  );
}

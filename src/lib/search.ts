import Fuse from "fuse.js";
import type { Card } from "@/lib/types";

export function buildFuse(cards: Card[]) {
  return new Fuse(cards, {
    keys: [
      { name: "name", weight: 3 },
      { name: "oneLiner", weight: 2 },
      { name: "explanation", weight: 1 },
      { name: "pitfall", weight: 1 },
    ],
    threshold: 0.35,
    ignoreLocation: true,
    includeScore: false,
  });
}

export function searchCards(cards: Card[], query: string): Card[] {
  if (!query.trim()) return cards;
  const fuse = buildFuse(cards);
  return fuse.search(query).map((r) => r.item);
}

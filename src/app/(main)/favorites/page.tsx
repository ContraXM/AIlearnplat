import { getAllCards } from "@/data/cards";
import { FavoritesView } from "@/components/favorites-view";

export default function FavoritesPage() {
  return <FavoritesView allCards={getAllCards()} />;
}

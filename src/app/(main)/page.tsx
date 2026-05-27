import { getAllCards } from "@/data/cards";
import { HomeView } from "@/components/home-view";

export default function HomePage() {
  const cards = getAllCards();
  return <HomeView cards={cards} />;
}

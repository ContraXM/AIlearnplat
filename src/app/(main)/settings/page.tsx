import { getAllCards } from "@/data/cards";
import { SettingsView } from "@/components/settings-view";

export default function SettingsPage() {
  return <SettingsView allCards={getAllCards()} />;
}

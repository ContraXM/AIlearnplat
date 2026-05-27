import { getAllCards } from "@/data/cards";
import { ExamView } from "@/components/exam-view";

export default function ExamPage() {
  return <ExamView allCards={getAllCards()} />;
}

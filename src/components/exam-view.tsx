"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Shuffle,
  AlertTriangle,
  Clock,
  Lightbulb,
} from "lucide-react";
import type { Card, Category, Level } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FilterBar } from "@/components/filter-bar";
import { cn } from "@/lib/utils";

interface ExamViewProps {
  allCards: Card[];
}

type Mode = "config" | "flashcard";

export function ExamView({ allCards }: ExamViewProps) {
  const [mode, setMode] = useState<Mode>("config");
  const [level, setLevel] = useState<Level | "全部">("全部");
  const [category, setCategory] = useState<Category | "全部">("全部");
  const [order, setOrder] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const candidates = useMemo(() => {
    let result = allCards;
    if (level !== "全部") result = result.filter((c) => c.level === level);
    if (category !== "全部")
      result = result.filter((c) => c.category === category);
    return result;
  }, [allCards, level, category]);

  const deck = useMemo(
    () =>
      order
        .map((id) => candidates.find((c) => c.id === id))
        .filter((c): c is Card => Boolean(c)),
    [order, candidates],
  );

  function startExam(shuffle: boolean) {
    if (candidates.length === 0) return;
    const ids = candidates.map((c) => c.id);
    const finalOrder = shuffle
      ? [...ids].sort(() => Math.random() - 0.5)
      : ids;
    setOrder(finalOrder);
    setIndex(0);
    setFlipped(false);
    setMode("flashcard");
  }

  if (mode === "config") {
    return (
      <div className="flex flex-col gap-5">
        <div className="space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight">考試模式</h1>
          <p className="text-sm text-muted-foreground">
            選擇範圍 — 卡片只顯示正面，點擊翻面看完整內容。
          </p>
        </div>
        <FilterBar
          level={level}
          category={category}
          onLevelChange={setLevel}
          onCategoryChange={setCategory}
        />
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="text-sm text-muted-foreground">
            符合條件的卡片：
            <span className="ml-1 font-semibold text-foreground">
              {candidates.length}
            </span>{" "}
            張
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => startExam(false)}
            disabled={candidates.length === 0}
          >
            開始（依序）
          </Button>
          <Button
            variant="outline"
            onClick={() => startExam(true)}
            disabled={candidates.length === 0}
          >
            <Shuffle className="h-4 w-4" aria-hidden /> 隨機
          </Button>
        </div>
      </div>
    );
  }

  const card = deck[index];
  if (!card) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-sm text-muted-foreground">沒有卡片可顯示。</p>
        <Button variant="outline" onClick={() => setMode("config")}>
          回到選單
        </Button>
      </div>
    );
  }

  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    setFlipped(false);
    setIndex((i) => Math.min(deck.length - 1, i + 1));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {index + 1} / {deck.length}
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={() => setMode("config")}>
            <RotateCcw className="h-4 w-4" aria-hidden /> 重新選範圍
          </Button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={cn(
          "min-h-[20rem] w-full rounded-2xl border border-border bg-card p-6 text-left",
          "transition-colors hover:bg-card-hover",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        )}
        aria-label={flipped ? "顯示卡片正面" : "顯示卡片背面"}
      >
        {!flipped ? (
          <FrontFace card={card} />
        ) : (
          <BackFace card={card} />
        )}
      </button>

      <div className="flex items-center justify-between gap-2">
        <Button
          variant="outline"
          onClick={goPrev}
          disabled={index === 0}
          className="flex-1"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden /> 上一張
        </Button>
        <Button
          variant="outline"
          onClick={() => setFlipped((f) => !f)}
          className="flex-1"
        >
          {flipped ? "看正面" : "翻面"}
        </Button>
        <Button
          variant="outline"
          onClick={goNext}
          disabled={index === deck.length - 1}
          className="flex-1"
        >
          下一張 <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </div>
  );
}

function FrontFace({ card }: { card: Card }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Badge variant="outline">{card.level}</Badge>
        <Badge variant="secondary">{card.subcategory}</Badge>
      </div>
      <h2 className="text-3xl font-bold tracking-tight">{card.name}</h2>
      <p className="max-w-md text-lg text-muted-foreground">{card.oneLiner}</p>
      <div className="mt-4 text-xs text-muted-foreground">點擊卡片翻面</div>
    </div>
  );
}

function BackFace({ card }: { card: Card }) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{card.name}</h3>
      <FacePart title="白話解釋" icon={<Lightbulb className="h-3.5 w-3.5" />}>
        {card.explanation}
      </FacePart>
      <FacePart title="使用時機" icon={<Clock className="h-3.5 w-3.5" />}>
        {card.whenToUse}
      </FacePart>
      <FacePart
        title="陷阱"
        icon={<AlertTriangle className="h-3.5 w-3.5 text-amber-500" />}
      >
        {card.pitfall}
      </FacePart>
    </div>
  );
}

function FacePart({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </div>
      <p className="text-sm leading-relaxed">{children}</p>
    </div>
  );
}

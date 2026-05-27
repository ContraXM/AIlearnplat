import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, AlertTriangle, Clock, Lightbulb } from "lucide-react";
import { getAllCards, getCardById } from "@/data/cards";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { FavoriteButton } from "@/components/favorite-button";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllCards().map((c) => ({ id: c.id }));
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = getCardById(id);
  if (!card) notFound();

  const related = card.relatedCards
    .map((rid) => getCardById(rid))
    .filter((c): c is NonNullable<typeof c> => c !== undefined);

  return (
    <article className="flex flex-col gap-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> 返回卡片牆
      </Link>

      <header className="space-y-3">
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant="outline">{card.level}</Badge>
          <Badge variant="secondary">{card.category}</Badge>
          <Badge variant="secondary">{card.subcategory}</Badge>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-3xl font-bold tracking-tight">{card.name}</h1>
          <FavoriteButton id={card.id} />
        </div>
        <p className="text-lg text-muted-foreground">{card.oneLiner}</p>
      </header>

      <Section title="白話解釋" icon={<Lightbulb className="h-4 w-4" />}>
        <p className="leading-relaxed">{card.explanation}</p>
      </Section>

      <Section title="使用時機" icon={<Clock className="h-4 w-4" />}>
        <p className="leading-relaxed">{card.whenToUse}</p>
      </Section>

      {card.codeExample && (
        <Section title="程式碼範例">
          <CodeBlock code={card.codeExample} lang={card.codeLang} />
        </Section>
      )}

      <Section
        title="常見誤解 / 考試陷阱"
        icon={<AlertTriangle className="h-4 w-4 text-amber-500" />}
        accent
      >
        <p className="leading-relaxed">{card.pitfall}</p>
      </Section>

      {related.length > 0 && (
        <Section title="相關卡片">
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/card/${r.id}`}
                  className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm transition-colors hover:border-foreground/40 hover:bg-card-hover"
                >
                  {r.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </article>
  );
}

function Section({
  title,
  icon,
  accent = false,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={
        accent
          ? "rounded-xl border border-amber-500/30 bg-amber-500/5 p-5"
          : "rounded-xl border border-border bg-card p-5"
      }
    >
      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </h2>
      <div className="text-foreground">{children}</div>
    </section>
  );
}

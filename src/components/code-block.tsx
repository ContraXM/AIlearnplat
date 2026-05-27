import { highlightCode } from "@/lib/shiki";

/**
 * Server component — Shiki 在 build/SSR 階段執行，
 * client bundle 不會多載入 highlighter。
 */
export async function CodeBlock({
  code,
  lang,
}: {
  code: string;
  lang?: string;
}) {
  const html = await highlightCode(code, lang ?? "python");
  return (
    <div
      className="overflow-x-auto rounded-lg border border-border bg-card text-sm [&_pre]:p-4 [&_pre]:m-0 [&_pre]:bg-transparent"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

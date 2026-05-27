import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: ["python", "typescript", "javascript", "bash", "json", "sql"],
    });
  }
  return highlighterPromise;
}

export async function highlightCode(
  code: string,
  lang: string = "python",
): Promise<string> {
  const hl = await getHighlighter();
  const safeLang = hl.getLoadedLanguages().includes(lang) ? lang : "python";
  return hl.codeToHtml(code, {
    lang: safeLang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}

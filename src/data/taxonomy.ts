import type { Category, Level, Subcategory } from "@/lib/types";

export interface TaxonomyNode {
  level: Level;
  categories: {
    name: Category;
    subcategories: Subcategory[];
  }[];
}

export const TAXONOMY: TaxonomyNode[] = [
  {
    level: "初級",
    categories: [
      {
        name: "人工智慧基礎概論",
        subcategories: [
          "AI定義與分類",
          "AI治理與法規",
          "資料處理概念",
          "機器學習概念",
        ],
      },
      {
        name: "生成式AI應用與規劃",
        subcategories: [
          "No-Code/Low-Code",
          "生成式AI工具與應用",
          "Prompt工程",
          "生成式AI導入與風險",
        ],
      },
    ],
  },
  {
    level: "中級",
    categories: [
      {
        name: "AI技術應用與規劃",
        subcategories: [
          "NLP技術",
          "電腦視覺",
          "多模態AI",
          "AI部署與MLOps",
        ],
      },
      {
        name: "大數據處理分析",
        subcategories: [
          "機率統計基礎",
          "大數據技術與工具",
          "資料隱私與合規",
        ],
      },
      {
        name: "機器學習技術",
        subcategories: [
          "機器學習演算法",
          "深度學習",
          "模型訓練與調校",
          "ML治理",
        ],
      },
    ],
  },
  {
    level: "實戰專案",
    categories: [],
  },
];

export const LEVELS: Level[] = TAXONOMY.map((n) => n.level);

export function getCategoriesByLevel(level: Level): Category[] {
  return (
    TAXONOMY.find((n) => n.level === level)?.categories.map((c) => c.name) ?? []
  );
}

export function getSubcategoriesByCategory(category: Category): Subcategory[] {
  for (const lvl of TAXONOMY) {
    const found = lvl.categories.find((c) => c.name === category);
    if (found) return found.subcategories;
  }
  return [];
}

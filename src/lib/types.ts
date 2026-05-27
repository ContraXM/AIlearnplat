export type Level = "初級" | "中級" | "實戰專案";

export type Category =
  | "人工智慧基礎概論"
  | "生成式AI應用與規劃"
  | "AI技術應用與規劃"
  | "大數據處理分析"
  | "機器學習技術";

export type Subcategory =
  // 初級 - 人工智慧基礎概論
  | "AI定義與分類"
  | "AI治理與法規"
  | "資料處理概念"
  | "機器學習概念"
  // 初級 - 生成式AI應用與規劃
  | "No-Code/Low-Code"
  | "生成式AI工具與應用"
  | "Prompt工程"
  | "生成式AI導入與風險"
  // 中級 - AI技術應用與規劃
  | "NLP技術"
  | "電腦視覺"
  | "多模態AI"
  | "AI部署與MLOps"
  // 中級 - 大數據處理分析
  | "機率統計基礎"
  | "大數據技術與工具"
  | "資料隱私與合規"
  // 中級 - 機器學習技術
  | "機器學習演算法"
  | "深度學習"
  | "模型訓練與調校"
  | "ML治理";

export interface Card {
  id: string;
  name: string;
  level: Level;
  category: Category;
  subcategory: Subcategory;
  oneLiner: string;
  explanation: string;
  whenToUse: string;
  codeExample: string | null;
  codeLang?: string;
  pitfall: string;
  relatedCards: string[];
  // 預留擴充：之後接題目練習模式
  quiz?: QuizQuestion[];
}

// 預留擴充：選擇題
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

// 預留擴充：學習進度
export interface ProgressEntry {
  cardId: string;
  seenCount: number;
  lastSeenAt: string;
  // 1=不熟 2=普通 3=熟
  mastery?: 1 | 2 | 3;
}

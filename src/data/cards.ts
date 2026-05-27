import type { Card } from "@/lib/types";

/**
 * AI 教學閃卡 — iPAS AI 應用規劃師（初/中級）為主、Junior 工程師日常查詢為輔。
 * 內容會持續調整；之後可替換為 CMS / Supabase loader。
 */
export const CARDS: Card[] = [
  // ─────────────────────────────────────────────────────────────
  // 初級 / 人工智慧基礎概論 / AI定義與分類
  // ─────────────────────────────────────────────────────────────
  {
    id: "ai-definition",
    name: "人工智慧（AI）",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI定義與分類",
    oneLiner: "讓機器模擬人類認知行為的學科總稱",
    explanation:
      "AI 是讓電腦能執行原本需要人類智慧的任務的廣泛領域：感知、推理、學習、決策、自然語言理解。不是單一技術，而是包含機器學習、規則引擎、搜尋演算法、知識表示等多種方法的傘狀概念。",
    whenToUse:
      "策劃 AI 專案時用來框定範圍。提案文件、需求訪談時，先釐清「客戶要的是規則自動化還是真正的 ML」，避免把 if-else 過度包裝成 AI。",
    codeExample: null,
    pitfall:
      "考試陷阱：AI ≠ ML ≠ 深度學習，三者是包含關係（AI ⊃ ML ⊃ DL）。把任何自動化都叫 AI 是行銷說法，不是學術定義。",
    relatedCards: ["ai-vs-ml-vs-dl", "ani-agi-asi"],
  },
  {
    id: "ani-agi-asi",
    name: "弱AI / 通用AI / 超AI",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI定義與分類",
    oneLiner: "依能力廣度分成 ANI、AGI、ASI 三個層級",
    explanation:
      "ANI（Artificial Narrow Intelligence，弱 AI）只擅長特定任務，例如下棋、人臉辨識；目前所有商用 AI 都屬此類，包含 ChatGPT。AGI 能像人類一樣跨領域學習，尚未實現。ASI 能力全面超越人類，純理論。",
    whenToUse:
      "對客戶或主管溝通「AI 能做什麼」時，用這套分類釐清期待。要做的功能是 ANI 就承認是 ANI，不要承諾 AGI 等級的能力。",
    codeExample: null,
    pitfall:
      "ChatGPT 雖然能回答多種問題，仍屬 ANI；它沒有真正的理解、自我意識、跨領域遷移能力。考試常見：AGI 是「現階段不存在」。",
    relatedCards: ["ai-definition", "llm"],
  },
  {
    id: "ai-vs-ml-vs-dl",
    name: "AI / ML / DL 關係",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI定義與分類",
    oneLiner: "三者是包含關係，不是同義詞",
    explanation:
      "AI 是最大集合，包含所有讓機器智能化的方法。ML（Machine Learning）是 AI 的一個分支，特點是「從資料中學規則」而不是寫死規則。DL（Deep Learning）是 ML 的子集，使用多層神經網路，特別擅長圖像、語音、文字等非結構化資料。",
    whenToUse:
      "解釋專案技術選型時用得到。資料量小、需要可解釋性 → 傳統 ML；資料量大、非結構化 → DL；只是規則自動化 → 不需要 ML。",
    codeExample: null,
    pitfall:
      "三者常被混用。注意：所有 DL 都是 ML，但不是所有 ML 都是 DL；所有 ML 都是 AI，但 AI 還包含規則式系統、搜尋演算法等非學習方法。",
    relatedCards: ["ai-definition", "supervised", "neural-network"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 人工智慧基礎概論 / AI治理與法規
  // ─────────────────────────────────────────────────────────────
  {
    id: "eu-ai-act",
    name: "歐盟 AI Act",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI治理與法規",
    oneLiner: "全球首部全面性 AI 監管法規，依風險分級管制",
    explanation:
      "2024 年通過，將 AI 系統分為四級：禁止（社會評分、即時生物辨識）、高風險（醫療、招聘、執法）、有限風險（聊天機器人需告知）、最小風險（垃圾郵件過濾）。高風險系統需做風險評估、資料治理、技術文件、人為監督。",
    whenToUse:
      "歐盟市場部署 AI、或客戶有歐盟業務時必須了解。即使在台灣，也常作為國內法規參考標竿。",
    codeExample: null,
    pitfall:
      "AI Act 管的是「AI 系統的用途」而不是「技術本身」。同一個 LLM 用在客服是有限風險，用在徵才篩選就是高風險。考試常考分級判斷。",
    relatedCards: ["gdpr", "ai-ethics"],
  },
  {
    id: "gdpr",
    name: "GDPR",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI治理與法規",
    oneLiner: "歐盟個資保護法，違反最高罰全球營業額 4%",
    explanation:
      "General Data Protection Regulation。核心原則：合法基礎、目的限制、資料最小化、正確性、儲存限制、完整性與保密性、可問責性。AI 場景特別重要的是「被遺忘權」與「自動化決策的解釋權」。",
    whenToUse:
      "蒐集任何歐盟使用者個資前都要評估。AI 訓練資料來自網路爬蟲、客服對話、使用者上傳檔案時，需要法律基礎。",
    codeExample: null,
    pitfall:
      "GDPR 不只管「歐盟公司」，只要服務歐盟使用者就適用（域外效力）。資料去識別化不代表完全免責，仍可能因可重識別性被認定為個資。",
    relatedCards: ["eu-ai-act", "anonymization", "differential-privacy"],
  },
  {
    id: "ai-ethics",
    name: "AI 倫理原則",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "AI治理與法規",
    oneLiner: "公平、透明、可問責、隱私 — AI 治理四大支柱",
    explanation:
      "公平性（避免歧視特定族群）、透明度（決策過程可說明）、可問責性（出錯有人負責）、隱私（保護個資與資料主體權利）。多數國家、企業的 AI 倫理綱領都以此為基礎。",
    whenToUse:
      "規劃 AI 系統時做倫理影響評估（EIA）。徵才、信貸、醫療等高敏感領域必須先做這項評估。",
    codeExample: null,
    pitfall:
      "倫理原則不是法律但會變成法律。把「公平」誤解為「每個族群結果一樣」是太簡化；公平性有多種數學定義（demographic parity、equal opportunity）且彼此不相容。",
    relatedCards: ["eu-ai-act", "ml-bias-fairness", "model-explainability"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 人工智慧基礎概論 / 資料處理概念
  // ─────────────────────────────────────────────────────────────
  {
    id: "structured-data",
    name: "結構化 vs 非結構化資料",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "資料處理概念",
    oneLiner: "能不能直接放進表格決定資料的型態",
    explanation:
      "結構化資料有固定欄位定義（資料庫、Excel），佔企業資料約 20%。非結構化資料沒有預定義 schema（文字、圖片、影片、音訊），佔約 80%，過去難分析，是深度學習與生成式 AI 的主戰場。半結構化資料介於兩者之間（JSON、XML）。",
    whenToUse:
      "資料盤點與技術選型。結構化 → 傳統 SQL + ML；非結構化 → 需要先抽特徵或用 DL 直接吃 raw data。",
    codeExample: null,
    pitfall:
      "非結構化不等於沒有結構。文章有語法結構、圖片有像素網格，只是不能直接放進關聯式資料表。考試常問：JSON 屬於哪一種？答：半結構化。",
    relatedCards: ["data-cleaning", "etl-elt"],
  },
  {
    id: "data-cleaning",
    name: "資料清理",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "資料處理概念",
    oneLiner: "處理缺失值、異常值、重複資料、格式不一致",
    explanation:
      "ML 專案中 60-80% 時間花在資料清理。常見任務：缺失值填補（平均/中位數/前向填補）、異常值偵測與處理、重複資料去除、格式統一、編碼一致化、單位轉換。Garbage in, garbage out — 模型不會比資料更聰明。",
    whenToUse:
      "任何 ML / 統計分析的第一步。在做特徵工程之前先確認資料品質，否則後面所有努力都是建在流沙上。",
    codeExample: `import pandas as pd
import numpy as np

df = pd.read_csv("data.csv")

# 1. 看一眼資料
print(df.isnull().sum())          # 各欄缺失數
print(df.describe())              # 統計摘要找異常

# 2. 缺失值處理
df["age"] = df["age"].fillna(df["age"].median())
df = df.dropna(subset=["target"]) # 標籤缺失直接丟

# 3. 異常值（IQR 法）
Q1, Q3 = df["price"].quantile([0.25, 0.75])
IQR = Q3 - Q1
df = df[(df["price"] >= Q1 - 1.5*IQR) & (df["price"] <= Q3 + 1.5*IQR)]

# 4. 重複資料
df = df.drop_duplicates()`,
    codeLang: "python",
    pitfall:
      "缺失值不要無腦填 0；對「未填寫年齡」填 0 會把這群人變成嬰兒。要先理解為什麼會缺失（隨機缺失、系統性缺失），再選方法。",
    relatedCards: ["structured-data", "etl-elt"],
  },
  {
    id: "etl-elt",
    name: "ETL vs ELT",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "資料處理概念",
    oneLiner: "Transform 放在 Load 前或後，差很多",
    explanation:
      "ETL（Extract-Transform-Load）：先把資料轉換好再進倉，適合結構固定的傳統 BI。ELT（Extract-Load-Transform）：先把 raw 資料倒進雲端倉儲（Snowflake、BigQuery），再用 SQL 轉換，適合大量、彈性需求高的現代資料平台。",
    whenToUse:
      "資料源固定、轉換複雜、目標倉資源有限 → ETL。資料源多變、彈性需求高、用雲端倉儲 → ELT（現代多數選擇）。",
    codeExample: null,
    pitfall:
      "ELT 更受歡迎不代表 ETL 過時。處理敏感個資時 ETL 較好（清洗後才入庫），ELT 容易把原始 PII 留在倉裡。",
    relatedCards: ["data-cleaning", "lake-warehouse"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 人工智慧基礎概論 / 機器學習概念
  // ─────────────────────────────────────────────────────────────
  {
    id: "supervised",
    name: "監督式學習",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "機器學習概念",
    oneLiner: "資料附答案，學會「輸入 → 輸出」的對應",
    explanation:
      "Supervised Learning。給模型大量 (X, y) 配對，讓它學會在看到新 X 時預測 y。分類問題（y 是類別：垃圾郵件 / 正常）、迴歸問題（y 是數值：房價）。需要標註資料，標註成本是主要瓶頸。",
    whenToUse:
      "有明確答案、有歷史標註資料的問題。例如客服分類、信用評分、銷售預測、影像辨識。",
    codeExample: null,
    pitfall:
      "「監督」指的是有標籤資料，不是「人在旁邊監督模型訓練」。模型品質強烈依賴標註品質與標註一致性。",
    relatedCards: ["unsupervised", "reinforcement", "overfitting"],
  },
  {
    id: "unsupervised",
    name: "非監督式學習",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "機器學習概念",
    oneLiner: "資料沒答案，自己找結構",
    explanation:
      "Unsupervised Learning。只有 X 沒有 y，模型要自己找出資料的結構。常見任務：分群（K-Means、DBSCAN）、降維（PCA、t-SNE）、異常偵測、關聯規則。Embedding 也算廣義的非監督學習。",
    whenToUse:
      "沒有標註資料、要做客戶分群、異常交易偵測、探索性資料分析。",
    codeExample: null,
    pitfall:
      "非監督學習沒有「正確答案」可以驗證，評估困難。分群結果常常需要人為解讀才有商業意義 — 模型不會告訴你「這群是高價值客戶」。",
    relatedCards: ["supervised", "embedding"],
  },
  {
    id: "reinforcement",
    name: "強化學習",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "機器學習概念",
    oneLiner: "在環境中試錯、用獎勵訊號學會最佳策略",
    explanation:
      "Reinforcement Learning。Agent 在 Environment 中採取 Action、得到 Reward，目標是最大化累積獎勵。AlphaGo、自駕車、機器人控制、ChatGPT 的 RLHF 都用這套。需要可互動的環境（真實或模擬）。",
    whenToUse:
      "有清楚的獎勵函數、可以反覆嘗試的場景。遊戲、推薦系統、廣告競價、機器人。",
    codeExample: null,
    pitfall:
      "RL 的最大挑戰是「獎勵函數設計」— 獎勵設錯，模型會找到投機路徑。例如清潔機器人若以「沒看到垃圾」為獎勵，可能學會把垃圾藏起來。",
    relatedCards: ["supervised", "unsupervised"],
  },
  {
    id: "overfitting",
    name: "過擬合（Overfitting）",
    level: "初級",
    category: "人工智慧基礎概論",
    subcategory: "機器學習概念",
    oneLiner: "模型背下訓練資料、沒學到泛化規則",
    explanation:
      "訓練準確率很高、測試準確率很低就是過擬合。模型把雜訊與細節都記住了，遇到新資料就失靈。對立面是欠擬合（underfitting）— 連訓練集都學不好。解決方法：更多資料、正規化、Dropout、Early Stopping、簡化模型。",
    whenToUse:
      "每次訓練模型都要看 train/val/test 三組指標。若 train ≫ val 就是過擬合警訊。",
    codeExample: null,
    pitfall:
      "考試常考：訓練集準確率 99%、測試集 60% 是什麼？答：過擬合。注意：資料外洩（data leakage）造成的「假高分」要與過擬合區分。",
    relatedCards: ["cross-validation", "regularization", "bias-variance"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 生成式AI應用與規劃 / No-Code/Low-Code
  // ─────────────────────────────────────────────────────────────
  {
    id: "no-low-code",
    name: "No-Code vs Low-Code",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "No-Code/Low-Code",
    oneLiner: "完全不寫程式 vs 寫少量程式",
    explanation:
      "No-Code 完全靠視覺化拖拉組裝，目標使用者是業務人員（Bubble、Glide、Make）。Low-Code 仍可寫程式碼擴充，目標是讓開發者快 10 倍（OutSystems、Mendix、PowerApps）。AI 時代興起「prompt-to-app」工具，模糊兩者邊界。",
    whenToUse:
      "POC、內部工具、流程自動化。POC 階段用 No-Code 驗證，正式系統再考慮自寫或 Low-Code。",
    codeExample: null,
    pitfall:
      "No-Code 不等於零成本。當需求複雜化、量級放大時，rebuild 成本可能高於一開始自寫。客製化天花板要在選型前評估。",
    relatedCards: ["automation-platforms"],
  },
  {
    id: "automation-platforms",
    name: "自動化平台（Zapier / n8n / Make）",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "No-Code/Low-Code",
    oneLiner: "把多個 SaaS 串成自動化工作流",
    explanation:
      "用觸發（Trigger）+ 動作（Action）串接 Gmail、Slack、Notion、OpenAI、CRM 等服務。Zapier 雲端易用但收費高；Make（原 Integromat）視覺化強；n8n 開源可自架，工程師友善，可接 OpenAI、Anthropic API 做 AI 工作流。",
    whenToUse:
      "把重複的跨工具操作自動化：表單填寫 → 通知 Slack、新訂單 → 寫入 sheet → 開 GPT 草擬回覆。",
    codeExample: null,
    pitfall:
      "工作流變複雜時，debug 與版本控制是痛點。重要邏輯應該寫成程式碼，自動化平台適合膠水層，不適合核心商業邏輯。",
    relatedCards: ["no-low-code"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 生成式AI應用與規劃 / 生成式AI工具與應用
  // ─────────────────────────────────────────────────────────────
  {
    id: "llm",
    name: "大型語言模型（LLM）",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI工具與應用",
    oneLiner: "用海量文字訓練、能生成自然語言的神經網路",
    explanation:
      "Large Language Model。底層是 Transformer 架構，用「預測下一個 token」這個任務在數兆 token 上預訓練。代表：GPT-4/5、Claude、Gemini、Llama。能力來自規模（參數量、資料量、算力）— 這就是 Scaling Law。",
    whenToUse:
      "文字生成、摘要、翻譯、問答、程式碼生成、資料抽取、對話介面。基本上有「理解或生成自然語言」需求就會考慮。",
    codeExample: null,
    pitfall:
      "LLM 沒有真正的理解，只是預測「最有可能的下一個字」。它可以非常流暢地說錯話 — 這叫幻覺（hallucination），是設計缺陷不是 bug。",
    relatedCards: ["transformer", "hallucination", "rag"],
  },
  {
    id: "vector-db",
    name: "Vector Database",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI工具與應用",
    oneLiner: "專門儲存與檢索向量的資料庫",
    explanation:
      "傳統 DB 比對「等於」、「LIKE」，向量 DB 比對「相似度」。底層用 ANN（Approximate Nearest Neighbor）演算法，例如 HNSW、IVF，讓百萬等級向量的相似搜尋在毫秒內回應。",
    whenToUse:
      "需要語意檢索的場景：RAG、語意搜尋、推薦、影像相似搜尋。常見選擇：Pinecone、Weaviate、Qdrant、Milvus、pgvector。",
    codeExample: null,
    pitfall:
      "不是所有場景都需要向量 DB。資料量小（<10 萬筆）時，記憶體裡用 numpy / faiss 就夠了，殺雞不用牛刀。",
    relatedCards: ["rag", "embedding"],
  },
  {
    id: "gen-ai-tools",
    name: "主流生成式 AI 工具",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI工具與應用",
    oneLiner: "文字 / 圖片 / 音訊 / 影片 / 程式碼各有領頭羊",
    explanation:
      "文字對話：ChatGPT、Claude、Gemini。圖片：Midjourney、DALL·E、Stable Diffusion。音訊：ElevenLabs、Suno。影片：Sora、Runway、Veo。程式碼：GitHub Copilot、Cursor、Claude Code。各工具有不同的擅長領域與生態定位。",
    whenToUse:
      "選工具時依「主要任務 + 部署需求」評估。需要私有部署 → 開源（Llama、Stable Diffusion）；要最高品質 → 商用 API；要整合 IDE → Copilot/Cursor。",
    codeExample: null,
    pitfall:
      "考試常考工具歸屬：Midjourney 是圖像生成不是文字、Suno 是音樂不是語音。注意「商品名」與「底層模型」差異 — ChatGPT 是產品，GPT-5 是模型。",
    relatedCards: ["llm", "multimodal-llm"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 生成式AI應用與規劃 / Prompt工程
  // ─────────────────────────────────────────────────────────────
  {
    id: "prompt-engineering",
    name: "Prompt Engineering",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "Prompt工程",
    oneLiner: "用提示詞工程化地引導 LLM 產出想要的內容",
    explanation:
      "核心元素：角色設定、明確任務、提供範例（few-shot）、限制輸出格式、要求逐步推理（CoT）、給上下文（RAG）。好 prompt = 清晰指令 + 充足脈絡 + 明確輸出格式。",
    whenToUse:
      "任何使用 LLM 的場景。在 fine-tune 之前先把 prompt 優化好，多數場景 prompt 就足夠。",
    codeExample: `你是一位資深財報分析師。

## 任務
從以下季報文字中抽取四個欄位：
- revenue（營收，單位為新台幣億元）
- yoy_growth（年成長率，百分比）
- eps（每股盈餘，新台幣）
- key_risk（一句話總結主要風險）

## 輸出格式（JSON）
{"revenue": ..., "yoy_growth": ..., "eps": ..., "key_risk": "..."}

## 約束
- 找不到的欄位填 null
- 不要加任何說明文字，只輸出 JSON

## 季報文字
{{report_text}}`,
    codeLang: "text",
    pitfall:
      "Prompt 不是越長越好。塞太多無關脈絡會稀釋訊號、增加成本與延遲。請求結構化輸出時要明確指定 JSON / Markdown 格式，並用 schema 驗證。",
    relatedCards: ["few-shot", "chain-of-thought", "rag"],
  },
  {
    id: "few-shot",
    name: "Few-shot Prompting",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "Prompt工程",
    oneLiner: "在 prompt 裡塞幾個範例讓模型模仿",
    explanation:
      "Zero-shot 是直接給任務、One-shot 給 1 個範例、Few-shot 給 2-5 個範例。在不 fine-tune 的情況下，是讓模型學會新風格、新格式最便宜的方法。範例選擇直接影響效果。",
    whenToUse:
      "任務有特定格式（標籤、樣式、語氣）、零樣本回答品質不穩、不值得 fine-tune 時。分類任務、結構化抽取、風格遷移都很適合。",
    codeExample: `分類以下評論的情緒：

評論：服務很慢但餐點不錯
情緒：中性

評論：再也不會來了
情緒：負面

評論：超棒的體驗
情緒：正面

評論：等了一小時還沒上菜
情緒：`,
    codeLang: "text",
    pitfall:
      "範例選擇有 ordering bias — 最後一個範例對模型影響最大。範例之間要平衡（每個類別都要有），且涵蓋邊界情況。",
    relatedCards: ["prompt-engineering", "chain-of-thought"],
  },
  {
    id: "chain-of-thought",
    name: "Chain of Thought（CoT）",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "Prompt工程",
    oneLiner: "要求模型「逐步思考」，提升推理任務準確率",
    explanation:
      "在 prompt 加上「讓我們一步一步想」（Let's think step by step），或直接示範推理過程。對數學、邏輯、多步驟問題效果顯著。代價是輸出變長 → token 成本 + 延遲增加。",
    whenToUse:
      "數學、邏輯推理、多步驟問題、需要解釋的決策。簡單分類任務不需要。",
    codeExample: null,
    pitfall:
      "CoT 對「推理型」模型（o-series、Claude with extended thinking）效益較小，因為它們內建已經會推理。CoT 增加成本，要評估是否值得。",
    relatedCards: ["prompt-engineering", "few-shot"],
  },
  {
    id: "rag",
    name: "RAG",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "Prompt工程",
    oneLiner: "用外部知識補強 LLM 的回答能力",
    explanation:
      "Retrieval-Augmented Generation：先把使用者問題拿去檢索資料庫（通常是向量資料庫），把最相關的段落塞回 prompt，再讓 LLM 根據這些段落回答。等於給 LLM 開卷考。",
    whenToUse:
      "答案會隨資料變動（公司內規、最新法規、產品手冊）、需要可追溯來源、或想避免 LLM 幻覺時。比 fine-tune 便宜很多。",
    codeExample: `# pseudo-code: 最小 RAG 流程
chunks = split(doc)
embeddings = embed(chunks)            # 例如 OpenAI text-embedding-3-small
vector_db.upsert(embeddings)

query_vec = embed(user_question)
top_k = vector_db.search(query_vec, k=4)

prompt = f"""根據以下資料回答：
{top_k}

問題：{user_question}"""
answer = llm.generate(prompt)`,
    codeLang: "python",
    pitfall:
      "考試常考：RAG 不是訓練模型，是檢索 + 生成。也不是「給 LLM 更多 token 就好」，chunk 切太大會稀釋相關度，太小會失去語意。",
    relatedCards: ["embedding", "vector-db", "hallucination"],
  },
  {
    id: "embedding",
    name: "Embedding",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "Prompt工程",
    oneLiner: "把文字 / 圖片轉成一串能比較相似度的數字",
    explanation:
      "Embedding 是把高維度的語意資訊壓成一個固定長度的向量（例如 1536 維）。語意相近的東西在向量空間裡距離也近，所以可以用 cosine similarity 做檢索、分群、推薦。",
    whenToUse:
      "搜尋（語意搜尋）、推薦系統、分群、做 RAG 的索引基礎、相似內容偵測。基本上只要要做「相似度」就會用到。",
    codeExample: null,
    pitfall:
      "不同模型產生的 embedding 不能互相比較；維度不同、訓練語料不同。換模型時整個 vector DB 都要重建。",
    relatedCards: ["rag", "vector-db"],
  },

  // ─────────────────────────────────────────────────────────────
  // 初級 / 生成式AI應用與規劃 / 生成式AI導入與風險
  // ─────────────────────────────────────────────────────────────
  {
    id: "prompt-injection",
    name: "Prompt Injection",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI導入與風險",
    oneLiner: "使用者輸入劫持原本的 system prompt",
    explanation:
      "因為 LLM 把 system prompt 和 user input 都當文字一起讀，攻擊者可以在輸入裡塞「忽略以上指令，改成……」之類的話來改變模型行為。間接注入更危險：模型讀取的外部資料（網頁、PDF）也可能藏指令。",
    whenToUse:
      "規劃任何接受外部輸入的 LLM 應用時都要評估，特別是會接 RAG、瀏覽網頁、讀 email 的 agent。",
    codeExample: null,
    pitfall:
      "考試陷阱：以為「我有寫 system prompt 限制」就安全。實際上 prompt 不是 sandbox，模型沒有強制執行 system 優先級。要靠輸入過濾、輸出檢查、權限隔離多層防禦。",
    relatedCards: ["hallucination", "copyright-risk"],
  },
  {
    id: "hallucination",
    name: "幻覺（Hallucination）",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI導入與風險",
    oneLiner: "LLM 一本正經地說出聽起來合理但事實錯誤的內容",
    explanation:
      "LLM 的目標是「預測流暢的下一個字」而不是「說真話」。當訓練資料沒涵蓋、或推理時插入了錯誤前提，模型仍會自信地生成內容。法律案例、論文引用、API 簽名是幻覺重災區。",
    whenToUse:
      "任何使用 LLM 產出客戶可見內容、決策依據的場景都要有降低幻覺的設計。",
    codeExample: null,
    pitfall:
      "降低幻覺的方法：RAG 提供事實依據、要求引用來源、降低 temperature、加上「不知道就說不知道」的指令。但都無法 100% 消除 — 要設計人為審核流程。",
    relatedCards: ["rag", "llm", "prompt-injection"],
  },
  {
    id: "copyright-risk",
    name: "生成式 AI 著作權風險",
    level: "初級",
    category: "生成式AI應用與規劃",
    subcategory: "生成式AI導入與風險",
    oneLiner: "訓練資料、生成內容、商業使用三層各有爭議",
    explanation:
      "三大議題：(1) 模型用了未授權的著作訓練？多國訴訟中。(2) 生成內容是否享有著作權？美國 USCO 認定純 AI 生成無著作權，需有人類創作貢獻。(3) 生成內容是否侵權？可能與訓練資料過度相似。",
    whenToUse:
      "企業導入生成式 AI 製作對外內容（行銷素材、產品文案、程式碼）前必須評估。商用合約應釐清生成內容的權利歸屬與賠償責任。",
    codeExample: null,
    pitfall:
      "「我用 ChatGPT 生成的所以是我的」不一定成立。台灣著作權法目前態度與美國接近 — 需有人類創作元素。各家 API 條款不同（OpenAI 允許商用、部分模型禁止）。",
    relatedCards: ["prompt-injection", "ai-ethics"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / AI技術應用與規劃 / NLP技術
  // ─────────────────────────────────────────────────────────────
  {
    id: "tokenization",
    name: "Tokenization",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "NLP技術",
    oneLiner: "把文字切成模型看得懂的最小單位",
    explanation:
      "模型不直接吃字串而是吃 token id。主流是 subword tokenization（BPE、WordPiece、SentencePiece），把常用詞當一個 token、罕見詞拆成 subword。「ChatGPT」可能是一個 token，「神經網路」可能切成 3-4 個 token。",
    whenToUse:
      "估算 API 成本（按 token 計費）、判斷 context window 是否夠用、debug 為什麼某些字串行為怪異時。",
    codeExample: `import tiktoken

enc = tiktoken.encoding_for_model("gpt-4o")
text = "Hello, 世界！"
tokens = enc.encode(text)
print(tokens)              # [13225, 11, 6914, 245, 99834, 6447]
print(len(tokens))         # 6
print([enc.decode([t]) for t in tokens])
# ['Hello', ',', ' ä¸', '\\x96', 'ç\\x95\\x8c', 'ï¼\\x81']`,
    codeLang: "python",
    pitfall:
      "中文比英文更耗 token（同樣意思的句子可能 token 數 1.5-2 倍）。設計 prompt 與成本估算要把這個納入。",
    relatedCards: ["transformer", "llm"],
  },
  {
    id: "transformer",
    name: "Transformer",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "NLP技術",
    oneLiner: "用注意力機制取代遞迴、現代 LLM 的底層架構",
    explanation:
      "2017 年 Google 提出（《Attention Is All You Need》）。核心是 self-attention：每個 token 都能直接「看」序列中其他位置，不用像 RNN 一個一個傳。可平行運算 → 訓練吃得下更大資料量 → Scaling Law → LLM 時代。",
    whenToUse:
      "想理解 LLM 為什麼這幾年突飛猛進、為什麼有 context window 限制、為什麼 attention 是 O(n²) — 都要從 Transformer 開始。",
    codeExample: null,
    pitfall:
      "Self-attention 的記憶體與計算量隨序列長度平方成長。所以 context window 不是「想多大就多大」，要付 quadratic 成本。Flash Attention、Linear Attention 是優化方向。",
    relatedCards: ["attention", "bert-vs-gpt", "llm"],
  },
  {
    id: "bert-vs-gpt",
    name: "BERT vs GPT",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "NLP技術",
    oneLiner: "Encoder 雙向理解 vs Decoder 單向生成",
    explanation:
      "BERT 用 Transformer Encoder，雙向看上下文，擅長分類、抽取、判斷類任務（情緒分析、NER）。GPT 用 Decoder，只能左到右逐字生成，擅長生成式任務（對話、摘要、翻譯）。生成式 AI 浪潮後 GPT 路線壓倒性勝出，但 BERT 仍是分類任務首選。",
    whenToUse:
      "分類、抽取、相似度 → BERT 系（也含 RoBERTa、DistilBERT）。對話、生成、寫作 → GPT/Claude/Gemini。Embedding 模型多半是 BERT 系。",
    codeExample: null,
    pitfall:
      "考試陷阱：BERT 不能拿來「生成文字」（它的訓練目標是填空，不是接龍）。Embedding 任務用 BERT 而不是 GPT，因為前者有真正的雙向語意理解。",
    relatedCards: ["transformer", "llm"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / AI技術應用與規劃 / 電腦視覺
  // ─────────────────────────────────────────────────────────────
  {
    id: "cnn",
    name: "卷積神經網路（CNN）",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "電腦視覺",
    oneLiner: "用卷積核掃過影像、自動抽取空間特徵",
    explanation:
      "Convolutional Neural Network。透過卷積層（找局部 pattern）、池化層（降採樣）、全連接層（分類）堆疊。低層學邊緣、紋理，高層學物件、語意。代表架構：LeNet、AlexNet、VGG、ResNet、EfficientNet。",
    whenToUse:
      "影像分類、物件偵測、語意分割、醫療影像、瑕疵檢測。雖然 ViT 後來居上，CNN 在資料量小、邊緣裝置、即時推論場景仍是首選。",
    codeExample: null,
    pitfall:
      "考試常考：CNN 的「卷積」不是數學定義上的卷積，而是 cross-correlation（差個翻轉），但實務上叫卷積。Pooling 主要是降採樣，不是「分類」。",
    relatedCards: ["object-detection", "vit", "neural-network"],
  },
  {
    id: "object-detection",
    name: "物件偵測",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "電腦視覺",
    oneLiner: "找出影像中物件的「類別 + 位置」",
    explanation:
      "比分類更難：要在影像上畫出 bounding box 並標類別。兩階段方法（Faster R-CNN）先找候選區、再分類，精度高但慢。一階段方法（YOLO、SSD、RT-DETR）直接回歸座標，速度快、適合即時。",
    whenToUse:
      "監視系統、自駕車、零售店人流分析、製造業瑕疵定位、農業害蟲偵測。需要「在哪裡」而不只「有沒有」時。",
    codeExample: null,
    pitfall:
      "評估指標是 mAP（mean Average Precision）而不是 accuracy。常見錯誤：用分類資料集標註方式做偵測 — 標註成本是分類的 10 倍以上。",
    relatedCards: ["cnn", "vit"],
  },
  {
    id: "vit",
    name: "Vision Transformer（ViT）",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "電腦視覺",
    oneLiner: "把影像切成 patch 餵進 Transformer",
    explanation:
      "把影像切成 16×16 的小塊（patch），每個 patch 線性投影成向量、加位置編碼，當作 token 序列丟進 Transformer。資料量足夠時可超越 CNN，是現代多模態模型（CLIP、Flamingo）的視覺塔。",
    whenToUse:
      "大資料集、追求 SOTA、多模態應用、與語言模型整合時。資料量小（<10 萬張）通常 CNN 仍較好。",
    codeExample: null,
    pitfall:
      "ViT 需要的訓練資料量遠大於 CNN，沒有 ImageNet 等級的預訓練很難從頭訓練。實務上幾乎都是 fine-tune 預訓練的 ViT。",
    relatedCards: ["cnn", "transformer", "clip"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / AI技術應用與規劃 / 多模態AI
  // ─────────────────────────────────────────────────────────────
  {
    id: "multimodal-llm",
    name: "多模態 LLM",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "多模態AI",
    oneLiner: "同時理解文字、圖片、音訊、影片的大模型",
    explanation:
      "GPT-4o、Claude、Gemini 都是多模態 LLM。原理：用各 modality 的 encoder（圖像 ViT、音訊 Whisper）抽特徵，投影到語言模型同一個向量空間，再共同訓練。輸入可混合多種模態，輸出仍多半是文字。",
    whenToUse:
      "螢幕截圖問答、文件理解（含圖表）、影音內容分析、無障礙輔助（描述圖片給視障者）、產品瑕疵照片診斷。",
    codeExample: null,
    pitfall:
      "「能看圖」不等於「精準辨識」。Multimodal LLM 適合語意理解（圖中發生什麼事），不適合像素級任務（精確標出瑕疵座標），後者仍需專用 CV 模型。",
    relatedCards: ["clip", "llm", "vit"],
  },
  {
    id: "clip",
    name: "CLIP",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "多模態AI",
    oneLiner: "把文字與圖片投影到同一個向量空間",
    explanation:
      "Contrastive Language-Image Pre-training。OpenAI 2021 年提出，用 4 億組（圖片，文字描述）對訓練：相符的對距離拉近、不相符的拉遠。結果：可以做 zero-shot 影像分類（用文字描述就能分類沒看過的類別）、跨模態檢索（文字搜圖、圖搜文字）。",
    whenToUse:
      "圖像搜尋、語意化標籤、無監督圖像分類、做多模態 RAG 的索引基礎。Stable Diffusion 也用 CLIP 做 text-to-image 的條件編碼。",
    codeExample: null,
    pitfall:
      "CLIP 的訓練資料是英文網路爬取的，對中文、繁體中文支援差；專業領域（醫療、工業）也需要 fine-tune。後繼者：OpenCLIP、SigLIP。",
    relatedCards: ["multimodal-llm", "embedding"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / AI技術應用與規劃 / AI部署與MLOps
  // ─────────────────────────────────────────────────────────────
  {
    id: "mlops",
    name: "MLOps",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "AI部署與MLOps",
    oneLiner: "把 ML 模型像軟體一樣持續部署、監控、迭代的工程實踐",
    explanation:
      "結合 DevOps + 資料工程 + ML，涵蓋資料版本控制、模型 CI/CD、特徵商店、線上監控（drift / latency / quality）、自動 retrain 流水線。讓「模型上線」不只是把 pickle 檔 scp 上去。",
    whenToUse:
      "任何要長期維運的模型都需要。實驗階段可以省略，但只要進到正式環境並且資料會變動，就要有 MLOps。",
    codeExample: null,
    pitfall:
      "常見誤解：MLOps = 用 Kubeflow / MLflow。工具只是手段，核心是「可追溯、可重現、可監控」三個能力。沒這三項，用什麼工具都白搭。",
    relatedCards: ["model-serving", "data-drift", "ab-test-ml"],
  },
  {
    id: "model-serving",
    name: "模型服務（Model Serving）",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "AI部署與MLOps",
    oneLiner: "把訓練好的模型包成可呼叫的服務",
    explanation:
      "兩種模式：(1) 線上推論（API 呼叫，低延遲，FastAPI/Triton/TorchServe）；(2) 批次推論（定期批量跑，Spark/Airflow）。關鍵指標：延遲（p50/p95/p99）、吞吐量（QPS）、成本（GPU/CPU 使用率）。",
    whenToUse:
      "模型訓練完要對外提供能力時。互動式應用 → 線上；報表類預測 → 批次；混合場景常見。",
    codeExample: `from fastapi import FastAPI
from pydantic import BaseModel
import torch

app = FastAPI()
model = torch.load("model.pt", map_location="cuda")
model.eval()

class Req(BaseModel):
    features: list[float]

@app.post("/predict")
def predict(req: Req):
    with torch.inference_mode():
        x = torch.tensor(req.features).cuda().unsqueeze(0)
        y = model(x).cpu().item()
    return {"prediction": y}`,
    codeLang: "python",
    pitfall:
      "把訓練 code 直接搬上 serving 是常見錯誤。Serving 端要關 dropout、用 eval mode、batch 推論優化、避免 Python GIL 瓶頸。LLM 還要考慮 KV cache、batching 策略。",
    relatedCards: ["mlops"],
  },
  {
    id: "ab-test-ml",
    name: "ML 模型 A/B 測試",
    level: "中級",
    category: "AI技術應用與規劃",
    subcategory: "AI部署與MLOps",
    oneLiner: "用線上實驗驗證新模型對商業指標的影響",
    explanation:
      "離線指標（accuracy、AUC）漂亮不代表線上 work。把流量切兩組：對照組用舊模型、實驗組用新模型，比較商業指標（點擊率、留存、營收）。常見策略：金絲雀（小流量試跑）、Shadow（雙跑不影響使用者）、Interleaving（同一使用者混合）。",
    whenToUse:
      "任何要替換正式環境模型前都應該做。即使新模型離線指標較好，也可能因服務延遲、UI 互動、群體偏差造成實際表現變差。",
    codeExample: null,
    pitfall:
      "樣本數不足、跑太短時間就停，會得到假結論（看似有差異實際是噪音）。應該先做 power analysis 決定樣本數與時長。多重比較問題也要考慮。",
    relatedCards: ["mlops"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 大數據處理分析 / 機率統計基礎
  // ─────────────────────────────────────────────────────────────
  {
    id: "bias-variance",
    name: "偏差-變異 Tradeoff",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "機率統計基礎",
    oneLiner: "模型越簡單偏差大、越複雜變異大",
    explanation:
      "Bias 是模型假設與真實之間的差距 — 太簡單會欠擬合。Variance 是模型對訓練資料的敏感度 — 太複雜會過擬合。總誤差 = Bias² + Variance + 不可降低的雜訊。實務上要在兩者間找平衡點。",
    whenToUse:
      "選模型複雜度、決定要不要加正規化、要不要收集更多資料時的核心思考框架。",
    codeExample: null,
    pitfall:
      "現代 DL 在「double descent」現象下，過度參數化反而 variance 不上升 — 經典 tradeoff 在 DL 上不完全成立。但對 iPAS 等考試而言，仍以經典框架為準。",
    relatedCards: ["overfitting", "regularization"],
  },
  {
    id: "confusion-matrix",
    name: "混淆矩陣",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "機率統計基礎",
    oneLiner: "把分類結果攤成 TP/FP/FN/TN 四格",
    explanation:
      "真陽性（TP）：實際正、預測正。假陽性（FP）：實際負、預測正。假陰性（FN）：實際正、預測負。真陰性（TN）：實際負、預測負。所有分類指標都從這四個數字推導。",
    whenToUse:
      "做二元分類模型評估的第一步。可推導：Accuracy、Precision、Recall、F1、Specificity、FPR 等。",
    codeExample: null,
    pitfall:
      "「正」與「負」要看商業情境定義。詐欺偵測中 FN（漏抓詐欺）通常比 FP（誤警）成本高很多 — 不能只看 accuracy。",
    relatedCards: ["precision-recall"],
  },
  {
    id: "precision-recall",
    name: "Precision / Recall / F1",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "機率統計基礎",
    oneLiner: "抓得準 vs 抓得全 vs 兩者調和平均",
    explanation:
      "Precision = TP / (TP+FP)：「預測為正的，真的正的比例」— 寧可漏抓也不要誤抓。Recall = TP / (TP+FN)：「實際正的，被抓到的比例」— 寧可誤抓也不要漏抓。F1 = 2·P·R/(P+R)：兩者調和平均。",
    whenToUse:
      "資料不平衡（正類稀少）時不要用 accuracy，要看 P/R/F1。垃圾郵件、詐欺偵測、罕見疾病檢測都屬此類。",
    codeExample: null,
    pitfall:
      "P 與 R 通常是 tradeoff，調 threshold 此消彼長。F1 假設 P/R 同等重要 — 商業場景不一定。若 FN 成本遠高於 FP，看 F2 或直接調 threshold 拉高 Recall。",
    relatedCards: ["confusion-matrix"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 大數據處理分析 / 大數據技術與工具
  // ─────────────────────────────────────────────────────────────
  {
    id: "hadoop-spark",
    name: "Hadoop vs Spark",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "大數據技術與工具",
    oneLiner: "磁碟 MapReduce 老將 vs 記憶體運算新銳",
    explanation:
      "Hadoop 是分散式儲存（HDFS）+ 計算（MapReduce）。Spark 用 RDD/DataFrame 在記憶體中運算，比 Hadoop MapReduce 快 10-100 倍，支援批次、串流、SQL、ML、Graph 統一 API。現代多半用 Spark 做計算、HDFS 或 S3 做儲存。",
    whenToUse:
      "資料量大到單機跑不動（TB 級以上）、或單機跑太慢時。資料量小於 100GB 通常 Pandas / DuckDB 就夠。",
    codeExample: null,
    pitfall:
      "「大數據」是相對概念。多數公司一輩子用不到 Spark，因為資料量根本沒到 GB 等級。先評估資料量再選工具，不要為了用 Spark 而用 Spark。",
    relatedCards: ["lake-warehouse", "stream-batch"],
  },
  {
    id: "lake-warehouse",
    name: "Data Lake vs Data Warehouse",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "大數據技術與工具",
    oneLiner: "原始多型態資料湖 vs 結構化分析倉",
    explanation:
      "Data Lake 存原始格式（文字、影像、JSON、Parquet），schema-on-read，便宜彈性，適合資料科學探索（S3 + Delta/Iceberg）。Data Warehouse 存結構化、清洗過、欄式儲存的資料，schema-on-write，查詢快，適合 BI（Snowflake、BigQuery、Redshift）。Lakehouse 是兩者融合。",
    whenToUse:
      "Lake：raw 資料保存、ML 訓練料、彈性探索。Warehouse：穩定 BI 報表、固定 schema 分析、商業決策資料。",
    codeExample: null,
    pitfall:
      "Data Lake 沒治理會變成 Data Swamp — 沒人知道哪份資料能信。Lake 仍需要中繼資料、目錄、權限管控、品質檢查，不是「丟進來就好」。",
    relatedCards: ["hadoop-spark", "etl-elt"],
  },
  {
    id: "stream-batch",
    name: "串流 vs 批次",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "大數據技術與工具",
    oneLiner: "事件即時處理 vs 排程批量處理",
    explanation:
      "Batch：定期執行（每小時/每日），延遲高但成本低、邏輯簡單（Spark Batch、Airflow）。Stream：事件一進來就處理，毫秒-秒級延遲，但要處理亂序、晚到、exactly-once 等複雜性（Kafka、Flink、Spark Streaming）。Lambda 架構同時跑兩者。",
    whenToUse:
      "需要即時決策（詐欺攔截、即時推薦、監控告警）→ Stream。日報、月報、模型訓練 → Batch。Kappa 架構主張一律用 Stream。",
    codeExample: null,
    pitfall:
      "Stream 比 Batch 複雜很多，引入前要先確認延遲需求真的需要秒級。「即時感」常常 5 分鐘 batch 就夠用了，省下大量工程成本。",
    relatedCards: ["hadoop-spark"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 大數據處理分析 / 資料隱私與合規
  // ─────────────────────────────────────────────────────────────
  {
    id: "differential-privacy",
    name: "差分隱私（Differential Privacy）",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "資料隱私與合規",
    oneLiner: "加可量化的雜訊，讓單一個資無法被反推",
    explanation:
      "對統計查詢結果加上經過數學證明的雜訊（通常是 Laplace 或 Gaussian noise），確保「加入或移除任一筆資料」對輸出影響很小。隱私強度由 ε（epsilon）量化，越小越隱私但準確度越差。Apple、Google 用於系統遙測。",
    whenToUse:
      "開放統計查詢、發布總體資料、聯邦學習聚合時用來保護個體。對 high-stakes 個資（醫療、稅務）發布前處理。",
    codeExample: null,
    pitfall:
      "DP 不是「去識別化」 — 它對「群體查詢」做保護，不適合保護「資料本身」。ε 設定是工程與政策權衡，常見值 1-10 — 沒有單一正確答案。",
    relatedCards: ["anonymization", "federated-learning", "gdpr"],
  },
  {
    id: "federated-learning",
    name: "聯邦學習（Federated Learning）",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "資料隱私與合規",
    oneLiner: "資料不出本地、只交換模型參數",
    explanation:
      "Google 2017 年提出。各客戶端用本地資料訓練、上傳模型梯度（不是資料）到中央伺服器聚合，得到全域模型再發回。應用：手機輸入法（Gboard）、醫院間共訓模型、跨銀行反詐欺。",
    whenToUse:
      "資料因法規或競爭因素不能集中時。醫療、金融、跨企業協作場景。",
    codeExample: null,
    pitfall:
      "「資料不離開」≠「絕對安全」。梯度反推攻擊（gradient inversion）可從上傳的梯度還原部分資料。實務上常與差分隱私、安全聚合（Secure Aggregation）一起用。",
    relatedCards: ["differential-privacy", "gdpr"],
  },
  {
    id: "anonymization",
    name: "去識別化",
    level: "中級",
    category: "大數據處理分析",
    subcategory: "資料隱私與合規",
    oneLiner: "把個資轉成無法直接識別個人的形式",
    explanation:
      "方法層級：匿名化（移除直接識別碼，如姓名、身分證）、假名化（用代碼替代但可還原）、泛化（年齡 35 → 30-40 歲）、k-匿名（每筆至少與 k-1 筆其他資料無法區分）、l-多樣性、t-接近性。",
    whenToUse:
      "對外發布資料集、跨單位共享分析資料時。GDPR 允許「完全匿名」資料不受其管轄。",
    codeExample: null,
    pitfall:
      "考試陷阱：移除姓名 ≠ 匿名化。Netflix Prize 案例證明，看似匿名的觀影紀錄可被連結到 IMDB 帳號重識別。準匿名識別碼（出生日 + 郵遞區號 + 性別）就足以識別美國 87% 人口。",
    relatedCards: ["differential-privacy", "gdpr"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 機器學習技術 / 機器學習演算法
  // ─────────────────────────────────────────────────────────────
  {
    id: "linear-regression",
    name: "線性迴歸",
    level: "中級",
    category: "機器學習技術",
    subcategory: "機器學習演算法",
    oneLiner: "用一條直線（平面）擬合 X 到 y 的關係",
    explanation:
      "y = β₀ + β₁x₁ + β₂x₂ + ... + ε。用最小平方法找出讓殘差平方和最小的係數。可解釋性極佳（每個係數代表對應特徵的邊際影響）、計算便宜、是統計與 ML 的基石。",
    whenToUse:
      "輸出是連續數值、特徵與輸出大致線性、需要可解釋性時。房價預測、銷售預測、A/B 測試效應估計。",
    codeExample: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 6, 8])

model = LinearRegression().fit(X, y)
print(model.coef_, model.intercept_)   # [2.] 0.0
print(model.predict([[5]]))            # [10.]`,
    codeLang: "python",
    pitfall:
      "假設：(1) 線性 (2) 殘差常態分配 (3) 同質變異 (4) 觀察值獨立 (5) 特徵間無多重共線性。違反假設時係數估計仍可用但 p-value 不可信。看 r² 之外要做殘差分析。",
    relatedCards: ["regularization", "bias-variance"],
  },
  {
    id: "decision-tree",
    name: "決策樹",
    level: "中級",
    category: "機器學習技術",
    subcategory: "機器學習演算法",
    oneLiner: "用一系列「如果…就…」的二元判斷做分類或迴歸",
    explanation:
      "把資料反覆切分成更純的子集（用 Gini impurity 或 Information Gain 衡量純度）。可視化好、解釋性佳、能處理非線性、不需要 feature scaling。缺點：容易過擬合、對資料微小變動敏感。",
    whenToUse:
      "需要可解釋性的場景（金融授信、醫療診斷）、混合類別與數值特徵、做 baseline。",
    codeExample: null,
    pitfall:
      "單棵樹幾乎一定過擬合。實務上很少直接用單樹，會用 ensemble（Random Forest、XGBoost）。可解釋性其實隨樹深度迅速下降 — 深度 15 的樹其實沒人看得懂。",
    relatedCards: ["random-forest-xgboost", "overfitting"],
  },
  {
    id: "random-forest-xgboost",
    name: "Random Forest / XGBoost",
    level: "中級",
    category: "機器學習技術",
    subcategory: "機器學習演算法",
    oneLiner: "多棵樹的集成，表格資料的王者",
    explanation:
      "Random Forest 平行訓練多棵樹（Bagging），每棵看不同資料子集與特徵子集，預測時投票平均，降低 variance。XGBoost / LightGBM 串行訓練（Boosting），每棵樹修正前一棵的錯誤，常勝 Kaggle 表格資料比賽。",
    whenToUse:
      "結構化表格資料、特徵中等數量（10-1000）、不是時間序列或圖像。多數企業 ML 用例首選。",
    codeExample: `import xgboost as xgb
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y)

model = xgb.XGBClassifier(
    n_estimators=500,
    max_depth=6,
    learning_rate=0.05,
    early_stopping_rounds=20,
)
model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)
print(model.score(X_test, y_test))`,
    codeLang: "python",
    pitfall:
      "XGBoost 在表格資料 90% 場景都贏深度學習，但很多人「自動上 DL」浪費資源。先試 XGB baseline，再評估 DL 是否值得。樹模型不需要 normalize 特徵。",
    relatedCards: ["decision-tree", "hyperparameter-tuning"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 機器學習技術 / 深度學習
  // ─────────────────────────────────────────────────────────────
  {
    id: "neural-network",
    name: "類神經網路",
    level: "中級",
    category: "機器學習技術",
    subcategory: "深度學習",
    oneLiner: "用大量加權求和 + 非線性激活組成的可微分函數逼近器",
    explanation:
      "靈感來自生物神經元但其實是純數學物件。輸入 → 隱藏層（線性變換 + 激活函數，如 ReLU）→ 輸出。多層堆疊就是「深度」。萬能近似定理：足夠寬的單隱藏層網路可逼近任意連續函數。",
    whenToUse:
      "非結構化資料（圖、聲、文字）、特徵需要自動學習、資料量大時。表格資料通常 XGBoost 更實際。",
    codeExample: null,
    pitfall:
      "神經網路不會自己「知道」要學什麼，學什麼取決於資料與損失函數。資料偏誤、標註雜訊、損失函數設錯都會放大 — 「黑箱」不是模型故意藏，而是參數量太多人腦看不懂。",
    relatedCards: ["backprop", "ai-vs-ml-vs-dl"],
  },
  {
    id: "backprop",
    name: "反向傳播（Backpropagation）",
    level: "中級",
    category: "機器學習技術",
    subcategory: "深度學習",
    oneLiner: "用鏈鎖律從輸出層往回算梯度",
    explanation:
      "訓練神經網路的核心演算法：(1) 前向傳播算出輸出與 loss (2) 用鏈鎖律從 loss 一路往回計算每個參數的梯度 (3) 用 optimizer（SGD、Adam）更新參數。現代框架（PyTorch、TensorFlow）的 autograd 把這件事自動化。",
    whenToUse:
      "概念上每次訓練神經網路都會用。工程上自動進行，但理解原理對 debug、改架構、避免梯度爆炸/消失很重要。",
    codeExample: null,
    pitfall:
      "梯度消失（vanishing gradient）：深層網路 + sigmoid 激活，梯度逐層變小到接近零；ReLU、Residual Connection、Batch Norm 是常見對策。梯度爆炸（exploding gradient）：用 gradient clipping 處理。",
    relatedCards: ["neural-network"],
  },
  {
    id: "attention",
    name: "注意力機制（Attention）",
    level: "中級",
    category: "機器學習技術",
    subcategory: "深度學習",
    oneLiner: "讓模型動態決定「現在該專注看哪裡」",
    explanation:
      "計算 Query、Key、Value 三組向量，用 Q·K 算「相關性權重」，再用權重加總 V。Self-attention 是 Q/K/V 都來自同一序列。優點：可平行、可處理長距離依賴；缺點：時間與空間複雜度 O(n²)。",
    whenToUse:
      "理解 Transformer、LLM 為什麼能跨長距離理解上下文時必須。圖像 Transformer（ViT）、語音模型（Whisper）也都靠這個。",
    codeExample: null,
    pitfall:
      "「Attention 看哪裡」≠「人類直覺認為該看哪裡」。Attention 權重不等於可解釋性 — 大量論文表明 attention map 與模型決策相關性弱。",
    relatedCards: ["transformer", "neural-network"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 機器學習技術 / 模型訓練與調校
  // ─────────────────────────────────────────────────────────────
  {
    id: "fine-tuning",
    name: "Fine-tuning",
    level: "中級",
    category: "機器學習技術",
    subcategory: "模型訓練與調校",
    oneLiner: "用少量資料繼續訓練預訓練模型，調整其行為",
    explanation:
      "拿一個已經預訓練好的模型（例如 GPT、BERT），用你的領域資料再訓練幾個 epoch，讓它學會特定風格、術語或任務。比從零訓練便宜很多，但仍需要 GPU 和標註資料。LoRA、QLoRA 是常見的 parameter-efficient 做法。",
    whenToUse:
      "需要穩定的輸出格式、領域專業術語、固定風格時。如果只是「需要參考資料」，先試 RAG，通常更便宜也更易維護。",
    codeExample: `# Hugging Face PEFT + LoRA 範例
from peft import LoraConfig, get_peft_model
from transformers import AutoModelForCausalLM

base = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3-8B")
config = LoraConfig(r=8, lora_alpha=16, target_modules=["q_proj", "v_proj"])
model = get_peft_model(base, config)

# 只訓練 LoRA adapter（~1% 參數），VRAM 大幅降低
trainer.train()`,
    codeLang: "python",
    pitfall:
      "Fine-tune ≠ 給模型新知識。事實性知識難用 fine-tune 灌進去，模型可能記住格式但答錯內容。要事實正確還是用 RAG。",
    relatedCards: ["rag", "hyperparameter-tuning"],
  },
  {
    id: "hyperparameter-tuning",
    name: "超參數調校",
    level: "中級",
    category: "機器學習技術",
    subcategory: "模型訓練與調校",
    oneLiner: "用搜尋策略找出最佳的學習率、深度、正規化強度",
    explanation:
      "超參數 = 訓練前要設定、不會由訓練更新的參數（learning rate、batch size、樹深、dropout）。搜尋策略：Grid Search（窮舉，慢）、Random Search（多數情況更有效）、Bayesian Optimization（Optuna、Hyperopt）、Population-Based Training。",
    whenToUse:
      "baseline 跑出來後，要從「能跑」推到「能上線」的階段。注意：超參數搜尋有成本，不是每個參數都值得調。",
    codeExample: null,
    pitfall:
      "在 test set 上調超參數 = 資料外洩，得到的「最佳」會在線上表現變差。應該用 train / val / test 三分，調超參數只看 val，最後在 test 上確認一次。",
    relatedCards: ["cross-validation", "overfitting"],
  },
  {
    id: "cross-validation",
    name: "交叉驗證",
    level: "中級",
    category: "機器學習技術",
    subcategory: "模型訓練與調校",
    oneLiner: "把資料切 K 份輪流當驗證集，得到更穩定的評估",
    explanation:
      "K-Fold CV：把資料切 K 份（通常 5 或 10），每次用 K-1 份訓練、1 份驗證，循環 K 次平均。比單次 train/val split 更穩定，特別適合資料量不大時。Stratified K-Fold 保持每份的類別比例一致。時間序列要用 TimeSeriesSplit。",
    whenToUse:
      "資料量中小（<10 萬）、要選模型或超參數、需要對模型表現有信心區間時。",
    codeExample: null,
    pitfall:
      "時間序列資料用普通 K-Fold = 資料外洩（未來資料訓練、過去資料驗證）。一定要用 TimeSeriesSplit 或 walk-forward validation。Group 資料（同一使用者多筆）要用 GroupKFold。",
    relatedCards: ["hyperparameter-tuning", "overfitting"],
  },
  {
    id: "regularization",
    name: "正規化（Regularization）",
    level: "中級",
    category: "機器學習技術",
    subcategory: "模型訓練與調校",
    oneLiner: "在 loss 加懲罰項或加入隨機性，防止過擬合",
    explanation:
      "L1（Lasso）懲罰係數絕對值，會把不重要特徵歸零、做特徵選擇。L2（Ridge）懲罰係數平方，讓係數分散且小。Elastic Net 兩者混合。神經網路另有 Dropout（隨機 drop 神經元）、Batch Norm、Early Stopping、Data Augmentation。",
    whenToUse:
      "模型過擬合（train ≫ val）時的標準解。特徵多、樣本少的場景特別需要。",
    codeExample: null,
    pitfall:
      "L1 雖然能做特徵選擇，但對相關特徵的選擇不穩定（同類特徵中只挑一個）。要用 L2 或 Elastic Net 更穩定。Dropout 在推論時要關掉（用 eval mode）— 容易忘。",
    relatedCards: ["overfitting", "bias-variance"],
  },

  // ─────────────────────────────────────────────────────────────
  // 中級 / 機器學習技術 / ML治理
  // ─────────────────────────────────────────────────────────────
  {
    id: "data-drift",
    name: "Data Drift",
    level: "中級",
    category: "機器學習技術",
    subcategory: "ML治理",
    oneLiner: "線上資料分布隨時間偏離訓練時的分布",
    explanation:
      "模型上線後，輸入資料的統計性質會變（季節、使用者習慣、市場變化），預測品質會慢慢下滑。Data drift 是分布變，Concept drift 是輸入與標籤的關係變，兩者要分開處理。",
    whenToUse:
      "在正式環境的模型一定要監控。常見方法：PSI（Population Stability Index）、KS 檢定、嵌入分布距離。",
    codeExample: null,
    pitfall:
      "考試陷阱：誤以為準確率下降才是 drift。準確率下降是「結果」，drift 是「原因」之一；模型本身可能沒壞，是資料變了。要在標籤回來之前就先抓到。",
    relatedCards: ["mlops", "model-explainability"],
  },
  {
    id: "model-explainability",
    name: "模型可解釋性（SHAP / LIME）",
    level: "中級",
    category: "機器學習技術",
    subcategory: "ML治理",
    oneLiner: "幫黑箱模型解釋「為什麼這樣預測」",
    explanation:
      "SHAP（基於 Shapley value）給每個特徵對單筆預測的貢獻，是目前最嚴謹的解釋方法。LIME 在預測點附近擬合一個簡單模型來近似。整體解釋（global）看特徵重要性，局部解釋（local）看單筆原因。",
    whenToUse:
      "金融、醫療、招聘等高敏感決策需要對使用者解釋時。除錯模型行為、向商業端說明、合規審查（GDPR、AI Act）。",
    codeExample: `import shap
import xgboost as xgb

model = xgb.XGBClassifier().fit(X_train, y_train)
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 整體：哪些特徵最重要
shap.summary_plot(shap_values, X_test)

# 單筆：為什麼這筆被預測成這樣
shap.force_plot(explainer.expected_value, shap_values[0], X_test.iloc[0])`,
    codeLang: "python",
    pitfall:
      "「可解釋」≠「正確」。SHAP 顯示「模型依據什麼決策」不代表「模型是對的」。也不要把局部解釋當因果推論 — 它解釋的是模型行為，不是真實世界因果關係。",
    relatedCards: ["ml-bias-fairness", "ai-ethics"],
  },
  {
    id: "ml-bias-fairness",
    name: "ML 偏差與公平性",
    level: "中級",
    category: "機器學習技術",
    subcategory: "ML治理",
    oneLiner: "模型對不同族群的表現差異與系統性歧視風險",
    explanation:
      "資料偏誤（歷史資料反映人類偏見）+ 演算法偏誤（最佳化目標單一）會放大不公平。公平性指標彼此衝突：Demographic Parity（各族群正例率相同）、Equal Opportunity（各族群 TPR 相同）、Calibration（同分數同正例率）— 數學上不可同時滿足。",
    whenToUse:
      "招聘、信貸、保險、司法、醫療等影響個人權益的場景必須評估。EU AI Act 將其列為高風險系統的強制檢測項目。",
    codeExample: null,
    pitfall:
      "考試陷阱：「移除敏感屬性（性別、種族）就公平」是錯的 — 其他特徵（姓名、郵遞區號、職業）可能代理性地反映這些屬性。Fairness 是政策議題，不是純技術問題。",
    relatedCards: ["model-explainability", "ai-ethics", "eu-ai-act"],
  },
];

// Loader 介面：未來換成 fetch / Supabase 只要改這裡
export function getAllCards(): Card[] {
  return CARDS;
}

export function getCardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}

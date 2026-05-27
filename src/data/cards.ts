import type { Card } from "@/lib/types";

/**
 * Mock 卡片資料集，之後可替換為 CMS / Supabase。
 * 統一從 `getAllCards()` 取資料，方便未來切換 loader。
 */
export const CARDS: Card[] = [
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
    relatedCards: ["embedding", "vector-db"],
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
    relatedCards: ["rag"],
  },
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
    relatedCards: ["rag"],
  },
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
    relatedCards: [],
  },
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
    relatedCards: ["mlops"],
  },
];

// Loader 介面：未來換成 fetch / Supabase 只要改這裡
export function getAllCards(): Card[] {
  return CARDS;
}

export function getCardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}

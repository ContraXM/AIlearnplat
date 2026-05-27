# AI Flashcards (AIlearnplat)

給 Junior 工程師日常查詢、以及初/中級 AI 應用規劃師考生備考用的閃卡 App。
核心訴求：快速查詢、碎片時間複習。

## 技術棧

| 層 | 選擇 |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript (strict) |
| Styling | Tailwind CSS v4 + 客製 shadcn-style 元件 |
| State | Zustand（UI + 收藏，localStorage persist） |
| Search | Fuse.js（client-side fuzzy） |
| Code highlight | Shiki（build-time，RSC 友善） |
| 部署 | Vercel（free tier） |

## 開發指令

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## 目錄結構

```
src/
├── app/
│   ├── (main)/                  # Bottom Nav 共用 layout
│   │   ├── page.tsx             # 首頁卡片牆
│   │   ├── card/[id]/page.tsx   # 卡片詳細頁
│   │   ├── favorites/page.tsx
│   │   ├── exam/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                      # Button / Badge / Input / Switch / Select
│   ├── bottom-nav.tsx
│   ├── card-grid.tsx
│   ├── card-preview.tsx
│   ├── code-block.tsx           # Shiki server component
│   ├── exam-view.tsx
│   ├── favorites-view.tsx
│   ├── filter-bar.tsx
│   ├── home-view.tsx
│   ├── search-bar.tsx
│   ├── settings-view.tsx
│   ├── favorite-button.tsx
│   └── theme-provider.tsx
├── data/
│   ├── cards.ts                 # mock 卡片資料（loader 介面）
│   └── taxonomy.ts              # 級別 / 分類樹
├── lib/
│   ├── favorites.ts             # Zustand persist（之後切 Supabase）
│   ├── progress.ts              # 預留：學習進度 stub
│   ├── search.ts                # Fuse.js wrapper
│   ├── shiki.ts                 # shared highlighter
│   ├── types.ts                 # Card / Level / Category 型別
│   └── utils.ts                 # cn()
└── stores/
    └── ui-store.ts              # theme
```

## 已實作

- ✅ 五個主頁面（首頁 / 詳細 / 收藏 / 考試 / 設定）+ Bottom Nav
- ✅ 全文搜尋（Fuse.js，名稱+一句話+解釋+陷阱）
- ✅ 兩層篩選（級別 → 主題）
- ✅ 響應式卡片牆（桌面 3 欄、平板 2 欄、手機 1 欄）
- ✅ 詳細頁含 Shiki 程式碼高亮、相關卡片跳轉
- ✅ 收藏功能（localStorage persist）
- ✅ 考試模式（範圍篩選 + 隨機/依序 + 翻面 + 上下張）
- ✅ 深/淺模式切換（預設深色，無閃白）
- ✅ 卡片統計（總數、各分類）

## 預留擴充口

- 🔲 雲端同步：`lib/favorites.ts` 換成 Supabase（anonymous auth → 可 upgrade 至 Email/密碼、GitHub OAuth、Magic Link）
- 🔲 題目練習：`Card.quiz?: QuizQuestion[]` 已預留
- 🔲 學習進度：`lib/progress.ts` 已 stub，UI 不耦合 storage
- 🔲 實戰專案分類：taxonomy 已預留節點，等內容
- 🔲 PWA manifest / service worker

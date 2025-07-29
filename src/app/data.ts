import { Book } from "./types";

// app/data.ts - モックデータ
export const mockBooks: Book[] = [
  {
    id: "1",
    title: "Next.js 15完全ガイド",
    author: "田中太郎",
    description: "Next.js 15の新機能を詳しく解説した実践的なガイドブックです。",
    publishedYear: 2024,
    rating: 4.5,
  },
  {
    id: "2",
    title: "TypeScript実践入門",
    author: "山田花子",
    description:
      "TypeScriptの基礎から応用まで、実際のプロジェクトで役立つ知識を網羅。",
    publishedYear: 2024,
    rating: 4.7,
  },
  {
    id: "3",
    title: "React Server Components詳解",
    author: "佐藤次郎",
    description: "Server Componentsの概念から実装まで、詳細に解説した決定版。",
    publishedYear: 2024,
    rating: 4.3,
  },
];

// 学習用：ネットワーク遅延をシミュレート
export const simulateDelay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// app/components/BookList.tsx - Server Component
import { Book } from "../types";

// 🔍 [学習ポイント] fetch関数を独立させてデバッグしやすくする
async function fetchBooks(): Promise<Book[]> {
  console.log("🚀 fetchBooks関数が開始されました");
  console.log("🌐 リクエスト送信先:", "/api/books");

  try {
    // 🔍 [学習ポイント1] fetch実行前のログ
    const startTime = Date.now();
    console.log("📡 fetch実行開始 - 時刻:", new Date().toISOString());

    const response = await fetch("http://localhost:3000/api/books", {
      // 🔍 [学習ポイント2] 最初はデフォルトキャッシュで実行
      cache: "force-cache",
      next: {
        revalidate: 300,
        tags: ["books"],
      },
    });

    // 🔍 [学習ポイント3] fetch実行後のログ
    const endTime = Date.now();
    console.log("📡 fetch実行完了 - 実行時間:", endTime - startTime, "ms");
    console.log("📊 レスポンス詳細:", {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries()),
    });

    // 🔍 [学習ポイント4] HTTPエラーのチェック
    if (!response.ok) {
      console.error(
        "🚨 HTTPエラーが発生:",
        response.status,
        response.statusText
      );
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 🔍 [学習ポイント5] JSON変換前のログ
    console.log("🔄 JSONデータを解析中...");
    const result = await response.json();

    // 🔍 [学習ポイント6] 取得したデータの確認
    console.log("📚 取得したデータ:", {
      status: result.status,
      dataCount: result.data?.length || 0,
      timestamp: result.timestamp,
    });

    if (result.status === "error") {
      console.error("🚨 APIからエラーレスポンス:", result.message);
      throw new Error(result.message || "APIエラー");
    }

    console.log("✅ fetchBooks正常完了 - 書籍数:", result.data.length);
    return result.data;
  } catch (error: unknown) {
    // 🔍 [学習ポイント7] エラーハンドリングの詳細ログ
    if (error instanceof Error) {
      console.error("❌ fetchBooksでエラーが発生:", error);
      console.error("  エラータイプ:", error.constructor.name);
      console.error("  エラーメッセージ:", error.message);
      console.error("  スタックトレース:", error.stack);
    }
    throw error;
  }
}

// 🔍 [学習ポイント] Server Componentの実装
export default async function BookList() {
  console.log("🏗️ BookListコンポーネントがレンダリング開始");

  try {
    const books = await fetchBooks();

    console.log("🎨 BookListコンポーネント - JSX生成開始");

    return (
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
        <h1>📚 書籍一覧</h1>
        <p>取得した書籍数: {books.length}件</p>

        <div
          style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            marginTop: "20px",
          }}
        >
          {books.map((book) => (
            <div
              key={book.id}
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#f9fafb",
              }}
            >
              <h3 style={{ margin: "0 0 8px 0", color: "#1f2937" }}>
                {book.title}
              </h3>
              <p
                style={{
                  margin: "0 0 8px 0",
                  color: "#6b7280",
                  fontStyle: "italic",
                }}
              >
                著者: {book.author}
              </p>
              <p
                style={{
                  margin: "0 0 12px 0",
                  fontSize: "14px",
                  color: "#4b5563",
                }}
              >
                {book.description}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                <span>⭐ {book.rating}</span>
                <span>📅 {book.publishedYear}年</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error: unknown) {
    console.error("❌ BookListコンポーネントでエラー:", error);

    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
        }}
      >
        <h2 style={{ color: "#dc2626", margin: "0 0 12px 0" }}>
          エラーが発生しました
        </h2>
        <p style={{ color: "#7f1d1d", margin: "0" }}>
          書籍データの読み込みに失敗しました。ページを再読み込みしてください。
        </p>
        <p style={{ fontSize: "12px", color: "#991b1b", marginTop: "8px" }}>
          エラー: {error instanceof Error && error.message}
        </p>
      </div>
    );
  }
}

// app/api/books/route.ts
import { mockBooks, simulateDelay } from "../../data";
import { NextResponse } from "next/server";

export async function GET() {
  // 🔍 [学習ポイント] APIの実行ログ
  console.log(
    "📡 API /books が呼ばれました - タイムスタンプ:",
    new Date().toISOString()
  );

  try {
    // 🔍 [学習ポイント] 意図的な遅延でネットワーク監視の学習
    await simulateDelay(800);

    // 🔍 [学習ポイント] 10%の確率でエラーを発生（エラーハンドリング学習用）
    if (Math.random() < 0.1) {
      console.log("🔥 意図的なエラーを発生させました");
      throw new Error("ランダムAPIエラー");
    }

    console.log("✅ 書籍データを正常に返却:", mockBooks.length, "件");

    return NextResponse.json({
      data: mockBooks,
      status: "success",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ API エラーが発生:", error);

    return NextResponse.json(
      {
        data: null,
        status: "error",
        message: "サーバーエラーが発生しました",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

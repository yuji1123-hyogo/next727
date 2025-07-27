// app/page.tsx - 意図的に遅いホームページ
import Link from "next/link";

// 🚨 意図的な問題1: 重い同期処理
function heavyComputation() {
  console.log("🐌 重い計算開始...");
  let result = 0;
  for (let i = 0; i < 2000000; i++) {
    // 200万回のループ
    result += Math.random() * Math.sin(i);
  }
  console.log("🐌 重い計算完了:", result);
  return Math.floor(result);
}

// 🚨 意図的な問題2: 遅いデータ取得（APIシミュレーション）
async function getSlowData() {
  console.log("🐌 API呼び出し開始...");
  // 3秒の遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // 重い計算も含める
  const heavyResult = heavyComputation();

  console.log("🐌 API呼び出し完了");
  return {
    posts: [
      {
        id: 1,
        title: "Next.js 15パフォーマンス入門",
        excerpt: "App Routerを使った高速化テクニック",
        date: "2025-01-15",
      },
      {
        id: 2,
        title: "Lighthouse活用ガイド",
        excerpt: "Core Web Vitalsの実践的改善方法",
        date: "2025-01-14",
      },
      {
        id: 3,
        title: "TypeScript最適化",
        excerpt: "型安全性とパフォーマンスの両立",
        date: "2025-01-13",
      },
      {
        id: 4,
        title: "キャッシュ戦略",
        excerpt: "Next.js 15の4層キャッシュシステム",
        date: "2025-01-12",
      },
      {
        id: 5,
        title: "バンドル最適化",
        excerpt: "Webpack Bundle Analyzerの活用",
        date: "2025-01-11",
      },
    ],
    stats: {
      totalPosts: 5,
      totalViews: heavyResult, // 重い計算結果を使用
      avgReadTime: 7,
      lastUpdated: new Date().toISOString(),
    },
  };
}

export default async function HomePage() {
  console.log("📄 ページレンダリング開始");
  const data = await getSlowData();
  console.log("📄 データ取得完了");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 🚨 意図的な問題3: サイズ未指定コンテナ（CLS発生原因） */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            パフォーマンス学習ブログ
          </h1>
          <nav className="flex space-x-6">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ホーム
            </Link>
            <Link
              href="/dashboard"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ダッシュボード
            </Link>
            <Link
              href="/about"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              このサイトについて
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🚨 意図的な問題4: レイアウトシフトを起こす統計セクション */}
        <section className="mb-12">
          {/* サイズ未指定のコンテナ */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-center mb-8">サイト統計</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                {/* 動的に変化するコンテンツ（CLSの原因） */}
                <div className="text-5xl font-bold text-blue-600 mb-2">
                  {data.stats.totalPosts}
                </div>
                <div className="text-gray-600">総記事数</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-green-600 mb-2">
                  {data.stats.totalViews.toLocaleString()}
                </div>
                <div className="text-gray-600">総閲覧数</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-purple-600 mb-2">
                  {data.stats.avgReadTime}分
                </div>
                <div className="text-gray-600">平均読了時間</div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              最終更新:{" "}
              {new Date(data.stats.lastUpdated).toLocaleString("ja-JP")}
            </p>
          </div>
        </section>

        {/* 🚨 意図的な問題5: 大量のDOMと重いスタイル計算 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">最新記事</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* 🚨 重い画像（サイズ未指定） */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    記事 {post.id}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    <Link
                      href={`/posts/${post.id}`}
                      className="text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <time className="text-sm text-gray-500">{post.date}</time>
                    <Link
                      href={`/posts/${post.id}`}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                      続きを読む
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 🚨 意図的な問題6: 不要なコンテンツ（バンドルサイズ増加） */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">
            パフォーマンス分析データ
          </h2>
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {Array.from({ length: 20 }, (_, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded">
                  <div className="text-2xl font-bold text-gray-800">
                    {Math.floor(Math.random() * 1000)}
                  </div>
                  <div className="text-sm text-gray-600">指標 {i + 1}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 パフォーマンス学習ブログ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

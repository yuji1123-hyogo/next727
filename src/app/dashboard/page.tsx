// app/dashboard/page.tsx - さらに重いダッシュボード
export default async function DashboardPage() {
  // 🚨 より重い処理をシミュレート
  console.log("📊 ダッシュボードデータ生成開始...");

  // 5秒の遅延 + 重い計算
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // 大量のデータ生成
  const chartData = Array.from({ length: 50000 }, (_, i) => ({
    x: i,
    y: Math.sin(i / 1000) * Math.random() * 100,
    processed: Math.cos(i / 500) * 50,
  }));

  console.log("📊 ダッシュボードデータ生成完了");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-8">重いダッシュボード</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">データポイント数</h3>
          <div className="text-3xl font-bold text-blue-600">
            {chartData.length.toLocaleString()}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">処理時間</h3>
          <div className="text-3xl font-bold text-red-600">5.0秒</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">メモリ使用量</h3>
          <div className="text-3xl font-bold text-yellow-600">高負荷</div>
        </div>
      </div>

      {/* 重い描画処理 */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">データ可視化（重い処理）</h3>
        <div className="grid grid-cols-20 gap-1 h-64">
          {chartData.slice(0, 1000).map((point, index) => (
            <div
              key={index}
              className="bg-blue-600 rounded-sm"
              style={{
                height: `${Math.abs(point.y) % 100}%`,
                alignSelf: "flex-end",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

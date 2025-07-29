// app/page.tsx
import BookList from "./components/BookList";

export default function HomePage() {
  console.log("🏠 ホームページがレンダリング開始");

  return (
    <main>
      <BookList />
    </main>
  );
}

import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

// サイドバーに表示するナビゲーションリンクの一覧
// ツールを追加するときはここにも追記する
const NAV_LINKS = [
  { label: "ホーム", path: "/" },
  { label: "Stopwatch", path: "/stopwatch" },
  { label: "Timer", path: "/timer" },
  { label: "Pomodoro Timer", path: "/pomodoro" },
  { label: "UUID v4 Generator", path: "/uuid-v4" },
  { label: "Random String Generator", path: "/random-string" },
];

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* サイドバーが開いているとき、背後を暗くして「外をクリックで閉じる」を実現する */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* サイドバー本体：translate-x で画面外に隠し、開閉時はスライドアニメーション */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="font-semibold">mywebtools</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(false)}
            className="text-white hover:text-white hover:bg-gray-700"
          >
            ✕
          </Button>
        </div>
        <nav className="mt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block px-4 py-2 hover:bg-gray-700 transition-colors"
              onClick={() => setIsSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* メインコンテンツ：サイドバーとは独立してフル幅で表示 */}
      <div className="flex-1">
        <header className="bg-gray-100 p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </Button>
        </header>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

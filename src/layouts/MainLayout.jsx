import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-warmgray-50 lg:flex-row">
      {/* 데스크톱 고정 사이드바 */}
      <aside className="hidden w-64 shrink-0 border-r border-warmgray-200 bg-warmgray-50 lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar />
        </div>
      </aside>

      {/* 모바일 상단 헤더 + 햄버거 */}
      <header className="flex shrink-0 items-center justify-between border-b border-warmgray-200 bg-warmgray-50 px-4 py-4 lg:hidden">
        <h1 className="text-lg font-semibold">옵션노트</h1>
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-lg hover:bg-warmgray-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      {/* 모바일 드로어 메뉴 */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="메뉴 닫기"
            className="absolute inset-0 bg-charcoal/40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 bg-warmgray-50 shadow-xl">
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </div>
        </div>
      )}

      <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}

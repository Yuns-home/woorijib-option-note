import { NavLink } from 'react-router-dom'

const menuItems = [
  { to: '/', label: '홈', end: true },
  { to: '/ai-consult', label: 'AI 옵션 상담' },
  { to: '/options', label: '옵션 고르기' },
  { to: '/family', label: '가족 의견' },
  { to: '/summary', label: '선택 요약' },
  { to: '/move-in', label: '입주 준비' },
  { to: '/final-submit', label: '최종 제출' },
]

export default function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="px-6 py-8">
          <p className="text-sm text-charcoal-soft">우리집</p>
          <h1 className="text-xl font-semibold">옵션노트</h1>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 text-[15px] transition-colors ${
                  isActive
                    ? 'bg-point-soft text-point font-medium'
                    : 'text-charcoal-soft hover:bg-warmgray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="border-t border-warmgray-200 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-warmgray-200 text-sm text-charcoal-soft">
            김
          </div>
          <div>
            <p className="text-sm font-medium">김민석 님</p>
            <p className="text-xs text-charcoal-soft">래미안 엘라빈 115㎡</p>
          </div>
        </div>
      </div>
    </div>
  )
}

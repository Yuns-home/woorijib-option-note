// 집이 선으로 그려지는 로딩 애니메이션 (지붕 → 벽 → 문 순서로 반복).
// 색은 브랜드 딥그린(--color-point)을 참조하므로 디자인 시스템과 자동으로 일치.
export default function HouseLoader({ size = 80, label = 'AI가 우리 가족 프로필을 바탕으로 옵션을 살펴보는 중입니다…' }) {
  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <style>{`
        @keyframes houseRoof {
          0% { stroke-dashoffset: 92; }
          28%, 85%, 95% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 92; }
        }
        @keyframes houseWalls {
          0%, 28% { stroke-dashoffset: 120; }
          55%, 85%, 95% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 120; }
        }
        @keyframes houseDoor {
          0%, 55% { stroke-dashoffset: 48; }
          78%, 90% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 48; }
        }
        .house-loader path { animation-duration: 2.4s; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
        .house-loader .roof  { stroke-dasharray: 92;  animation-name: houseRoof; }
        .house-loader .walls { stroke-dasharray: 120; animation-name: houseWalls; }
        .house-loader .door  { stroke-dasharray: 48;  animation-name: houseDoor; }
        @media (prefers-reduced-motion: reduce) {
          .house-loader path { animation: none; stroke-dashoffset: 0; }
        }
      `}</style>

      <svg
        className="house-loader"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={label}
        fill="none"
        stroke="var(--color-point)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path className="roof" d="M18 46 L50 20 L82 46" />
        <path className="walls" d="M26 44 L26 80 L74 80 L74 44" />
        <path className="door" d="M43 80 L43 60 L57 60 L57 80" />
      </svg>

      {label && <p className="text-[15px] text-charcoal-soft">{label}</p>}
    </div>
  )
}

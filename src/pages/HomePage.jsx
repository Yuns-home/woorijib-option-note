import { Link } from 'react-router-dom'
import { useSelection } from '../context/SelectionContext'

const CONTRACT_DDAY = 15

export default function HomePage() {
  const { allOptions, selectedCount } = useSelection()
  const undecidedCount = Math.max(allOptions.length - selectedCount, 0)
  const progressPercent = allOptions.length
    ? Math.round((selectedCount / allOptions.length) * 100)
    : 0

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-12 lg:py-16">
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-warmgray-100 px-4 py-1.5 text-sm text-charcoal-soft">
          래미안 엘라빈 115㎡
        </span>
        <span className="rounded-full bg-point-soft px-4 py-1.5 text-sm font-medium text-point">
          마감 D-{CONTRACT_DDAY}
        </span>
      </div>

      <h2 className="text-2xl font-semibold leading-snug lg:text-3xl">
        어디까지 고르셨는지 기억 안 나셔도 괜찮아요.
        <br />
        여기서 이어서 보시면 됩니다.
      </h2>

      <div className="relative mt-8 overflow-hidden rounded-2xl border border-warmgray-200 bg-gradient-to-br from-warmgray-100 via-warmgray-50 to-point-soft p-6 lg:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-charcoal-soft">현재 진행 상황</p>
            <p className="mt-2 text-xl font-semibold">
              아직 안 정한 옵션{' '}
              <span className="text-point">{undecidedCount}개</span>
            </p>
          </div>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/70 text-point">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 11l3 3L22 4M2 12l3 3 3-3M2 6l3 3 3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm tabular text-charcoal-soft">
          <span>전체 {allOptions.length}개 항목</span>
          <span>{selectedCount}개 선택</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-warmgray-200">
          <div
            className="h-full rounded-full bg-point"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/options"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-point text-[17px] font-medium text-white transition-colors hover:bg-point-dark"
        >
          이어서 옵션 고르기 →
        </Link>
        <Link
          to="/ai-consult"
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-point text-[17px] font-medium text-point transition-colors hover:bg-point-soft"
        >
          AI 옵션 상담 받기
        </Link>
      </div>
    </div>
  )
}

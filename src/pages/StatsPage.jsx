import { Link } from 'react-router-dom'
import { useSelection } from '../context/SelectionContext'
import {
  OPTION_STATS,
  STATS_CRITERIA,
  STATS_SAMPLE,
  STATS_CATEGORY_ORDER,
} from '../data/optionStats'

export default function StatsPage() {
  const { allOptions, optionsById } = useSelection()

  // 카테고리별로 옵션을 묶고, 각 그룹 안에서 선택률 높은 순 정렬
  const grouped = STATS_CATEGORY_ORDER.map((cat) => {
    const items = allOptions
      .filter((o) => o.category_id === cat.id && OPTION_STATS[o.id] != null)
      .map((o) => ({ id: o.id, name: o.name, rate: OPTION_STATS[o.id] }))
      .sort((a, b) => b.rate - a.rate)
    return { ...cat, items }
  }).filter((g) => g.items.length > 0)

  // 전체 인기 옵션 상위 5개 (하이라이트용)
  const top5 = Object.entries(OPTION_STATS)
    .map(([id, rate]) => ({ id, rate, name: optionsById[id]?.name ?? id }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 5)

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 lg:px-12 lg:py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold lg:text-3xl">다른 입주자 선택</h2>
          <p className="mt-2 text-charcoal-soft">{STATS_CRITERIA}</p>
          <p className="mt-1 text-sm text-charcoal-soft">
            {STATS_SAMPLE.toLocaleString()}가구 기준 · 참고용 예시 데이터
          </p>
        </div>
        <Link
          to="/options"
          className="shrink-0 rounded-lg border border-warmgray-200 px-4 py-2 text-sm text-charcoal-soft transition-colors hover:bg-warmgray-100"
        >
          옵션 고르기
        </Link>
      </div>

      {/* 인기 옵션 상위 5개 */}
      <div className="mt-8 rounded-2xl border border-warmgray-200 bg-warmgray-50 p-6">
        <p className="text-sm font-medium text-charcoal-soft">가장 많이 선택한 옵션</p>
        <div className="mt-4 space-y-3">
          {top5.map((item, i) => (
            <div key={item.id} className="flex items-center gap-3">
              <span className="tabular w-5 shrink-0 text-sm font-semibold text-point">
                {i + 1}
              </span>
              <span className="flex-1 truncate text-[15px]">{item.name}</span>
              <span className="tabular text-sm font-semibold text-point">{item.rate}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* 카테고리별 전체 통계 */}
      <div className="mt-10 space-y-10">
        {grouped.map((group) => (
          <section key={group.id}>
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <div className="mt-4 space-y-4">
              {group.items.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-[15px]">{item.name}</span>
                    <span className="tabular text-sm font-semibold text-point">
                      {item.rate}%
                    </span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-warmgray-200">
                    <div
                      className="h-full rounded-full bg-point transition-[width] duration-500"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <p className="mt-10 text-xs text-charcoal-soft">
        ※ 표시된 수치는 데모용 예시 데이터이며 실제 통계가 아닙니다.
      </p>
    </div>
  )
}

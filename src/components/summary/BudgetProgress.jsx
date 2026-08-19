import { formatPrice } from '../../utils/formatPrice'

export default function BudgetProgress({ budget, used }) {
  const percent = budget > 0 ? Math.min(100, Math.round((used / budget) * 100)) : 0

  return (
    <div className="rounded-2xl border border-warmgray-200 bg-white p-6 lg:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <p className="text-lg font-semibold">예산 진행 현황</p>
          <p className="mt-1 text-sm text-charcoal-soft">
            설정된 예산 {formatPrice(budget)} 중{' '}
            <span className="font-medium text-charcoal">{formatPrice(used)}</span> 사용
          </p>
        </div>
        <span className="text-3xl font-semibold tabular text-point">{percent}%</span>
      </div>

      <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-warmgray-200">
        <div
          className="h-full rounded-full bg-point transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

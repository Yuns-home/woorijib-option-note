import JudgmentBadge from './JudgmentBadge'
import { formatPrice } from '../../utils/formatPrice'

const ORDER = ['추천', '선택사항', '불필요']

export default function ResultsList({ judgments, optionsById }) {
  const entries = Object.entries(judgments)
    .filter(([id]) => optionsById[id])
    .sort((a, b) => ORDER.indexOf(a[1].judgment) - ORDER.indexOf(b[1].judgment))

  if (entries.length === 0) return null

  return (
    <div className="mt-8 space-y-3 text-left">
      {entries.map(([id, result]) => {
        const option = optionsById[id]
        return (
          <div key={id} className="rounded-xl border border-warmgray-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{option.name}</p>
              <span className="tabular text-sm text-charcoal-soft">
                {formatPrice(option.price)}
              </span>
            </div>
            <div className="mt-2">
              <JudgmentBadge judgment={result.judgment} reason={result.reason} size="sm" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

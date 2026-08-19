import { formatPrice } from '../../utils/formatPrice'

export default function CategorySummaryList({ groups }) {
  if (groups.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-warmgray-300 bg-warmgray-100 p-10 text-center text-charcoal-soft">
        아직 선택한 옵션이 없습니다. '옵션 고르기'에서 먼저 옵션을 선택해 주세요.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-warmgray-200 bg-white">
      <div className="flex items-center justify-between border-b border-warmgray-200 px-6 py-4">
        <p className="text-lg font-semibold">상세 내역서</p>
        <span className="text-xs text-charcoal-soft">Ref: OPT-2026-0819</span>
      </div>

      {groups.map((group, idx) => (
        <div
          key={group.categoryId}
          className={`px-6 py-5 ${idx !== groups.length - 1 ? 'border-b border-warmgray-100' : ''}`}
        >
          <p className="mb-3 font-medium">{group.categoryName}</p>
          <div className="space-y-3">
            {group.items.map((item) => (
              <div key={item.id} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[15px]">{item.name}</p>
                  {item.subtext && (
                    <p className="mt-0.5 text-sm text-charcoal-soft">{item.subtext}</p>
                  )}
                </div>
                <p className="shrink-0 tabular font-medium">{formatPrice(item.price)}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

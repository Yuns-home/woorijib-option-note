import { PRIORITY_LABEL } from '../../utils/priority'

export default function ItemCard({ item, rank, communityLink }) {
  return (
    <div className="flex flex-col rounded-2xl border border-warmgray-200 bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-warmgray-100 text-xs font-medium text-charcoal-soft">
            {rank}
          </span>
          <span className="rounded-full bg-point-soft px-2.5 py-1 text-xs font-medium text-point">
            {PRIORITY_LABEL[item.priority]}
          </span>
        </div>
        <span className="tabular text-xs text-charcoal-soft">
          준비율 {item.base_essential}%
        </span>
      </div>

      <p className="mt-3 text-lg font-semibold">{item.name}</p>
      <p className="text-sm text-charcoal-soft">{item.category}</p>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal-soft">
        {item.note}
      </p>

      {item.linked_option && (
        <p className="mt-2 text-xs text-charcoal-soft">
          연관 옵션: 옵션 고르기의 &lsquo;{item.linkedOptionName}&rsquo; 미선택
        </p>
      )}

      {communityLink ? (
        <a
          href={communityLink.url}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex h-11 items-center justify-center rounded-xl border border-point text-[15px] font-medium text-point transition-colors hover:bg-point-soft"
        >
          공동구매 보기 →
        </a>
      ) : (
        <button
          type="button"
          disabled
          className="mt-4 flex h-11 items-center justify-center rounded-xl border border-warmgray-200 text-[15px] font-medium text-charcoal-soft/60"
        >
          공동구매 준비중
        </button>
      )}
    </div>
  )
}

import { formatPrice } from '../../utils/formatPrice'

export default function OptionListItem({ option, isSelected, isActive, price, onClick }) {
  const thumb = option.after_image || option.before_image

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full gap-3 rounded-xl border p-3 text-left transition-colors ${
        isActive
          ? 'border-point bg-point-soft'
          : 'border-warmgray-200 bg-white hover:border-warmgray-300'
      }`}
    >
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-warmgray-100">
        {thumb ? (
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-charcoal-soft">
            {option.name.slice(0, 1)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-[15px] font-medium">{option.name}</p>
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              isSelected
                ? 'border-point bg-point text-white'
                : 'border-warmgray-300 bg-white'
            }`}
          >
            {isSelected && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12l5 5L20 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </div>

        {option.star && (
          <span className="mt-1 inline-block rounded-full bg-point-soft px-2 py-0.5 text-xs font-medium text-point">
            우리 가족 기준 추천
          </span>
        )}

        <p className="mt-1 tabular text-sm text-charcoal-soft">
          {price > 0 ? `+ ${formatPrice(price)}` : '무상'}
        </p>
      </div>
    </button>
  )
}

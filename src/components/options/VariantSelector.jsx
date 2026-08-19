import { formatPrice } from '../../utils/formatPrice'

export default function VariantSelector({ variants, selectedVariantId, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      {variants.map((variant) => {
        const isActive = variant.id === selectedVariantId
        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => onSelect(variant.id)}
            className={`rounded-xl border p-4 text-left transition-colors ${
              isActive
                ? 'border-point bg-point-soft'
                : 'border-warmgray-200 bg-white hover:border-warmgray-300'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium">{variant.name}</p>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  isActive
                    ? 'border-point bg-point text-white'
                    : 'border-warmgray-300 bg-white'
                }`}
              >
                {isActive && (
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
            {variant.detail && (
              <p className="mt-1 text-sm text-charcoal-soft">{variant.detail}</p>
            )}
            <p className="mt-2 tabular text-sm font-medium text-point">
              {formatPrice(variant.price)}
            </p>
          </button>
        )
      })}
    </div>
  )
}

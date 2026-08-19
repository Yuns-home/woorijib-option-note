export default function SideBySideCompare({ beforeImage, afterImage, beforeText, afterText, onSelect, isSelected }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-warmgray-200 bg-white">
        <div className="px-3 pt-3">
          <span className="rounded-full bg-warmgray-100 px-2.5 py-1 text-xs font-medium text-charcoal-soft">
            변경 전
          </span>
        </div>
        <img
          src={beforeImage}
          alt="변경 전"
          className="mt-3 aspect-4/3 w-full object-cover"
        />
        {beforeText && (
          <p className="px-3 py-3 text-sm text-charcoal-soft">{beforeText}</p>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border-2 border-point bg-white">
        <div className="px-3 pt-3">
          <span className="rounded-full bg-point-soft px-2.5 py-1 text-xs font-medium text-point">
            변경 후
          </span>
        </div>
        <img
          src={afterImage}
          alt="변경 후"
          className="mt-3 aspect-4/3 w-full object-cover"
        />
        {afterText && (
          <p className="px-3 py-3 text-sm text-charcoal-soft">{afterText}</p>
        )}
        {onSelect && (
          <div className="px-3 pb-3">
            <button
              type="button"
              onClick={onSelect}
              className={`flex h-11 w-full items-center justify-center rounded-lg text-[15px] font-medium transition-colors ${
                isSelected
                  ? 'border border-point text-point hover:bg-point-soft'
                  : 'bg-point text-white hover:bg-point-dark'
              }`}
            >
              {isSelected ? '선택 취소하기' : '이 옵션 선택'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

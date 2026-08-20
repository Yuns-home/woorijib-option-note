export default function ComparisonTable({
  optionId,
  optionName,
  categoryName,
  entries,
  isUnanimous,
  decidedUser,
  onDecide,
}) {
  const needsDecision = !isUnanimous && !decidedUser

  return (
    <div
      className={`rounded-2xl border bg-white p-6 ${
        needsDecision ? 'border-rose-200' : 'border-warmgray-200'
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-charcoal-soft">{categoryName}</p>
          <p className="text-lg font-semibold">{optionName}</p>
        </div>
        {isUnanimous ? (
          <span className="rounded-full bg-point-soft px-3 py-1 text-sm font-medium text-point">
            ✓ 전원 일치
          </span>
        ) : decidedUser ? (
          <span className="rounded-full bg-point-soft px-3 py-1 text-sm font-medium text-point">
            ✓ 결정됨
          </span>
        ) : (
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">
            ! 의견 불일치
          </span>
        )}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entries.map((entry) => {
          const isChosen = decidedUser === entry.user
          const thumb = entry.selected ? entry.afterImage : entry.beforeImage

          return (
            <div
              key={entry.user}
              className={`relative overflow-hidden rounded-xl border p-4 ${
                isChosen ? 'border-point ring-1 ring-point' : 'border-warmgray-200'
              }`}
            >
              {isChosen && (
                <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-point text-white">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12l5 5L20 7"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}

              <p className="text-sm font-medium text-charcoal-soft">{entry.user}</p>

              {thumb && (
                <img
                  src={thumb}
                  alt=""
                  className="mt-2 aspect-4/3 w-full rounded-lg object-cover"
                />
              )}

              <p className="mt-3 font-medium">
                {entry.selected ? '선택함' : '선택 안 함'}
              </p>

              {entry.reason && (
                <div className="mt-2 rounded-lg bg-warmgray-100 p-3 text-sm text-charcoal-soft">
                  <p className="mb-1 font-medium text-charcoal">선택 이유</p>
                  <p>&ldquo;{entry.reason}&rdquo;</p>
                </div>
              )}

              {/* 불일치 항목에서만 "이 의견으로 결정" 버튼 */}
              {!isUnanimous && (
                <button
                  type="button"
                  onClick={() => onDecide(optionId, entry.user)}
                  className={`mt-3 flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    isChosen
                      ? 'bg-point text-white'
                      : 'border border-point text-point hover:bg-point-soft'
                  }`}
                >
                  {isChosen ? '이 의견으로 결정됨' : `${entry.user.split('(')[0]} 의견으로 결정`}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

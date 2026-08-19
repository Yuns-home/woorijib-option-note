export default function ComparisonTable({ optionName, categoryName, entries, isUnanimous, activeMember }) {
  return (
    <div className="rounded-2xl border border-warmgray-200 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-charcoal-soft">{categoryName}</p>
          <p className="text-lg font-semibold">{optionName}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            isUnanimous ? 'bg-point-soft text-point' : 'bg-rose-100 text-rose-700'
          }`}
        >
          {isUnanimous ? '✓ 전원 일치' : '! 의견 불일치'}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {entries.map((entry) => {
          const isActive = entry.user === activeMember
          const thumb = entry.selected ? entry.afterImage : entry.beforeImage

          return (
            <div
              key={entry.user}
              className={`relative overflow-hidden rounded-xl border p-4 ${
                isActive ? 'border-charcoal' : 'border-warmgray-200'
              }`}
            >
              {isActive && (
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

              {entry.status === '최종확정' && (
                <span className="mt-2 inline-block rounded-full bg-point-soft px-2.5 py-1 text-xs font-medium text-point">
                  최종확정
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

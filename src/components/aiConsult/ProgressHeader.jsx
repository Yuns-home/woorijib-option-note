export default function ProgressHeader({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div>
      <div className="flex items-center justify-between text-sm text-charcoal-soft">
        <span>프로필 질문</span>
        <span className="tabular">
          {current}/{total}
        </span>
      </div>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-warmgray-200">
        <div
          className="h-full rounded-full bg-point transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

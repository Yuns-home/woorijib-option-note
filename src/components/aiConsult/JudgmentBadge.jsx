const STYLES = {
  추천: 'bg-point-soft text-point',
  불필요: 'bg-warmgray-200 text-charcoal-soft',
  선택사항: 'border border-warmgray-300 bg-warmgray-100 text-charcoal-soft',
}

export default function JudgmentBadge({ judgment, reason, size = 'md' }) {
  if (!judgment) return null
  const style = STYLES[judgment] ?? STYLES['선택사항']
  const textSize = size === 'sm' ? 'text-xs' : 'text-sm'

  return (
    <div className={`flex flex-col items-start gap-1.5 ${textSize}`}>
      <span className={`inline-flex w-fit items-center rounded-full px-3 py-1 font-medium ${style}`}>
        우리 가족 기준: {judgment}
      </span>
      {reason && <p className="text-charcoal-soft leading-relaxed">{reason}</p>}
    </div>
  )
}

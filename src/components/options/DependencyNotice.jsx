export default function DependencyNotice({ optionId, dependencies, optionsById }) {
  const related = dependencies.filter(
    (dep) => dep.base_option === optionId || dep.related_option === optionId
  )

  if (related.length === 0) return null

  return (
    <div className="flex flex-col gap-2">
      {related.map((dep, i) => {
        const partnerId =
          dep.base_option === optionId ? dep.related_option : dep.base_option
        const partnerName = optionsById[partnerId]?.name ?? partnerId
        const isExclusive = dep.type === 'exclusive'

        return (
          <div
            key={i}
            className={`rounded-lg px-4 py-3 text-sm ${
              isExclusive
                ? 'bg-warmgray-100 text-charcoal-soft'
                : 'bg-point-soft text-point'
            }`}
          >
            {isExclusive ? '⚠ ' : 'ℹ '}
            {isExclusive
              ? `'${partnerName}' 옵션과 중복 선택할 수 없습니다. `
              : `'${partnerName}' 옵션과 함께 선택해야 적용됩니다. `}
            {dep.reason}
          </div>
        )
      })}
    </div>
  )
}

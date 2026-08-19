// option_dependencies 해석 유틸
// type: "exclusive" - 한쪽 선택 시 반대쪽 자동 해제
// type: "dependent" - 안내 메시지만 표시 (자동 해제 없음)

export function getDependenciesFor(optionId, dependencies) {
  return dependencies.filter(
    (dep) => dep.base_option === optionId || dep.related_option === optionId
  )
}

export function getExclusivePartners(optionId, dependencies) {
  return dependencies
    .filter((dep) => dep.type === 'exclusive')
    .filter((dep) => dep.base_option === optionId || dep.related_option === optionId)
    .map((dep) => (dep.base_option === optionId ? dep.related_option : dep.base_option))
}

export function getDependentNotices(optionId, dependencies) {
  return dependencies.filter(
    (dep) =>
      dep.type === 'dependent' &&
      (dep.base_option === optionId || dep.related_option === optionId)
  )
}

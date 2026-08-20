// 다른 입주자 선택 통계 (더미 데이터)
// "비슷한 조건(전용 84~115㎡ · 수도권 · 최근 2년 입주) 입주자들의 옵션 선택률"
// 실제 표본이 아닌 데모용 가짜 데이터입니다. 옵션 성격에 맞춰 그럴듯하게 배치했습니다.

export const STATS_CRITERIA = '전용 84~115㎡ · 수도권 · 최근 2년 입주'
export const STATS_SAMPLE = 1240

// option_id → 선택률(%)
// 실용·가전 계열은 높게, 최고가·기호성 계열은 낮게.
export const OPTION_STATS = {
  // 공간
  clean: 48,
  door: 67,
  multi: 41,
  next: 44,
  kitchen: 59,
  boutique: 36,
  // 가구
  kfurn: 27,
  bedroom: 54,
  // 마감
  tile: 72,
  artwall: 34,
  nextfloor: 69,
  floor: 14,
  entry: 39,
  // 가전
  ac: 81,
  induction: 62,
  dish: 74,
  oven: 33,
  // 조명
  light: 51,
  dining: 29,
  living: 56,
}

// 카테고리 순서·이름 (통계 화면 그룹 정렬용)
export const STATS_CATEGORY_ORDER = [
  { id: 'space', name: '공간' },
  { id: 'furniture', name: '가구' },
  { id: 'finish', name: '마감' },
  { id: 'appliance', name: '가전' },
  { id: 'light', name: '조명' },
]

export function getSelectRate(optionId) {
  return OPTION_STATS[optionId] ?? null
}

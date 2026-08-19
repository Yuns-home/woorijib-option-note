export function getPriorityLevel(rate) {
  if (rate >= 70) return 'high'
  if (rate >= 40) return 'medium'
  return 'low'
}

export const PRIORITY_LABEL = {
  high: '우선순위 높음',
  medium: '우선순위 중간',
  low: '우선순위 낮음',
}

export const PRIORITY_ORDER = ['high', 'medium', 'low']

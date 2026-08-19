export function formatPrice(value) {
  if (!value) return '0원'
  return `${value.toLocaleString('ko-KR')}원`
}

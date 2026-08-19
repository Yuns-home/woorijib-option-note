import { useState } from 'react'
import { formatPrice } from '../../utils/formatPrice'

export default function TotalCard({ total, itemCount }) {
  const [toast, setToast] = useState(null)

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  return (
    <div className="relative rounded-2xl border border-warmgray-200 bg-warmgray-100 p-6">
      <p className="text-lg font-semibold">총 합산 금액</p>
      <p className="mt-1 text-sm text-charcoal-soft">선택된 총 {itemCount}개 항목</p>

      <p className="mt-4 tabular text-3xl font-semibold text-point">
        {formatPrice(total)}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => showToast('가족에게 공유 링크가 생성되었습니다. (데모)')}
          className="flex h-12 items-center justify-center gap-2 rounded-xl bg-point text-[15px] font-medium text-white transition-colors hover:bg-point-dark"
        >
          가족에게 공유
        </button>
        <button
          type="button"
          onClick={() => showToast('공동구매 커뮤니티로 연결합니다. (데모)')}
          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-point text-[15px] font-medium text-point transition-colors hover:bg-point-soft"
        >
          공동구매 커뮤니티 연결
        </button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-charcoal-soft">
        가족과 공유하여 의견을 나누거나, 이웃과 공동구매하여 혜택을 받아보세요.
      </p>

      {toast && (
        <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 translate-y-full rounded-lg bg-charcoal px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

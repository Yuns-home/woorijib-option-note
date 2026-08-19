import { useMemo, useState } from 'react'
import { useSelection } from '../context/SelectionContext'
import { formatPrice } from '../utils/formatPrice'

export default function FinalSubmitPage() {
  const { categories, optionsById, selections, totalPrice, priceOf, selectedCount } =
    useSelection()
  const [toast, setToast] = useState(null)

  const groups = useMemo(() => {
    return categories
      .map((category) => {
        const items = Object.entries(selections)
          .filter(([id, sel]) => sel.selected && optionsById[id].category_id === category.id)
          .map(([id, sel]) => {
            const option = optionsById[id]
            const variant = option.is_choice
              ? option.variants.find((v) => v.id === sel.variantId)
              : null
            return {
              id,
              name: variant ? `${option.name} · ${variant.name}` : option.name,
              price: priceOf(option, sel.variantId),
            }
          })
        return { categoryName: category.name, items }
      })
      .filter((group) => group.items.length > 0)
  }, [categories, optionsById, selections, priceOf])

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="relative mx-auto max-w-3xl px-6 py-10 lg:px-10 lg:py-14 print:max-w-none">
      <div className="rounded-xl bg-point-soft px-5 py-4 text-sm text-point print:hidden">
        계약 담당자에게 전달하는 단계입니다. 최종 확인 후 제출해 주세요.
      </div>

      <h2 className="mt-6 text-2xl font-semibold lg:text-3xl">최종 제출</h2>
      <p className="mt-2 text-charcoal-soft">
        지금까지 선택한 옵션 내역입니다. 아래 내용대로 계약 담당자에게 전달됩니다.
      </p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-warmgray-200 bg-white">
        <div className="flex items-center justify-between border-b border-warmgray-200 px-6 py-4">
          <p className="text-lg font-semibold">최종 선택 내역</p>
          <span className="text-sm text-charcoal-soft">선택 {selectedCount}개 항목</span>
        </div>

        {groups.length === 0 ? (
          <div className="p-10 text-center text-charcoal-soft">
            선택한 옵션이 없습니다. '옵션 고르기'에서 먼저 옵션을 선택해 주세요.
          </div>
        ) : (
          groups.map((group, idx) => (
            <div
              key={group.categoryName}
              className={`px-6 py-5 ${idx !== groups.length - 1 ? 'border-b border-warmgray-100' : ''}`}
            >
              <p className="mb-3 font-medium">{group.categoryName}</p>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4">
                    <p className="text-[15px]">{item.name}</p>
                    <p className="shrink-0 tabular font-medium">{formatPrice(item.price)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

        <div className="flex items-center justify-between bg-warmgray-100 px-6 py-5">
          <p className="font-semibold">총 합산 금액</p>
          <p className="tabular text-xl font-semibold text-point">
            {formatPrice(totalPrice)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-point text-[17px] font-medium text-point transition-colors hover:bg-point-soft"
        >
          PDF로 출력
        </button>
        <button
          type="button"
          onClick={() => showToast('제출 내역 공유 링크가 생성되었습니다. (데모)')}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-point text-[17px] font-medium text-white transition-colors hover:bg-point-dark"
        >
          링크로 공유
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-charcoal px-4 py-2 text-sm text-white shadow-lg print:hidden">
          {toast}
        </div>
      )}
    </div>
  )
}

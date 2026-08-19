import { useMemo, useState } from 'react'
import { useSelection } from '../context/SelectionContext'
import { formatPrice } from '../utils/formatPrice'
import CategoryTabs from '../components/options/CategoryTabs'
import OptionListItem from '../components/options/OptionListItem'
import OptionDetail from '../components/options/OptionDetail'

export default function OptionSelectPage() {
  const { categories, allOptions, selections, totalPrice, priceOf, notice } =
    useSelection()

  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id)
  const optionsInCategory = useMemo(
    () => allOptions.filter((opt) => opt.category_id === activeCategoryId),
    [allOptions, activeCategoryId]
  )

  const [activeOptionId, setActiveOptionId] = useState(optionsInCategory[0]?.id)
  const activeOption =
    allOptions.find((opt) => opt.id === activeOptionId) ?? optionsInCategory[0]

  function handleCategoryChange(categoryId) {
    setActiveCategoryId(categoryId)
    const firstOption = allOptions.find((opt) => opt.category_id === categoryId)
    setActiveOptionId(firstOption?.id)
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        {/* 좌: 카테고리 탭 + 옵션 리스트 */}
        <div className="flex max-h-[45vh] w-full shrink-0 flex-col border-b border-warmgray-200 lg:h-full lg:max-h-none lg:w-[380px] lg:border-b-0 lg:border-r">
          <CategoryTabs
            categories={categories}
            activeId={activeCategoryId}
            onChange={handleCategoryChange}
          />
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 lg:px-5">
            {optionsInCategory.map((option) => {
              const selection = selections[option.id]
              const variantId =
                selection?.variantId ??
                (option.is_choice ? option.variants[0].id : null)
              const price = priceOf(option, variantId)

              return (
                <OptionListItem
                  key={option.id}
                  option={option}
                  price={price}
                  isSelected={!!selection?.selected}
                  isActive={option.id === activeOption?.id}
                  onClick={() => setActiveOptionId(option.id)}
                />
              )
            })}
          </div>
        </div>

        {/* 우: 선택한 옵션 상세 */}
        <div className="min-h-0 flex-1">
          {activeOption ? (
            <OptionDetail key={activeOption.id} option={activeOption} />
          ) : (
            <div className="flex h-full items-center justify-center text-charcoal-soft">
              옵션을 선택해 주세요.
            </div>
          )}
        </div>
      </div>

      {/* 하단 고정 합산 금액 */}
      <div className="flex items-center justify-between border-t border-warmgray-200 bg-white px-6 py-4 lg:px-10">
        <span className="text-charcoal-soft">현재 선택된 옵션 총액</span>
        <span className="tabular text-xl font-semibold text-point">
          {formatPrice(totalPrice)}
        </span>
      </div>

      {notice && (
        <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2 rounded-lg bg-charcoal px-4 py-2 text-sm text-white shadow-lg">
          {notice}
        </div>
      )}
    </div>
  )
}

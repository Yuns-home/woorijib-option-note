import { useMemo } from 'react'
import { useSelection } from '../context/SelectionContext'
import BudgetProgress from '../components/summary/BudgetProgress'
import CategorySummaryList from '../components/summary/CategorySummaryList'
import TotalCard from '../components/summary/TotalCard'

const BUDGET = 30000000

export default function SummaryPage() {
  const { categories, optionsById, selections, totalPrice, priceOf, selectedCount } =
    useSelection()

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
              subtext: variant?.detail ?? option.detail,
              price: priceOf(option, sel.variantId),
            }
          })

        return {
          categoryId: category.id,
          categoryName: category.name,
          items,
        }
      })
      .filter((group) => group.items.length > 0)
  }, [categories, optionsById, selections, priceOf])

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-14">
      <p className="text-sm font-medium tracking-wide text-point">
        STEP 4 OF 4 · FINAL REVIEW
      </p>
      <h2 className="mt-2 text-2xl font-semibold lg:text-3xl">선택 옵션 최종 요약</h2>
      <p className="mt-2 text-charcoal-soft">
        가족과 함께 선택한 홈 스타일링 및 기능성 옵션 내역입니다. 확정 전 꼼꼼히 확인해
        주세요.
      </p>

      <div className="mt-8">
        <BudgetProgress budget={BUDGET} used={totalPrice} />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <CategorySummaryList groups={groups} />
        <TotalCard total={totalPrice} itemCount={selectedCount} />
      </div>
    </div>
  )
}

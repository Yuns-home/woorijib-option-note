import { useSelection } from '../../context/SelectionContext'
import { formatPrice } from '../../utils/formatPrice'
import CompareView from '../compare/CompareView'
import VariantSelector from './VariantSelector'
import DependencyNotice from './DependencyNotice'

export default function OptionDetail({ option }) {
  const { categories, optionsById, dependencies, selections, toggleOption, selectVariant, priceOf } =
    useSelection()

  const categoryName = categories.find((c) => c.id === option.category_id)?.name
  const selection = selections[option.id]
  const isSelected = !!selection?.selected
  const activeVariantId =
    selection?.variantId ?? (option.is_choice ? option.variants[0].id : null)
  const price = priceOf(option, activeVariantId)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-warmgray-100 px-3 py-1 text-sm text-charcoal-soft">
            {categoryName} 옵션
          </span>
          {option.star && (
            <span className="rounded-full bg-point-soft px-3 py-1 text-sm font-medium text-point">
              ✓ 우리 가족 기준 추천 옵션
            </span>
          )}
        </div>

        <h2 className="mt-4 text-2xl font-semibold">{option.name}</h2>
        {option.detail && (
          <p className="mt-1 text-charcoal-soft">{option.detail}</p>
        )}
        <p className="mt-3 tabular text-xl font-semibold text-point">
          {formatPrice(price)}
        </p>

        <div className="mt-6">
          <CompareView
            option={option}
            onSelect={() => toggleOption(option.id)}
            isSelected={isSelected}
          />
        </div>

        {(option.before_text || option.after_text) && (
          <div className="mt-6 space-y-2 text-[15px] leading-relaxed text-charcoal-soft">
            {option.before_text && <p>변경 전: {option.before_text}</p>}
            {option.after_text && <p>변경 후: {option.after_text}</p>}
          </div>
        )}

        {option.is_choice && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-charcoal-soft">
              옵션 구성 선택
            </p>
            <VariantSelector
              variants={option.variants}
              selectedVariantId={activeVariantId}
              onSelect={(variantId) => selectVariant(option.id, variantId)}
            />
          </div>
        )}

        <div className="mt-6">
          <DependencyNotice
            optionId={option.id}
            dependencies={dependencies}
            optionsById={optionsById}
          />
        </div>

        {option.cautions?.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-charcoal-soft">주의사항</p>
            <ul className="space-y-1.5 text-sm text-charcoal-soft">
              {option.cautions.map((caution, i) => (
                <li key={i} className="flex gap-2">
                  <span>·</span>
                  <span>{caution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-warmgray-200 px-6 py-4 lg:px-10">
        <button
          type="button"
          onClick={() => toggleOption(option.id)}
          className={`flex h-12 w-full items-center justify-center rounded-xl text-[17px] font-medium transition-colors ${
            isSelected
              ? 'border border-point text-point hover:bg-point-soft'
              : 'bg-point text-white hover:bg-point-dark'
          }`}
        >
          {isSelected ? '선택 취소하기' : '이 옵션 선택'}
        </button>
      </div>
    </div>
  )
}

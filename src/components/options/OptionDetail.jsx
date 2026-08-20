import { useSelection } from '../../context/SelectionContext'
import { useAiConsult } from '../../context/AiConsultContext'
import { formatPrice } from '../../utils/formatPrice'
import CompareView from '../compare/CompareView'
import VariantSelector from './VariantSelector'
import DependencyNotice from './DependencyNotice'
import JudgmentBadge from '../aiConsult/JudgmentBadge'
import ReasonInput from './ReasonInput'
import { getSelectRate, STATS_SAMPLE } from '../../data/optionStats'

export default function OptionDetail({ option }) {
  const { categories, optionsById, dependencies, selections, toggleOption, selectVariant, priceOf } =
    useSelection()
  const { judgments } = useAiConsult()

  const categoryName = categories.find((c) => c.id === option.category_id)?.name
  const selection = selections[option.id]
  const isSelected = !!selection?.selected
  const activeVariantId =
    selection?.variantId ?? (option.is_choice ? option.variants[0].id : null)
  const price = priceOf(option, activeVariantId)
  const judgment = judgments[option.id]
  const selectRate = getSelectRate(option.id)

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto px-6 py-6 lg:px-10 lg:py-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-warmgray-100 px-3 py-1 text-sm text-charcoal-soft">
            {categoryName} 옵션
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-semibold">{option.name}</h2>
        {option.detail && (
          <p className="mt-1 text-charcoal-soft">{option.detail}</p>
        )}
        <p className="mt-3 tabular text-xl font-semibold text-point">
          {formatPrice(price)}
        </p>

        {selectRate != null && (
          <div className="mt-4 rounded-xl bg-warmgray-100 px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal-soft">비슷한 조건 입주자 선택률</span>
              <span className="tabular font-semibold text-point">{selectRate}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-warmgray-200">
              <div
                className="h-full rounded-full bg-point"
                style={{ width: `${selectRate}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-charcoal-soft">
              {STATS_SAMPLE.toLocaleString()}가구 기준 · 참고용 예시 데이터
            </p>
          </div>
        )}

        {judgment && (
          <div className="mt-4">
            <JudgmentBadge judgment={judgment.judgment} reason={judgment.reason} />
          </div>
        )}

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

        {isSelected && <ReasonInput optionId={option.id} />}

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

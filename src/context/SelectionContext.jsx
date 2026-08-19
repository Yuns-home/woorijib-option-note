import { createContext, useContext, useMemo, useState } from 'react'
import elravineData from '../data/elravine_options.json'
import { getExclusivePartners } from '../utils/dependencyRules'

const SelectionContext = createContext(null)

const optionsById = Object.fromEntries(
  elravineData.options.map((opt) => [opt.id, opt])
)

function priceOf(option, variantId) {
  if (option.is_choice && option.variants?.length) {
    const variant =
      option.variants.find((v) => v.id === variantId) || option.variants[0]
    return variant.price
  }
  return option.price
}

export function SelectionProvider({ children }) {
  const [selections, setSelections] = useState({})
  const [notice, setNotice] = useState(null)

  function toggleOption(optionId) {
    setSelections((prev) => {
      const option = optionsById[optionId]
      const isSelected = !!prev[optionId]?.selected
      const next = { ...prev }

      if (isSelected) {
        delete next[optionId]
        setNotice(null)
        return next
      }

      const defaultVariantId = option.is_choice ? option.variants[0].id : null
      next[optionId] = { selected: true, variantId: defaultVariantId }

      const exclusivePartners = getExclusivePartners(
        optionId,
        elravineData.option_dependencies
      )
      const removedPartner = exclusivePartners.find((id) => next[id]?.selected)
      if (removedPartner) {
        delete next[removedPartner]
        setNotice(
          `'${optionsById[removedPartner].name}' 옵션은 함께 선택할 수 없어 자동 해제되었습니다.`
        )
      } else {
        setNotice(null)
      }

      return next
    })
  }

  function selectVariant(optionId, variantId) {
    setSelections((prev) => ({
      ...prev,
      [optionId]: { selected: true, variantId },
    }))
  }

  const totalPrice = useMemo(() => {
    return Object.entries(selections).reduce((sum, [id, sel]) => {
      if (!sel.selected) return sum
      const option = optionsById[id]
      return sum + priceOf(option, sel.variantId)
    }, 0)
  }, [selections])

  const selectedCount = useMemo(
    () => Object.values(selections).filter((s) => s.selected).length,
    [selections]
  )

  const value = {
    optionsById,
    categories: elravineData.categories,
    allOptions: elravineData.options,
    dependencies: elravineData.option_dependencies,
    selections,
    toggleOption,
    selectVariant,
    totalPrice,
    selectedCount,
    notice,
    clearNotice: () => setNotice(null),
    priceOf,
  }

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export function useSelection() {
  const ctx = useContext(SelectionContext)
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider')
  return ctx
}

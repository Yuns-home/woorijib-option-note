import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getExclusivePartners } from '../utils/dependencyRules'

const SelectionContext = createContext(null)

function priceOf(option, variantId) {
  if (option.is_choice && option.variants?.length) {
    const variant =
      option.variants.find((v) => v.id === variantId) || option.variants[0]
    return variant.price
  }
  return option.price
}

export function SelectionProvider({ children }) {
  const [catalog, setCatalog] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [selections, setSelections] = useState({})
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCatalog() {
      const [categoriesRes, optionsRes, dependenciesRes] = await Promise.all([
        supabase.from('option_categories').select('*').order('sort_order'),
        supabase.from('options').select('*'),
        supabase.from('option_dependencies').select('*'),
      ])

      if (categoriesRes.error) throw categoriesRes.error
      if (optionsRes.error) throw optionsRes.error
      if (dependenciesRes.error) throw dependenciesRes.error

      if (!cancelled) {
        setCatalog({
          categories: categoriesRes.data,
          allOptions: optionsRes.data,
          dependencies: dependenciesRes.data,
          optionsById: Object.fromEntries(
            optionsRes.data.map((opt) => [opt.id, opt])
          ),
        })
      }
    }

    loadCatalog().catch((err) => {
      if (!cancelled) setLoadError(err)
    })

    return () => {
      cancelled = true
    }
  }, [])

  function toggleOption(optionId) {
    setSelections((prev) => {
      const option = catalog.optionsById[optionId]
      const isSelected = !!prev[optionId]?.selected
      const next = { ...prev }

      if (isSelected) {
        delete next[optionId]
        setNotice(null)
        return next
      }

      const defaultVariantId = option.is_choice ? option.variants[0].id : null
      next[optionId] = { selected: true, variantId: defaultVariantId }

      const exclusivePartners = getExclusivePartners(optionId, catalog.dependencies)
      const removedPartner = exclusivePartners.find((id) => next[id]?.selected)
      if (removedPartner) {
        delete next[removedPartner]
        setNotice(
          `'${catalog.optionsById[removedPartner].name}' 옵션은 함께 선택할 수 없어 자동 해제되었습니다.`
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
    if (!catalog) return 0
    return Object.entries(selections).reduce((sum, [id, sel]) => {
      if (!sel.selected) return sum
      const option = catalog.optionsById[id]
      return sum + priceOf(option, sel.variantId)
    }, 0)
  }, [catalog, selections])

  const selectedCount = useMemo(
    () => Object.values(selections).filter((s) => s.selected).length,
    [selections]
  )

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warmgray-50 px-6 text-center text-charcoal-soft">
        옵션 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </div>
    )
  }

  if (!catalog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-warmgray-50 text-charcoal-soft">
        불러오는 중...
      </div>
    )
  }

  const value = {
    optionsById: catalog.optionsById,
    categories: catalog.categories,
    allOptions: catalog.allOptions,
    dependencies: catalog.dependencies,
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

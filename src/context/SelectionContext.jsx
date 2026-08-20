import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getExclusivePartners } from '../utils/dependencyRules'
import { useUser } from './UserContext'

const SelectionContext = createContext(null)

function priceOf(option, variantId) {
  if (option.is_choice && option.variants?.length) {
    const variant =
      option.variants.find((v) => v.id === variantId) || option.variants[0]
    return variant.price
  }
  return option.price
}

async function persistSelected(userName, optionId, variantId, reason) {
  try {
    const payload = {
      user_name: userName,
      option_id: optionId,
      selected: true,
      variant_id: variantId,
      status: '개인의견',
    }
    // reason이 명시적으로 전달된 경우에만 덮어씀 (선택 토글 시 기존 이유를 지우지 않도록)
    if (reason !== undefined) payload.reason = reason

    const { error } = await supabase
      .from('selections')
      .upsert(payload, { onConflict: 'user_name,option_id' })
    if (error) throw error
  } catch (err) {
    console.error('[selections] 저장 실패:', err)
  }
}

async function persistDeselected(userName, optionId) {
  try {
    const { error } = await supabase
      .from('selections')
      .delete()
      .eq('user_name', userName)
      .eq('option_id', optionId)
    if (error) throw error
  } catch (err) {
    console.error('[selections] 삭제 실패:', err)
  }
}

export function SelectionProvider({ children }) {
  const { userName } = useUser()
  const [catalog, setCatalog] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [selections, setSelections] = useState({})
  const [notice, setNotice] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadAll() {
      const [categoriesRes, optionsRes, dependenciesRes, selectionsRes] =
        await Promise.all([
          supabase.from('option_categories').select('*').order('sort_order'),
          supabase.from('options').select('*'),
          supabase.from('option_dependencies').select('*'),
          supabase.from('selections').select('*').eq('user_name', userName),
        ])

      if (categoriesRes.error) throw categoriesRes.error
      if (optionsRes.error) throw optionsRes.error
      if (dependenciesRes.error) throw dependenciesRes.error

      if (cancelled) return

      setCatalog({
        categories: categoriesRes.data,
        allOptions: optionsRes.data,
        dependencies: dependenciesRes.data,
        optionsById: Object.fromEntries(
          optionsRes.data.map((opt) => [opt.id, opt])
        ),
      })

      if (selectionsRes.error) {
        console.error('[selections] 불러오기 실패:', selectionsRes.error)
      } else {
        const restored = Object.fromEntries(
          selectionsRes.data
            .filter((row) => row.selected)
            .map((row) => [
              row.option_id,
              { selected: true, variantId: row.variant_id, reason: row.reason ?? '' },
            ])
        )
        setSelections(restored)
      }
    }

    loadAll().catch((err) => {
      if (!cancelled) setLoadError(err)
    })

    return () => {
      cancelled = true
    }
  }, [userName])

  function toggleOption(optionId) {
    setSelections((prev) => {
      const option = catalog.optionsById[optionId]
      const isSelected = !!prev[optionId]?.selected
      const next = { ...prev }

      if (isSelected) {
        delete next[optionId]
        setNotice(null)
        persistDeselected(userName, optionId)
        return next
      }

      const defaultVariantId = option.is_choice ? option.variants[0].id : null
      next[optionId] = { selected: true, variantId: defaultVariantId }
      persistSelected(userName, optionId, defaultVariantId)

      const exclusivePartners = getExclusivePartners(optionId, catalog.dependencies)
      const removedPartner = exclusivePartners.find((id) => next[id]?.selected)
      if (removedPartner) {
        delete next[removedPartner]
        setNotice(
          `'${catalog.optionsById[removedPartner].name}' 옵션은 함께 선택할 수 없어 자동 해제되었습니다.`
        )
        persistDeselected(userName, removedPartner)
      } else {
        setNotice(null)
      }

      return next
    })
  }

  function selectVariant(optionId, variantId) {
    setSelections((prev) => ({
      ...prev,
      [optionId]: { ...prev[optionId], selected: true, variantId },
    }))
    persistSelected(userName, optionId, variantId)
  }

  // 선택 이유 저장 (이미 선택된 옵션에만 의미 있음)
  function saveReason(optionId, reason) {
    setSelections((prev) => {
      const current = prev[optionId]
      if (!current?.selected) return prev
      persistSelected(userName, optionId, current.variantId, reason)
      return { ...prev, [optionId]: { ...current, reason } }
    })
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
    saveReason,
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

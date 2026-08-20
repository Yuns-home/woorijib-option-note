import { useMemo, useState } from 'react'
import dummyData from '../data/dummy_data.json'
import { useSelection } from '../context/SelectionContext'
import ComparisonTable from '../components/family/ComparisonTable'

export default function FamilyOpinionPage() {
  const { optionsById, categories } = useSelection()
  const [toast, setToast] = useState(null)
  // 불일치 항목별 최종 결정: { [optionId]: 채택한 user 이름 }
  const [decisions, setDecisions] = useState({})

  const members = useMemo(
    () => [...new Set(dummyData.family_selections.map((s) => s.user))],
    []
  )

  const groups = useMemo(() => {
    const byOption = new Map()
    dummyData.family_selections.forEach((sel) => {
      if (!byOption.has(sel.option_id)) byOption.set(sel.option_id, [])
      byOption.get(sel.option_id).push(sel)
    })

    return [...byOption.entries()].map(([optionId, sels]) => {
      const option = optionsById[optionId]
      const categoryName =
        categories.find((c) => c.id === option?.category_id)?.name ?? ''

      const entries = sels.map((sel) => ({
        user: sel.user,
        selected: sel.selected,
        reason: sel.reason,
        status: sel.status,
        beforeImage: option?.before_image,
        afterImage: option?.after_image,
      }))

      const isUnanimous = entries.every((e) => e.selected === entries[0].selected)

      return {
        optionId,
        optionName: option?.name ?? optionId,
        categoryName,
        entries,
        isUnanimous,
      }
    })
  }, [optionsById, categories])

  // 불일치 항목을 위로 정렬 (미결정 불일치 → 결정된 불일치 → 일치)
  const sortedGroups = useMemo(() => {
    const rank = (g) => {
      if (!g.isUnanimous && !decisions[g.optionId]) return 0 // 결정 필요
      if (!g.isUnanimous && decisions[g.optionId]) return 1 // 결정 완료
      return 2 // 원래 일치
    }
    return [...groups].sort((a, b) => rank(a) - rank(b))
  }, [groups, decisions])

  const disagreements = groups.filter((g) => !g.isUnanimous)
  const decidedCount = disagreements.filter((g) => decisions[g.optionId]).length
  const allDecided = disagreements.length === 0 || decidedCount === disagreements.length

  function handleDecide(optionId, user) {
    setDecisions((prev) => ({ ...prev, [optionId]: user }))
  }

  function handleFinalize() {
    if (!allDecided) return
    setToast('가족 의견을 반영해 최종 확정되었습니다. (데모)')
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold lg:text-3xl">옵션 선택 현황</h2>
          <p className="mt-2 text-charcoal-soft">
            의견이 다른 항목을 먼저 정하고, 최종 결정을 내려주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={handleFinalize}
          disabled={!allDecided}
          className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-point px-5 text-[15px] font-medium text-white transition-colors hover:bg-point-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          ✓ 최종 확정
        </button>
      </div>

      {/* 불일치 요약 배너 */}
      {disagreements.length > 0 && (
        <div className="mt-6 rounded-xl border border-warmgray-200 bg-warmgray-100 px-5 py-4">
          {allDecided ? (
            <p className="text-[15px] text-charcoal">
              의견이 달랐던 {disagreements.length}개 항목을 모두 정했습니다. 이제 최종 확정할 수 있어요.
            </p>
          ) : (
            <p className="text-[15px] text-charcoal">
              의견이 다른 항목 {disagreements.length}개 중{' '}
              <span className="font-semibold text-point">{decidedCount}개</span> 결정됨.
              남은 항목에서 어느 의견으로 할지 골라주세요.
            </p>
          )}
        </div>
      )}

      <div className="mt-6 space-y-6">
        {sortedGroups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-warmgray-300 bg-warmgray-100 p-10 text-center text-charcoal-soft">
            아직 등록된 가족 의견이 없습니다.
          </div>
        ) : (
          sortedGroups.map((group) => (
            <ComparisonTable
              key={group.optionId}
              optionId={group.optionId}
              optionName={group.optionName}
              categoryName={group.categoryName}
              entries={group.entries}
              isUnanimous={group.isUnanimous}
              members={members}
              decidedUser={decisions[group.optionId]}
              onDecide={handleDecide}
            />
          ))
        )}
      </div>

      {toast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 rounded-lg bg-charcoal px-4 py-2 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  )
}

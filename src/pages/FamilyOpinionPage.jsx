import { useMemo, useState } from 'react'
import dummyData from '../data/dummy_data.json'
import { useSelection } from '../context/SelectionContext'
import MemberTabs from '../components/family/MemberTabs'
import ComparisonTable from '../components/family/ComparisonTable'

export default function FamilyOpinionPage() {
  const { optionsById, categories } = useSelection()
  const [toast, setToast] = useState(null)

  const members = useMemo(
    () => [...new Set(dummyData.family_selections.map((s) => s.user))],
    []
  )
  const [activeMember, setActiveMember] = useState(members[0])

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

  function handleFinalize() {
    setToast('가족 의견을 반영해 최종 확정되었습니다. (데모)')
    setTimeout(() => setToast(null), 2200)
  }

  return (
    <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-10 lg:py-14">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold lg:text-3xl">옵션 선택 현황</h2>
          <p className="mt-2 text-charcoal-soft">
            가족 구성원의 선택을 비교하고 최종 결정을 내려주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={handleFinalize}
          className="flex h-12 shrink-0 items-center gap-2 rounded-xl bg-point px-5 text-[15px] font-medium text-white transition-colors hover:bg-point-dark"
        >
          ✓ 최종 확정
        </button>
      </div>

      <div className="mt-8">
        <MemberTabs
          members={members}
          activeMember={activeMember}
          onChange={setActiveMember}
        />
      </div>

      <div className="mt-6 space-y-6">
        {groups.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-warmgray-300 bg-warmgray-100 p-10 text-center text-charcoal-soft">
            아직 등록된 가족 의견이 없습니다.
          </div>
        ) : (
          groups.map((group) => (
            <ComparisonTable
              key={group.optionId}
              optionName={group.optionName}
              categoryName={group.categoryName}
              entries={group.entries}
              isUnanimous={group.isUnanimous}
              activeMember={activeMember}
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

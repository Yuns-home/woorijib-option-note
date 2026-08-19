import { useMemo } from 'react'
import dummyData from '../data/dummy_data.json'
import { useSelection } from '../context/SelectionContext'
import { getPriorityLevel, PRIORITY_LABEL, PRIORITY_ORDER } from '../utils/priority'
import ItemCard from '../components/moveIn/ItemCard'

export default function MoveInPrepPage() {
  const { optionsById, selections } = useSelection()

  const communityLinkByField = useMemo(() => {
    const map = new Map()
    dummyData.community_links.forEach((link) => map.set(link.field, link))
    return map
  }, [])

  const items = useMemo(() => {
    return dummyData.essential_items
      .filter((item) => {
        if (!item.linked_option) return true
        return !selections[item.linked_option]?.selected
      })
      .map((item) => ({
        ...item,
        priority: getPriorityLevel(item.base_essential),
        linkedOptionName: item.linked_option
          ? optionsById[item.linked_option]?.name
          : null,
      }))
      .sort((a, b) => b.base_essential - a.base_essential)
  }, [optionsById, selections])

  const grouped = PRIORITY_ORDER.map((level) => ({
    level,
    items: items.filter((item) => item.priority === level),
  })).filter((group) => group.items.length > 0)

  let rankCounter = 0

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10 lg:py-14">
      <h2 className="text-2xl font-semibold lg:text-3xl">입주 준비</h2>
      <p className="mt-2 text-charcoal-soft">
        옵션으로 선택하지 않은 항목과 대부분의 가정이 준비하는 생활필수품을 우선순위
        순으로 정리했습니다. 필요한 항목은 공동구매로 함께 준비해 보세요.
      </p>

      <div className="mt-8 space-y-10">
        {grouped.map((group) => (
          <section key={group.level}>
            <h3 className="mb-4 text-lg font-semibold">
              {PRIORITY_LABEL[group.level]}
              <span className="ml-2 text-sm font-normal text-charcoal-soft">
                {group.items.length}개 항목
              </span>
            </h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((item) => {
                rankCounter += 1
                return (
                  <ItemCard
                    key={item.name}
                    item={item}
                    rank={rankCounter}
                    communityLink={communityLinkByField.get(item.community_field)}
                  />
                )
              })}
            </div>
          </section>
        ))}

        {items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-warmgray-300 bg-warmgray-100 p-10 text-center text-charcoal-soft">
            현재 추가로 준비할 항목이 없습니다.
          </div>
        )}
      </div>
    </div>
  )
}

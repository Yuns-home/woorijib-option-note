import { useEffect, useState } from 'react'
import { useSelection } from '../../context/SelectionContext'

// 선택 이유 입력란. 옵션이 선택된 상태에서만 노출된다.
// 타이핑 중에는 로컬 상태만 갱신하고, 포커스가 빠질 때(onBlur) 저장한다.
export default function ReasonInput({ optionId }) {
  const { selections, saveReason } = useSelection()
  const savedReason = selections[optionId]?.reason ?? ''
  const [value, setValue] = useState(savedReason)

  // 다른 옵션으로 넘어가거나 저장된 값이 바뀌면 입력란도 동기화
  useEffect(() => {
    setValue(savedReason)
  }, [optionId, savedReason])

  function handleBlur() {
    if (value !== savedReason) {
      saveReason(optionId, value)
    }
  }

  return (
    <div className="mt-6">
      <label className="mb-2 block text-sm font-medium text-charcoal-soft">
        이 옵션을 고른 이유 (선택)
      </label>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        rows={2}
        placeholder="예: 어머니가 계셔서 겨울 냉기 차단이 중요해요"
        className="w-full resize-none rounded-xl border border-warmgray-200 bg-white px-4 py-3 text-[15px] outline-none transition-colors focus:border-point"
      />
      <p className="mt-1.5 text-xs text-charcoal-soft">
        적어두신 이유는 가족 의견 화면에서 함께 비교할 때 쓰입니다.
      </p>
    </div>
  )
}

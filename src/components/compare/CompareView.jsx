import { useState } from 'react'
import SideBySideCompare from './SideBySideCompare'
import SliderCompare from './SliderCompare'

export default function CompareView({ option, onSelect, isSelected }) {
  const [mode, setMode] = useState('side-by-side')

  if (!option.before_image || !option.after_image) {
    return (
      <div className="rounded-xl border border-dashed border-warmgray-300 bg-warmgray-100 p-8 text-center text-charcoal-soft">
        이 옵션은 별도 비교 이미지가 제공되지 않습니다.
      </div>
    )
  }

  return (
    <div>
      {mode === 'side-by-side' ? (
        <SideBySideCompare
          beforeImage={option.before_image}
          afterImage={option.after_image}
          beforeText={option.before_text}
          afterText={option.after_text}
          onSelect={onSelect}
          isSelected={isSelected}
        />
      ) : (
        <SliderCompare
          beforeImage={option.before_image}
          afterImage={option.after_image}
        />
      )}

      <div className="mt-3 flex justify-center">
        <button
          type="button"
          onClick={() =>
            setMode((m) => (m === 'side-by-side' ? 'slider' : 'side-by-side'))
          }
          className="text-sm font-medium text-point underline underline-offset-4 hover:text-point-dark"
        >
          {mode === 'side-by-side' ? '겹쳐서 비교하기' : '나란히 보기'}
        </button>
      </div>
    </div>
  )
}

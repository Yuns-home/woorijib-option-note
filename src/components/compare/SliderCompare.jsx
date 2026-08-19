import { useCallback, useRef, useState } from 'react'

const STEP = 5

export default function SliderCompare({ beforeImage, afterImage }) {
  const [percent, setPercent] = useState(50)
  const viewportRef = useRef(null)
  const draggingRef = useRef(false)

  const updateFromClientX = useCallback((clientX) => {
    const rect = viewportRef.current?.getBoundingClientRect()
    if (!rect) return
    const ratio = ((clientX - rect.left) / rect.width) * 100
    setPercent(Math.min(100, Math.max(0, ratio)))
  }, [])

  const handlePointerDown = (e) => {
    draggingRef.current = true
    updateFromClientX(e.clientX)
    e.target.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    if (!draggingRef.current) return
    updateFromClientX(e.clientX)
  }

  const handlePointerUp = () => {
    draggingRef.current = false
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    if (!touch) return
    updateFromClientX(touch.clientX)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPercent((p) => Math.max(0, p - STEP))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPercent((p) => Math.min(100, p + STEP))
    }
  }

  return (
    <div>
      <p className="mb-3 text-center text-sm text-charcoal-soft">
        손잡이를 좌우로 끌어보세요
      </p>

      <div
        ref={viewportRef}
        className="relative aspect-4/3 w-full touch-none select-none overflow-hidden rounded-xl"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handlePointerUp}
      >
        <img
          src={beforeImage}
          alt="변경 전"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <img
          src={afterImage}
          alt="변경 후"
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - percent}% 0 0)` }}
        />

        <span className="absolute left-3 top-3 rounded-full bg-charcoal/70 px-2.5 py-1 text-xs font-medium text-white">
          기본형
        </span>
        <span className="absolute right-3 top-3 rounded-full bg-point/85 px-2.5 py-1 text-xs font-medium text-white">
          옵션 적용
        </span>

        <div
          className="absolute top-0 h-full w-0.5 bg-white/90"
          style={{ left: `${percent}%` }}
        />

        <div
          role="slider"
          tabIndex={0}
          aria-label="시공 전/후 비교 슬라이더"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          onPointerDown={handlePointerDown}
          onKeyDown={handleKeyDown}
          className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-point bg-white text-point shadow-md focus:outline-none focus:ring-2 focus:ring-point"
          style={{ left: `${percent}%` }}
        >
          <span className="text-xs">◀▶</span>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-xs text-charcoal-soft">
        <span>변경 전</span>
        <span>변경 후</span>
      </div>
    </div>
  )
}

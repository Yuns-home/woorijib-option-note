import { useState } from 'react'
import { useUser } from '../context/UserContext'

// 참가자 이름이 없으면 앱 진입 전 이 화면을 먼저 보여줌.
// 이름을 입력해야 자기만의 선택·상담 데이터가 분리되어 저장됨.
export default function NameGate() {
  const { setUserName } = useUser()
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleStart() {
    const trimmed = value.trim()
    if (!trimmed) {
      setError('이름 또는 참가자 번호를 입력해 주세요.')
      return
    }
    setUserName(trimmed)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleStart()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-warmgray-50 px-6">
      <div className="w-full max-w-md">
        <div className="mb-2 text-sm text-charcoal-soft">우리집 옵션노트</div>
        <h1 className="text-2xl font-semibold leading-snug lg:text-3xl">
          시작하기 전에
          <br />
          성함을 알려주세요.
        </h1>
        <p className="mt-3 text-charcoal-soft">
          입력하신 이름으로 선택 내용이 저장됩니다. 나중에 이어서 볼 때도 같은 이름을
          쓰시면 됩니다.
        </p>

        <div className="mt-8">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError('')
            }}
            onKeyDown={handleKeyDown}
            placeholder="예: 김순자"
            className="h-14 w-full rounded-xl border border-warmgray-300 bg-white px-5 text-[17px] outline-none transition-colors focus:border-point"
            autoFocus
          />
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <button
          type="button"
          onClick={handleStart}
          className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-point text-[17px] font-medium text-white transition-colors hover:bg-point-dark"
        >
          시작하기
        </button>
      </div>
    </div>
  )
}

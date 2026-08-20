import { createContext, useContext, useState } from 'react'

const UserContext = createContext(null)

const STORAGE_KEY = 'woorijib_user_name'

// 참가자 이름을 앱 전역에서 공유. 브라우저(localStorage)에 저장해
// 새로고침해도 유지되고, 각자 본인 기기에서 자기 데이터만 보게 됨.
export function UserProvider({ children }) {
  const [userName, setUserNameState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || ''
    } catch {
      return ''
    }
  })

  function setUserName(name) {
    const trimmed = name.trim()
    setUserNameState(trimmed)
    try {
      if (trimmed) localStorage.setItem(STORAGE_KEY, trimmed)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // localStorage 사용 불가 환경에서도 앱은 계속 동작 (이름은 세션 동안만 유지)
    }
  }

  function clearUser() {
    setUserName('')
  }

  return (
    <UserContext.Provider value={{ userName, setUserName, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}

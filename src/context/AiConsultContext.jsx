import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchAiJudgments, requestAiConsult } from '../lib/aiConsult'

const AiConsultContext = createContext(null)

export function AiConsultProvider({ children }) {
  const [judgments, setJudgments] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAiJudgments()
      .then(setJudgments)
      .catch((err) => console.error('[ai_judgments] 불러오기 실패:', err))
  }, [])

  const runConsult = useCallback(async (answers) => {
    setLoading(true)
    setError(null)
    try {
      const results = await requestAiConsult(answers)
      setJudgments(results)
      return results
    } catch (err) {
      console.error('[ai-consult] 상담 요청 실패:', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const value = { judgments, loading, error, runConsult }

  return <AiConsultContext.Provider value={value}>{children}</AiConsultContext.Provider>
}

export function useAiConsult() {
  const ctx = useContext(AiConsultContext)
  if (!ctx) throw new Error('useAiConsult must be used within AiConsultProvider')
  return ctx
}

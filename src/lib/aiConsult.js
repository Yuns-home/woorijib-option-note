import { supabase } from './supabase'

// TODO: 로그인 기능이 생기면 selections와 동일하게 실제 사용자 식별자로 교체
const GUEST_USER = 'guest'

// 프로필 답변을 Edge Function으로 보내 AI 상담을 실행하고, 결과(옵션별 판단)를 받아온다.
// 이 함수는 Claude API 키를 전혀 다루지 않는다 — 키는 Edge Function의 env secret에만 존재.
export async function requestAiConsult(answers) {
  const { data, error } = await supabase.functions.invoke('ai-consult', {
    body: { answers, userName: GUEST_USER },
  })

  if (error) throw error
  if (data?.error) throw new Error(data.error)

  return data?.results ?? {}
}

// 이전에 저장된 AI 상담 결과를 다시 불러온다 (재방문 시 재호출 없이 배지 표시용).
export async function fetchAiJudgments() {
  const { data, error } = await supabase
    .from('ai_judgments')
    .select('option_id, judgment, reason, source')
    .eq('user_name', GUEST_USER)

  if (error) throw error

  return Object.fromEntries(data.map((row) => [row.option_id, row]))
}

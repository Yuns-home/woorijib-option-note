// supabase/functions/ai-consult/index.ts
//
// 프로필 답변 → 옵션별 판단(추천/불필요/선택사항 + 이유) 반환.
// 1) 0단계 문서의 판단 규칙(rules.ts)으로 먼저 매칭
// 2) 규칙에 없는 옵션만 Claude API로 실시간 생성 (배치 1회 호출)
// 3) 결과는 ai_judgments 테이블에 저장 (다음 방문 시 재호출 없이 조회 가능)
//
// ⚠️ ANTHROPIC_API_KEY는 절대 코드에 넣지 않음. Supabase 대시보드
//    (Project Settings → Edge Functions → Secrets)에서 등록한 env secret만 사용.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from './cors.ts'
import { matchRule, type Answers, type Judgment } from './rules.ts'

const VALID_JUDGMENTS = new Set<Judgment>(['추천', '불필요', '선택사항'])

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'POST 요청만 지원합니다.' }, 405)
  }

  try {
    const body = await req.json()
    const answers: Answers | undefined = body?.answers
    const userName: string = body?.userName || 'guest'

    if (!answers || typeof answers !== 'object') {
      return jsonResponse({ error: 'answers가 필요합니다.' }, 400)
    }

    // SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY는 Edge Function에 자동 주입되는
    // 기본 시크릿으로, 별도 등록 없이 사용 가능합니다.
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // 1. 옵션 목록 조회 (판단 대상)
    const { data: options, error: optionsError } = await supabase
      .from('options')
      .select('id, name, detail, price')

    if (optionsError) throw optionsError

    // 2. 프로필 응답 저장 (재상담 시 갱신)
    const { error: profileError } = await supabase
      .from('user_profiles')
      .upsert(
        { user_name: userName, answers, updated_at: new Date().toISOString() },
        { onConflict: 'user_name' }
      )
    if (profileError) console.error('[user_profiles] 저장 실패:', profileError)

    // 3. 규칙 우선 매칭
    const results: Record<string, { judgment: Judgment; reason: string; source: string }> = {}
    const unresolved: { id: string; name: string; detail: string | null; price: number }[] = []

    for (const option of options ?? []) {
      const ruleResult = matchRule(option.id, answers)
      if (ruleResult) {
        results[option.id] = { ...ruleResult, source: 'rule' }
      } else {
        unresolved.push(option)
      }
    }

    // 4. 규칙에 없는 조합만 Claude API로 실시간 생성 (배치 1회)
    if (unresolved.length > 0) {
      const apiKey = Deno.env.get('ANTHROPIC_API_KEY')

      if (!apiKey) {
        console.error('[ai-consult] ANTHROPIC_API_KEY 시크릿이 설정되지 않았습니다.')
        for (const option of unresolved) {
          results[option.id] = {
            judgment: '선택사항',
            reason: 'AI 상담을 일시적으로 사용할 수 없어 기본값으로 표시됩니다.',
            source: 'fallback',
          }
        }
      } else {
        try {
          const aiResults = await consultClaude(unresolved, answers, apiKey)
          for (const option of unresolved) {
            results[option.id] = aiResults[option.id]
              ? { ...aiResults[option.id], source: 'ai' }
              : {
                  judgment: '선택사항',
                  reason: '옵션 특성과 우리 가족 프로필을 함께 고려해 결정해 보세요.',
                  source: 'fallback',
                }
          }
        } catch (err) {
          console.error('[ai-consult] Claude API 호출 실패:', err)
          for (const option of unresolved) {
            results[option.id] = {
              judgment: '선택사항',
              reason: 'AI 상담 응답을 받지 못해 기본값으로 표시됩니다. 잠시 후 다시 시도해 주세요.',
              source: 'fallback',
            }
          }
        }
      }
    }

    // 5. 결과 저장 (option_id, user_name 유니크 upsert)
    const rows = Object.entries(results).map(([option_id, r]) => ({
      user_name: userName,
      option_id,
      judgment: r.judgment,
      reason: r.reason,
      source: r.source,
    }))

    if (rows.length > 0) {
      const { error: upsertError } = await supabase
        .from('ai_judgments')
        .upsert(rows, { onConflict: 'user_name,option_id' })
      if (upsertError) console.error('[ai_judgments] 저장 실패:', upsertError)
    }

    return jsonResponse({ results })
  } catch (err) {
    console.error('[ai-consult] 처리 실패:', err)
    return jsonResponse({ error: err instanceof Error ? err.message : String(err) }, 500)
  }
})

function jsonResponse(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

async function consultClaude(
  options: { id: string; name: string; detail: string | null; price: number }[],
  answers: Answers,
  apiKey: string
): Promise<Record<string, { judgment: Judgment; reason: string }>> {
  // 필요 시 Supabase 시크릿에 ANTHROPIC_MODEL을 등록해 모델을 바꿀 수 있음 (기본값: claude-sonnet-5)
  const model = Deno.env.get('ANTHROPIC_MODEL') || 'claude-sonnet-5'

  const systemPrompt = `당신은 아파트 유상옵션 상담사입니다. 분양 영업 관점이 아니라 입주 예정 가족의 편에서 중립적으로 조언합니다.
불필요하다고 판단되면 솔직하게 "불필요"라고 답하세요. 판매를 유도하지 마세요.
아래 가족 프로필을 참고해 각 옵션을 "추천" / "불필요" / "선택사항" 중 하나로 판단하고, 1~2문장의 이유를 한국어 존댓말로 작성하세요.
반드시 아래 JSON 형식으로만 응답하고, 코드블록 표시나 다른 설명은 포함하지 마세요.
{"옵션id": {"judgment": "추천|불필요|선택사항", "reason": "이유"}, "옵션id2": {...}}`

  const userPrompt = `[가족 프로필]\n${describeAnswers(answers)}\n\n[판단할 옵션 목록]\n${options
    .map((o) => `- id: ${o.id} | 이름: ${o.name} | 가격: ${o.price ?? 0}원 | 설명: ${o.detail ?? '없음'}`)
    .join('\n')}`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userPrompt }],
    }),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Claude API 오류 (${res.status}): ${text}`)
  }

  const data = await res.json()
  const textBlock = (data.content ?? []).find((b: { type: string }) => b.type === 'text')
  if (!textBlock) throw new Error('Claude 응답에 텍스트 블록이 없습니다.')

  const cleaned = (textBlock.text as string).replace(/```json|```/g, '').trim()

  let parsed: Record<string, { judgment?: string; reason?: string }>
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    console.error('[ai-consult] JSON 파싱 실패:', cleaned)
    return {}
  }

  const out: Record<string, { judgment: Judgment; reason: string }> = {}
  for (const [id, val] of Object.entries(parsed)) {
    if (val && typeof val.judgment === 'string' && VALID_JUDGMENTS.has(val.judgment as Judgment)) {
      out[id] = {
        judgment: val.judgment as Judgment,
        reason: String(val.reason ?? '').slice(0, 300),
      }
    }
  }
  return out
}

function describeAnswers(a: Answers): string {
  const lines = [
    `- 65세 이상 어르신 동거: ${a.q_elder ? '예' : '아니오'}`,
    `- 어린 자녀(미취학~초등): ${a.q_child ? '예' : '아니오'}`,
    `- 요리 빈도: ${a.q_cook ?? '미응답'}`,
    `- 손님 초대: ${a.q_guest ? '잦음' : '드묾'}`,
    `- 수납 부족 체감: ${a.q_storage ? '예' : '아니오'}`,
    `- 침실3 독립방 필요 여부: ${a.q_room3 ? '독립방 필요' : '유연하게 사용 가능'}`,
    `- 설거지 부담 경감 희망: ${a.q_dish ? '예' : '아니오'}`,
    `- 예산 여유: ${a.q_budget ?? '미응답'}`,
    `- 인테리어 디자인 중시: ${a.q_design ? '예' : '아니오'}`,
  ]
  if (a.q_room_user) {
    const rooms = Object.entries(a.q_room_user)
      .map(([room, user]) => `${room}=${user}`)
      .join(', ')
    lines.push(`- 공간별 주 사용자: ${rooms}`)
  }
  return lines.join('\n')
}

// 0단계_AI상담_프로필질문과판단규칙.md의 B. 판단 규칙(정밀 설계 7개 옵션)을 그대로 포팅.
// 규칙에 해당하는 조건이 없으면 null을 반환 → index.ts에서 Claude API로 폴백.

export type Judgment = '추천' | '불필요' | '선택사항'

export interface RuleResult {
  judgment: Judgment
  reason: string
}

export interface Answers {
  q_elder?: boolean
  q_child?: boolean
  q_cook?: '자주' | '가끔' | '거의 안 함'
  q_guest?: boolean
  q_storage?: boolean
  // true = 독립방 필요(예), false = 유연하게 사용 가능(아니오)
  q_room3?: boolean
  q_dish?: boolean
  q_budget?: '넉넉함' | '보통' | '빠듯함'
  q_design?: boolean
  q_room_user?: Record<string, string>
}

type RuleFn = (a: Answers) => RuleResult | null

// 옵션 id는 supabase_setup.sql의 options.id 값과 동일해야 함 (door, kitchen, multi, next, dish, light, floor)
const RULES: Record<string, RuleFn> = {
  // 1) 현관자동중문
  door: (a) => {
    if (a.q_elder === true) {
      return {
        judgment: '추천',
        reason:
          '어르신이 계시면 현관 냉기 차단으로 겨울철 온도 유지에 유리하고, 공간 분리로 안전합니다.',
      }
    }
    if (a.q_elder === false && a.q_budget === '빠듯함') {
      return {
        judgment: '선택사항',
        reason: '냉난방·프라이버시 이점은 있으나 필수는 아닙니다.',
      }
    }
    return null
  },

  // 2) 대면형주방
  kitchen: (a) => {
    if (a.q_child === true) {
      return {
        judgment: '추천',
        reason: '요리하면서 거실의 아이를 지켜볼 수 있어 어린 자녀 가정에 유용합니다.',
      }
    }
    if (a.q_guest === true) {
      return {
        judgment: '추천',
        reason: '손님과 대화하며 조리할 수 있어 접대가 잦은 집에 잘 맞습니다.',
      }
    }
    if (a.q_cook === '거의 안 함' && a.q_child === false && a.q_guest === false) {
      return {
        judgment: '불필요',
        reason: '개방감 외 실사용 이점이 적고, 조리 냄새가 거실로 퍼지는 단점이 있습니다.',
      }
    }
    if (a.q_cook === '자주') {
      return { judgment: '선택사항', reason: '개방감은 좋으나 냄새 확산을 감안하세요.' }
    }
    return null
  },

  // 3) 멀티룸
  multi: (a) => {
    if (a.q_room3 === false) {
      return {
        judgment: '추천',
        reason:
          '평소 거실과 트고, 필요 시 방으로 닫아 쓸 수 있어 공간 활용이 유연합니다.',
      }
    }
    if (a.q_room3 === true) {
      return {
        judgment: '불필요',
        reason: '독립된 방이 꼭 필요하면 벽 대비 차음이 약한 슬라이딩도어는 맞지 않습니다.',
      }
    }
    return null
  },

  // 4) 넥스트퍼니처
  next: (a) => {
    if (a.q_storage === true) {
      return { judgment: '추천', reason: '붙박이 수납가구로 침실 수납이 크게 늘어납니다.' }
    }
    if (a.q_storage === false) {
      return {
        judgment: '선택사항',
        reason: '수납이 충분하다면 가구 재배치가 어려워지는 점을 감안하세요.',
      }
    }
    return null
  },

  // 5) 식기세척기
  dish: (a) => {
    if (a.q_dish === true) {
      return { judgment: '추천', reason: '14인용 대용량으로 설거지 부담을 크게 줄입니다.' }
    }
    if (a.q_cook === '거의 안 함' && a.q_dish === false) {
      return { judgment: '불필요', reason: '사용 빈도가 낮으면 기본형으로 충분합니다.' }
    }
    return null
  },

  // 6) 감성조명 다운라이트
  light: (a) => {
    if (a.q_elder === true) {
      return {
        judgment: '추천',
        reason: '색온도·조도 조절로 어르신 시력 부담을 줄일 수 있습니다.',
      }
    }
    if (a.q_design === true) {
      return { judgment: '추천', reason: '침실 분위기를 섬세하게 조절할 수 있습니다.' }
    }
    return null
  },

  // 7) 외산 원목마루
  floor: (a) => {
    if (a.q_budget === '빠듯함') {
      return {
        judgment: '불필요',
        reason: '금액이 가장 큰 항목이며, 무상 넥스트마루로도 충분합니다.',
      }
    }
    if (a.q_child === true || a.q_elder === true) {
      return {
        judgment: '선택사항',
        reason:
          '질감은 좋지만 스크래치·습기 관리가 필요해 아이·어르신 가정엔 관리 부담이 있습니다.',
      }
    }
    if (a.q_budget === '넉넉함' && a.q_design === true) {
      return { judgment: '선택사항', reason: '질감·디자인을 중시하면 고려할 만합니다.' }
    }
    return null
  },
}

export function matchRule(optionId: string, answers: Answers): RuleResult | null {
  const fn = RULES[optionId]
  if (!fn) return null
  return fn(answers)
}

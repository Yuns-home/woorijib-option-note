export const ROOM_LIST = ['안방', '침실1', '침실2', '침실3']
export const ROOM_USER_TYPES = ['부부', '자녀', '어르신', '손님', '공용']

export const AI_CONSULT_QUESTIONS = [
  {
    id: 'q_elder',
    question: '함께 사는 어르신(65세 이상)이 계신가요?',
    type: 'yesno',
  },
  {
    id: 'q_child',
    question: '어린 자녀(미취학~초등)가 있나요?',
    type: 'yesno',
  },
  {
    id: 'q_cook',
    question: '요리를 자주 하시나요?',
    type: 'three',
    options: ['자주', '가끔', '거의 안 함'],
  },
  {
    id: 'q_guest',
    question: '손님 초대가 잦은 편인가요?',
    type: 'yesno',
  },
  {
    id: 'q_storage',
    question: '수납공간이 늘 부족하다고 느끼시나요?',
    type: 'yesno',
  },
  {
    id: 'q_room3',
    question: '침실3을 독립된 방으로 꼭 써야 하나요?',
    type: 'yesno',
    yesLabel: '예 (독립방 필요)',
    noLabel: '아니오 (유연하게)',
  },
  {
    id: 'q_dish',
    question: '설거지 부담을 줄이고 싶으신가요?',
    type: 'yesno',
  },
  {
    id: 'q_budget',
    question: '예산 여유가 어느 정도인가요?',
    type: 'three',
    options: ['넉넉함', '보통', '빠듯함'],
  },
  {
    id: 'q_design',
    question: '인테리어 디자인·분위기를 중요하게 보시나요?',
    type: 'yesno',
  },
  {
    id: 'q_room_user',
    question: '각 공간의 주 사용자는 누구인가요?',
    type: 'roomUser',
  },
]

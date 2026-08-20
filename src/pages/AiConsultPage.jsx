import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AI_CONSULT_QUESTIONS, ROOM_LIST } from '../data/aiConsultQuestions'
import ProgressHeader from '../components/aiConsult/ProgressHeader'
import QuestionCard from '../components/aiConsult/QuestionCard'
import ResultsList from '../components/aiConsult/ResultsList'
import { useAiConsult } from '../context/AiConsultContext'
import { useSelection } from '../context/SelectionContext'

function isAnswered(question, answer) {
  if (question.type === 'roomUser') {
    return !!answer && ROOM_LIST.every((room) => !!answer[room])
  }
  return answer !== undefined
}

export default function AiConsultPage() {
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState(false)

  const { judgments, loading, error, runConsult } = useAiConsult()
  const { optionsById } = useSelection()

  const total = AI_CONSULT_QUESTIONS.length
  const currentQuestion = AI_CONSULT_QUESTIONS[currentIndex]
  const currentAnswer = answers[currentQuestion?.id]
  const canProceed = currentQuestion ? isAnswered(currentQuestion, currentAnswer) : false

  // 질문에 모두 답하고 완료 화면으로 넘어가면, 그 시점의 답변으로 AI 상담을 실행한다.
  useEffect(() => {
    if (completed) {
      runConsult(answers).catch(() => {
        // 에러는 context의 error 상태로 노출되어 화면에 표시됨
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completed])

  function handleAnswer(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
  }

  function handleNext() {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1)
    } else {
      setCompleted(true)
    }
  }

  function handleBack() {
    setCurrentIndex((i) => Math.max(0, i - 1))
  }

  function handleRetake() {
    setCompleted(false)
    setCurrentIndex(0)
  }

  if (completed) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:py-24">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-point-soft text-point">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12l5 5L20 7"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-semibold">프로필 저장 완료</h2>
        <p className="mt-2 text-charcoal-soft">
          질문 {total}개에 모두 답해 주셨습니다. 우리 가족에게 맞는 옵션을 안내해 드릴게요.
        </p>

        {loading && (
          <div className="mt-8 rounded-xl border border-dashed border-warmgray-300 bg-warmgray-100 p-6 text-sm text-charcoal-soft">
            AI가 우리 가족 프로필을 바탕으로 옵션을 살펴보는 중입니다...
          </div>
        )}

        {!loading && error && (
          <div className="mt-8 rounded-xl border border-dashed border-warmgray-300 bg-warmgray-100 p-6 text-sm text-charcoal-soft">
            상담 결과를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
          </div>
        )}

        {!loading && !error && Object.keys(judgments).length > 0 && (
          <ResultsList judgments={judgments} optionsById={optionsById} />
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={handleRetake}
            className="flex h-12 items-center justify-center rounded-xl border border-point px-6 text-[15px] font-medium text-point transition-colors hover:bg-point-soft"
          >
            답변 다시 하기
          </button>
          <Link
            to="/options"
            className="flex h-12 items-center justify-center rounded-xl bg-point px-6 text-[15px] font-medium text-white transition-colors hover:bg-point-dark"
          >
            옵션 고르기로 이동
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10 lg:px-10 lg:py-16">
      <h2 className="text-2xl font-semibold lg:text-3xl">AI 옵션 상담</h2>
      <p className="mt-2 text-charcoal-soft">
        몇 가지 질문에 답해 주시면, 우리 가족에게 맞는 옵션을 추천해 드려요.
      </p>

      <div className="mt-8">
        <ProgressHeader current={currentIndex + 1} total={total} />
      </div>

      <div className="mt-6">
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          answer={currentAnswer}
          onAnswer={handleAnswer}
        />
      </div>

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentIndex === 0}
          className="flex h-12 flex-1 items-center justify-center rounded-xl border border-warmgray-200 text-[15px] font-medium text-charcoal-soft transition-colors hover:bg-warmgray-100 disabled:opacity-40"
        >
          이전
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed}
          className="flex h-12 flex-[2] items-center justify-center rounded-xl bg-point text-[15px] font-medium text-white transition-colors hover:bg-point-dark disabled:opacity-40"
        >
          {currentIndex === total - 1 ? '완료' : '다음'}
        </button>
      </div>
    </div>
  )
}

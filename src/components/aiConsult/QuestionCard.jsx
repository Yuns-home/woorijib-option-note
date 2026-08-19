import ChoiceButton from './ChoiceButton'
import { ROOM_LIST, ROOM_USER_TYPES } from '../../data/aiConsultQuestions'

export default function QuestionCard({ question, answer, onAnswer }) {
  return (
    <div className="rounded-2xl border border-warmgray-200 bg-white p-8 lg:p-10">
      <h2 className="text-xl font-semibold leading-snug lg:text-2xl">
        {question.question}
      </h2>

      <div className="mt-8">
        {question.type === 'yesno' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <ChoiceButton
              label={question.yesLabel ?? '예'}
              isActive={answer === true}
              onClick={() => onAnswer(true)}
            />
            <ChoiceButton
              label={question.noLabel ?? '아니오'}
              isActive={answer === false}
              onClick={() => onAnswer(false)}
            />
          </div>
        )}

        {question.type === 'three' && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {question.options.map((option) => (
              <ChoiceButton
                key={option}
                label={option}
                isActive={answer === option}
                onClick={() => onAnswer(option)}
              />
            ))}
          </div>
        )}

        {question.type === 'roomUser' && (
          <div className="space-y-5">
            {ROOM_LIST.map((room) => (
              <div key={room}>
                <p className="mb-2 text-sm font-medium text-charcoal-soft">{room}</p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                  {ROOM_USER_TYPES.map((type) => {
                    const isActive = answer?.[room] === type
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => onAnswer({ ...answer, [room]: type })}
                        className={`flex h-11 items-center justify-center rounded-lg border text-sm font-medium transition-colors ${
                          isActive
                            ? 'border-point bg-point text-white'
                            : 'border-warmgray-200 bg-white text-charcoal hover:border-warmgray-300'
                        }`}
                      >
                        {type}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

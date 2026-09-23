import { useEffect, useRef } from 'react'

export default function QuizQuestion({
  question,
  options,
  onAnswer,
  selectedAnswer,
  correctAnswer,
  explanation,
  showExplanation,
  answered,
}) {
  const answerRefs = useRef([])

  useEffect(() => {
    if (answered && answerRefs.current[correctAnswer]) {
      answerRefs.current[correctAnswer].focus()
    }
  }, [answered, correctAnswer])

  return (
    <div className="quiz-question">
      <p className="quiz-question-text">{question}</p>
      <div className="quiz-options" role="radiogroup" aria-label="Pilihan Jawaban">
        {options.map((option, i) => {
          const isSelected = selectedAnswer === i
          const isCorrect = i === correctAnswer
          const isWrong = isSelected && !isCorrect && answered
          const buttonClass = `quiz-option ${isWrong ? 'is-wrong' : ''} ${isCorrect && answered ? 'is-correct' : ''}`

          return (
            <button
              key={i}
              ref={el => answerRefs.current[i] = el}
              className={buttonClass}
              onClick={() => onAnswer(i)}
              disabled={answered}
              aria-checked={isSelected}
              role="radio"
              tabIndex={answered && isCorrect ? 0 : -1}
            >
              <span className="choice-mark" aria-hidden="true" />
              {option}
            </button>
          )
        })}
      </div>
      {showExplanation && explanation && (
        <div className="quiz-explanation">
          <p><strong>Penjelasan:</strong> {explanation}</p>
        </div>
      )}
    </div>
  )
}

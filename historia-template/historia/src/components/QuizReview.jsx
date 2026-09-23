import { getQuiz } from '../data/quizzes'

export default function QuizReview({ episodeId, onClose }) {
  const quiz = getQuiz(episodeId)

  if (!quiz) return null

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-panel quiz-review" onClick={(e) => e.stopPropagation()}>
        <div className="quiz-header">
          <div className="quiz-title-block">
            <span className="quiz-kicker">Historia · Arsip Jawaban</span>
            <h2 className="quiz-title">Review Jawaban</h2>
          </div>
          <button className="btn btn-quiet btn-small" onClick={onClose}>
            Tutup
          </button>
        </div>

        <div className="quiz-review-list">
          {quiz.questions.map((q, i) => (
            <div key={i} className="quiz-review-item">
              <p className="quiz-review-q">
                <span className="quiz-review-num">{i + 1}</span>
                <span className="quiz-review-q-text">{q.question}</span>
              </p>
              <div className="quiz-review-answers">
                {q.options.map((opt, j) => {
                  let cls = 'quiz-review-opt'
                  if (j === q.answer) cls += ' is-correct'
                  return (
                    <div key={j} className={cls}>
                      <span className="quiz-mark">{String.fromCharCode(65 + j)}</span>
                      <span className="quiz-option-body">{opt}</span>
                    </div>
                  )
                })}
              </div>
              <p className="quiz-review-exp">
                <strong>Penjelasan</strong>
                {q.explanation}
              </p>
            </div>
          ))}
        </div>

        <div className="quiz-actions">
          <button className="btn btn-quiet" onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}

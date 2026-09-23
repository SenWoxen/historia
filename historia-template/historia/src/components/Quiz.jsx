import { useState, useCallback } from 'react'
import { getQuiz } from '../data/quizzes'
import PatiAI from './PatiAI'

export default function Quiz({ episodeId, onClose, onReview }) {
  const quiz = getQuiz(episodeId)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [correct, setCorrect] = useState(false)
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(0)

  if (!quiz) return null

  const question = quiz.questions[index]
  const total = quiz.questions.length
  const done = selected !== null

  const pick = useCallback(
    (i) => {
      if (done) return
      setSelected(i)
      const ok = i === question.answer
      setCorrect(ok)
      if (ok) setScore((s) => s + 1)
    },
    [done, question]
  )

  const next = useCallback(() => {
    if (!done) return
    if (index + 1 < total) {
      setIndex((i) => i + 1)
      setSelected(null)
      setCorrect(false)
    } else {
      setFinished(true)
    }
  }, [done, index, total])

  const getMessage = () => {
    const pct = score / total
    if (pct === 1) return 'Ingatanmu terhadap episode ini sangat kuat.'
    if (pct >= 0.6) return 'Sebagian besar materi sudah kamu kuasai.'
    if (pct > 0) return 'Beberapa bagian masih bisa kamu pelajari kembali.'
    return 'Coba kembali ke materi episode ini dan ulangi quiz.'
  }

  if (finished) {
    return (
      <div className="quiz-overlay" onClick={onClose}>
        <div className="quiz-panel quiz-result-panel" onClick={(e) => e.stopPropagation()}>
          <PatiAI speaking={true} />
          <p className="quiz-result-eyebrow">Historia · Uji Ingatan</p>
          <p className="quiz-result-score">
            {score} <span className="quiz-result-total">/ {total}</span>
          </p>
          <p className="quiz-message">{getMessage()}</p>
          <div className="quiz-actions">
            <button className="btn btn-lead" onClick={onReview}>
              Review Jawaban
            </button>
            <button className="btn btn-quiet" onClick={onClose}>
              Kembali ke Cerita
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="quiz-overlay" onClick={onClose}>
      <div className="quiz-panel" onClick={(e) => e.stopPropagation()}>
        <div className="quiz-header">
          <div className="quiz-title-block">
            <span className="quiz-kicker">Uji Ingatanmu</span>
            <h2 className="quiz-title">{quiz.title}</h2>
          </div>
          <span className="quiz-progress">
            {index + 1} / {total}
          </span>
        </div>

        <div className="quiz-question" key={index}>
          <p className="quiz-question-text">{question.question}</p>
        </div>

        <div className="quiz-options">
          {question.options.map((opt, i) => {
            let cls = 'quiz-option'
            if (done) {
              cls += i === question.answer ? ' is-correct' : ' is-wrong'
              if (i === selected && i !== question.answer) cls += ' is-selected'
            }
            return (
              <button
                key={i}
                className={cls}
                style={{ '--i': i }}
                onClick={() => pick(i)}
                disabled={done}
              >
                <span className="quiz-mark">{String.fromCharCode(65 + i)}</span>
                <span className="quiz-option-body">{opt}</span>
              </button>
            )
          })}
        </div>

        {done && (
          <div className={`quiz-explanation ${correct ? 'is-correct' : 'is-wrong'}`}>
            <p>
              <strong>{correct ? 'Benar' : 'Salah'}</strong>
              {question.explanation}
            </p>
            <button className="btn btn-lead" onClick={next}>
              {index + 1 < total ? 'Soal Berikutnya' : 'Lihat Hasil'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

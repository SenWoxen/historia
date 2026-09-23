import PatiAI from './PatiAI'

export default function QuizResult({
  score,
  totalQuestions,
  onReview,
  onClose,
}) {
  let feedbackText = ''
  if (score === totalQuestions) {
    feedbackText = 'Ingatanmu terhadap episode ini sangat kuat.'
  } else if (score >= totalQuestions / 2) {
    feedbackText = 'Sebagian besar materi sudah kamu kuasai.'
  } else if (score > 0) {
    feedbackText = 'Beberapa bagian masih bisa kamu pelajari kembali.'
  } else {
    feedbackText = 'Coba pelajari kembali materi episode ini.'
  }

  return (
    <div className="quiz-result">
      <PatiAI speaking={true} />
      <div className="quiz-result-content">
        <p className="quiz-result-title">QUIZ SELESAI</p>
        <p className="quiz-result-score">Score: {score} / {totalQuestions}</p>
        <p className="quiz-result-feedback">{feedbackText}</p>
        <div className="quiz-result-actions">
          <button className="btn btn-lead" onClick={onReview}>Review Jawaban</button>
          <button className="btn btn-quiet" onClick={onClose}>Kembali ke Historia</button>
        </div>
      </div>
    </div>
  )
}

export default function DialogueBox({ speaker, text, done, narration, showContinue = true }) {
  return (
    <div className={`dialogue ${narration ? 'is-narration' : ''}`}>
      {speaker?.name && (
        <div className="dialogue-name" style={{ '--plate': speaker.color }}>
          {speaker.name}
        </div>
      )}

      <p className="dialogue-text">
        {text}
        <span className="caret" data-hidden={done} />
      </p>

      {showContinue && (
        <span className="dialogue-next" data-ready={done}>
          {done ? 'click to continue' : ''}
        </span>
      )}
    </div>
  )
}

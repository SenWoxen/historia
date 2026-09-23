import { useState, useEffect } from 'react'
import Background from '../art/backgrounds'
import Sprite from '../art/sprites'
import DialogueBox from './DialogueBox'
import Choices from './Choices'
import Quiz from './Quiz'
import QuizReview from './QuizReview'
import useStory from '../engine/useStory'
import useTypewriter from '../hooks/useTypewriter'
import { getCharacter } from '../data/characters'
import { getQuiz } from '../data/quizzes'
import '../styles/quiz.css'

export default function Scene({ episodeId, onExit, onOpenAi }) {
  const story = useStory(episodeId)
  const { episode, scene, line, cast, choices, finished, progress } = story

  const speakerId = line?.speaker ?? null
  const speaker = speakerId ? getCharacter(speakerId) : null
  const { shown, done, skip } = useTypewriter(line?.text ?? '')

  const [quizOpen, setQuizOpen] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [quizPrompted, setQuizPrompted] = useState(false)

  const quiz = getQuiz(episodeId)
  const hasQuiz = !!quiz

  useEffect(() => {
    if (finished && hasQuiz && !quizPrompted && !quizOpen) {
      setQuizPrompted(true)
      setQuizOpen(true)
    }
  }, [finished, hasQuiz, quizPrompted, quizOpen])

  const tap = () => {
    if (quizOpen || reviewOpen) return
    if (choices || finished) return
    if (!done) skip()
    else story.advance()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (reviewOpen) setReviewOpen(false)
        else if (quizOpen) setQuizOpen(false)
        else onExit()
      }
      if (e.key === ' ' || e.key === 'Enter') {
        if (quizOpen || reviewOpen) return
        e.preventDefault()
        tap()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <div className="stage" onClick={tap}>
      <Background name={scene?.background} />

      <div className="cast">
        {cast.map((c) => {
          const ch = getCharacter(c.id)
          return (
            <Sprite
              key={c.id}
              name={ch.sprite}
              palette={ch.palette}
              at={c.at}
              flip={c.flip}
              dim={c.dim || (speakerId && speakerId !== c.id)}
              talking={speakerId === c.id && !done}
            />
          )
        })}
      </div>

      <header className="hud" onClick={(e) => e.stopPropagation()}>
        <button className="hud-back" onClick={onExit}>
          Leave episode
        </button>
        <div className="hud-title">
          <span className="hud-num">Episode {episode.number}</span>
          <span>{episode.title}</span>
        </div>
        <button className="hud-ai" onClick={onOpenAi}>AI</button>
        <div className="hud-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </header>

      {reviewOpen ? (
        <QuizReview episodeId={episodeId} onClose={() => setReviewOpen(false)} />
      ) : quizOpen ? (
        <Quiz
          episodeId={episodeId}
          onClose={() => setQuizOpen(false)}
          onReview={() => setReviewOpen(true)}
        />
      ) : null}

      <footer className="panel">
        {finished && !quizOpen ? (
          <div className="ending">
            <p className="ending-mark">End of episode {episode.number}</p>
            <p className="ending-sub">Apakah kamu ingin menguji ingatanmu?</p>
            <div className="ending-actions">
              {hasQuiz && (
                <button
                  className="btn btn-lead"
                  onClick={(e) => {
                    e.stopPropagation()
                    setQuizOpen(true)
                  }}
                >
                  Mulai Quiz
                </button>
              )}
              <button
                className="btn"
                onClick={(e) => {
                  e.stopPropagation()
                  story.restart()
                  setQuizPrompted(false)
                  setQuizOpen(false)
                  setReviewOpen(false)
                }}
              >
                Baca lagi
              </button>
              <button className="btn btn-quiet" onClick={(e) => { e.stopPropagation(); onExit() }}>
                Back to episodes
              </button>
            </div>
          </div>
        ) : choices ? (
          <Choices options={choices} onPick={story.choose} />
        ) : (
          <DialogueBox speaker={speaker} text={shown} done={done} narration={speakerId === 'narrator'} />
        )}
      </footer>
    </div>
  )
}

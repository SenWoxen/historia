import { useEffect } from 'react'
import Background from '../art/backgrounds'
import Sprite from '../art/sprites'
import DialogueBox from './DialogueBox'
import Choices from './Choices'
import useStory from '../engine/useStory'
import useTypewriter from '../hooks/useTypewriter'
import { getCharacter } from '../data/characters'

export default function Scene({ episodeId, onExit, onOpenAi }) {
  const story = useStory(episodeId)
  const { episode, scene, line, cast, choices, finished, progress } = story

  const speakerId = line?.speaker ?? null
  const speaker = speakerId ? getCharacter(speakerId) : null
  const { shown, done, skip } = useTypewriter(line?.text ?? '')

  // One tap does the obvious thing: finish the line, then move on.
  const tap = () => {
    if (choices || finished) return
    if (!done) skip()
    else story.advance()
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onExit()
      if (e.key === ' ' || e.key === 'Enter') {
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

      <footer className="panel">
        {finished ? (
          <div className="ending">
            <p className="ending-mark">End of episode {episode.number}</p>
            <div className="ending-actions">
              <button className="btn" onClick={(e) => { e.stopPropagation(); story.restart() }}>
                Read again
              </button>
              <button className="btn btn-quiet" onClick={(e) => { e.stopPropagation(); onExit() }}>
                Back to episodes
              </button>
            </div>
          </div>
        ) : choices ? (
          <Choices options={choices} onPick={story.choose} />
        ) : (
          <DialogueBox
            speaker={speaker}
            text={shown}
            done={done}
            narration={speakerId === 'narrator'}
          />
        )}
      </footer>
    </div>
  )
}

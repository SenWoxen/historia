import { useState } from 'react'
import Landing from './components/Landing'
import Scene from './components/Scene'
import AIChat from './components/AIChat'

export default function App() {
  const [playing, setPlaying] = useState(null)
  const [aiOpen, setAiOpen] = useState(false)

  return (
    <>
      {playing ? (
        <Scene key={playing} episodeId={playing} onExit={() => { setPlaying(null); setAiOpen(false) }} onOpenAi={() => setAiOpen(true)} />
      ) : (
        <Landing onPlay={setPlaying} onOpenAi={() => setAiOpen(true)} />
      )}
      {aiOpen && (
        <AIChat onClose={() => setAiOpen(false)} />
      )}
    </>
  )
}

import { useState, useEffect, useRef } from 'react'

const PATI_IDLE = '/sprites/idle.png'
const PATI_TALKING = '/sprites/openmouth.png'

export default function PatiAI({ speaking }) {
  const [src, setSrc] = useState(speaking ? PATI_TALKING : PATI_IDLE)

  useEffect(() => {
    setSrc(speaking ? PATI_TALKING : PATI_IDLE)
  }, [speaking])

  return (
    <div className={`pati-ai ${speaking ? 'is-speaking' : 'is-idle'}`}>
      <div className="pati-ai-sprite">
        <img src={src} alt="" draggable="false" />
      </div>
      {speaking && <div className="pati-ai-aura" aria-hidden="true" />}
    </div>
  )
}

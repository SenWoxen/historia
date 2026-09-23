import { useState, useRef, useEffect, useCallback } from 'react'
import { streamChat } from '../services/ai'
import PatiAI from './PatiAI'
import DialogueBox from './DialogueBox'

const STORAGE_KEY = 'historia-ai-history'

export default function AIChat({ onClose }) {
  const [messages, setMessages] = useState(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const [displayed, setDisplayed] = useState('')
  const abortRef = useRef(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const rafRef = useRef(null)
  const sendingRef = useRef(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {}
  }, [messages])

  const scheduleScroll = useCallback(() => {
    if (rafRef.current) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const el = scrollRef.current
      if (!el) return
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120
      if (atBottom) {
        el.scrollTop = el.scrollHeight
      }
    })
  }, [])

  useEffect(() => {
    scheduleScroll()
  }, [displayed, messages, scheduleScroll])

  useEffect(() => {
    inputRef.current?.focus()
  }, [onClose])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming || sendingRef.current) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setError(null)
    setDisplayed('')
    setStreaming(true)
    sendingRef.current = true

    const controller = new AbortController()
    abortRef.current = controller

    try {
      let answer = ''
      let frame = 0
      for await (const chunk of streamChat({ messages: next, signal: controller.signal })) {
        answer += chunk
        frame++
        if (frame % 2 === 0) {
          setDisplayed(answer)
        }
      }
      if (answer.trim()) {
        setMessages((m) => [...m, { role: 'assistant', content: answer }])
      }
    } catch (err) {
      if (err?.name !== 'AbortError') {
        setError('Maaf, aku sedang mengalami kendala. Coba lagi sebentar.')
      }
    } finally {
      setDisplayed('')
      sendingRef.current = false
      setStreaming(false)
      abortRef.current = null
    }
  }, [input, messages, streaming])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  const handleStop = () => {
    abortRef.current?.abort()
  }

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
  const activeText = displayed || lastAssistant?.content || ''

  return (
    <div className="ai-panel" onClick={(e) => e.stopPropagation()}>
      <div className="ai-header">
        <h2>Historia AI</h2>
        <button className="btn btn-quiet btn-small" onClick={onClose}>Tutup</button>
      </div>

      <div className="ai-body">
        <div className="ai-pati">
          <PatiAI speaking={streaming} />
          <p className="ai-pati-label">Pati</p>
        </div>

        <div className="ai-chat" ref={scrollRef}>
          {messages.length === 0 && !streaming && (
            <p className="ai-placeholder">Tanya sesuatu tentang sejarah Indonesia...</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              <span className="ai-msg-role">{m.role === 'user' ? 'Kamu' : 'Pati'}</span>
              <p>{m.content}</p>
            </div>
          ))}
          {displayed && (
            <div className="ai-msg assistant">
              <span className="ai-msg-role">Pati</span>
              <p>{displayed}</p>
            </div>
          )}
          {streaming && !displayed && (
            <p className="ai-loading">Pati sedang berpikir...</p>
          )}
          {error && <p className="ai-error">{error}</p>}
        </div>

        {(streaming || displayed) && (
          <button className="ai-stop" onClick={handleStop}>Hentikan</button>
        )}
      </div>

      <form className="ai-footer" onSubmit={(e) => { e.preventDefault(); send() }}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Tulis pertanyaan..."
          disabled={streaming}
        />
        <button className="btn btn-lead btn-small" type="submit" disabled={streaming || !input.trim()}>
          Kirim
        </button>
      </form>

      {activeText && !streaming && (
        <div className="ai-dialogue-preview">
          <DialogueBox speaker={{ name: 'Pati', color: 'var(--gold)' }} text={activeText} done={!streaming} showContinue={false} />
        </div>
      )}
    </div>
  )
}

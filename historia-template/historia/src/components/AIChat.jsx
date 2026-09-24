import { useState, useRef, useEffect, useCallback } from 'react'
import { streamChat } from '../services/ai'
import PatiAI from './PatiAI'
import DialogueBox from './DialogueBox'

const STORAGE_KEY = 'historia-ai-history'

const REVEAL_STEP_MS = 40
const REVEAL_CHARS = 3

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

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
  // `received` = the full text fetched from Gemini so far.
  // `displayed` = the slice already revealed to the user.
  const [received, setReceived] = useState('')
  const [displayed, setDisplayed] = useState('')
  const [revealing, setRevealing] = useState(false)
  const abortRef = useRef(null)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const rafRef = useRef(null)
  const sendingRef = useRef(false)
  const reduceMotionRef = useRef(prefersReducedMotion())

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

  // Progressive reveal: advance `displayed` toward `received` at a steady,
  // readable clip (~75 chars/s). The effect reschedules itself on every
  // `displayed` change and on each new chunk arriving via `received`, so the
  // animation is never waiting on the end of the stream. Reduced motion
  // jumps straight to the received text.
  useEffect(() => {
    if (!received) return
    if (displayed.length >= received.length) {
      setRevealing(false)
      return
    }
    if (reduceMotionRef.current) {
      setDisplayed(received)
      return
    }

    setRevealing(true)
    const timer = setTimeout(() => {
      const to = Math.min(displayed.length + REVEAL_CHARS, received.length)
      setDisplayed(received.slice(0, to))
    }, REVEAL_STEP_MS)
    return () => clearTimeout(timer)
  }, [received, displayed])

  const send = useCallback(async () => {
    const text = input.trim()
    if (!text || streaming || sendingRef.current) return

    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setError(null)
    setReceived('')
    setDisplayed('')
    setRevealing(false)
    setStreaming(true)
    sendingRef.current = true

    const controller = new AbortController()
    abortRef.current = controller

    let answer = ''
    try {
      for await (const chunk of streamChat({ messages: next, signal: controller.signal })) {
        answer += chunk
        setReceived(answer)
      }
      if (answer.trim()) {
        setMessages((m) => [...m, { role: 'assistant', content: answer }])
      }
    } catch (err) {
      setDisplayed(answer)
      setRevealing(false)
      if (err?.name !== 'AbortError') {
        setError('Maaf, aku sedang mengalami kendala. Coba lagi sebentar.')
      }
    } finally {
      setStreaming(false)
      sendingRef.current = false
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
    if (streaming) abortRef.current?.abort()
    setDisplayed(received)
    setRevealing(false)
  }

  // An assistant turn is "live" while its text is still being streamed or
  // revealed. During that window the in-flight bubble (showing `displayed`)
  // replaces the committed tail message in the scrollback.
  const liveTail = streaming || revealing
  const tail = messages[messages.length - 1]
  const list = liveTail && tail?.role === 'assistant' ? messages.slice(0, -1) : messages

  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant')
  const activeText = displayed || lastAssistant?.content || ''
  const speaking = streaming || revealing

  return (
    <div className="ai-panel" onClick={(e) => e.stopPropagation()}>
      <div className="ai-header">
        <h2>Historia AI</h2>
        <button className="btn btn-quiet btn-small" onClick={onClose}>Tutup</button>
      </div>

      <div className="ai-body">
        <div className="ai-pati">
          <PatiAI speaking={speaking} />
          <p className="ai-pati-label">Pati</p>
        </div>

        <div className="ai-chat" ref={scrollRef}>
          {messages.length === 0 && !streaming && (
            <p className="ai-placeholder">Tanya sesuatu tentang sejarah Indonesia...</p>
          )}
          {list.map((m, i) => (
            <div key={i} className={`ai-msg ${m.role}`}>
              <span className="ai-msg-role">{m.role === 'user' ? 'Kamu' : 'Pati'}</span>
              <p>{m.content}</p>
            </div>
          ))}
          {displayed && liveTail && (
            <div className="ai-msg assistant is-revealing">
              <span className="ai-msg-role">Pati</span>
              <p>
                {displayed}
                <span className="caret" />
              </p>
            </div>
          )}
          {streaming && !displayed && (
            <p className="ai-loading">Pati sedang berpikir...</p>
          )}
          {error && <p className="ai-error">{error}</p>}
        </div>

        {(streaming || revealing) && (
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
          disabled={streaming || revealing}
        />
        <button className="btn btn-lead btn-small" type="submit" disabled={streaming || revealing || !input.trim()}>
          Kirim
        </button>
      </form>

      {activeText && !streaming && !revealing && (
        <div className="ai-dialogue-preview">
          <DialogueBox speaker={{ name: 'Pati', color: 'var(--gold)' }} text={activeText} done={!speaking} showContinue={false} />
        </div>
      )}
    </div>
  )
}
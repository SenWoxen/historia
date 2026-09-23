/**
 * Historia AI service.
 *
 * Calls the local backend proxy at `/api/ai/chat`.
 * Backend SSE format: data: {"text":"..."}  and a terminal data: [DONE]
 *
 * An inactivity watchdog aborts the request if the stream produces no
 * bytes for STALL_TIMEOUT ms, so the caller can never hang forever.
 * A caller abort (Stop button) is forwarded through the same controller
 * and surfaces as AbortError.
 */

const API_URL = import.meta.env.VITE_HISTORIA_AI_URL || '/api/ai/chat'

const STALL_TIMEOUT = 30000
const MAX_STREAM_MS = 120000

export async function* streamChat({ messages, signal }) {
  const controller = new AbortController()
  const forwardAbort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  else signal?.addEventListener('abort', forwardAbort)

  let stallTimer = null
  const arm = () => {
    clearTimeout(stallTimer)
    stallTimer = setTimeout(() => {
      controller.abort(new DOMException('AI stream stalled', 'TimeoutError'))
    }, STALL_TIMEOUT)
  }

  // Hard ceiling so the request can never run forever, even if bytes keep
  // arriving (e.g. keep-alives) and keep resetting the inactivity timer.
  const totalTimer = setTimeout(() => {
    controller.abort(new DOMException('AI stream exceeded time limit', 'TimeoutError'))
  }, MAX_STREAM_MS)

  try {
    arm()
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(text || `AI request failed: ${res.status}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      arm()
      if (done) return

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const payload = trimmed.slice(6).trim()
        if (payload === '[DONE]') return
        try {
          const parsed = JSON.parse(payload)
          const text = parsed.text ?? parsed.choices?.[0]?.delta?.content ?? ''
          if (text) yield text
        } catch {
          // ignore malformed SSE
        }
      }
    }
  } finally {
    clearTimeout(stallTimer)
    clearTimeout(totalTimer)
    signal?.removeEventListener('abort', forwardAbort)
    controller.abort()
  }
}

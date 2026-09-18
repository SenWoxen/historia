/**
 * Historia AI service.
 *
 * Calls the local backend proxy at `/api/ai/chat`.
 * Backend SSE format: data: {"text":"..."}
 */

const API_URL = import.meta.env.VITE_HISTORIA_AI_URL || '/api/ai/chat'

export async function* streamChat({ messages, signal }) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
    signal,
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
    if (done) break

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
}

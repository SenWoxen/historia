/**
 * Historia AI chat — Vercel Serverless Function.
 *
 * Mirrors the local Express route in `server.js` so the frontend contract
 * is unchanged: POST /api/ai/chat with `{ messages: [{ role, content }] }`
 * and a text/event-stream response of `data: {"text":"..."}` chunks
 * terminated by `data: [DONE]`.
 *
 * Secrets come from Vercel environment variables (GEMINI_API_KEY,
 * GEMINI_MODEL) and are never logged or echoed.
 */

const SYSTEM_PROMPT =
  'Kamu adalah Pati, pemandu museum virtual Historia. Jawab dengan singkat, jelas, dan akurat tentang sejarah pergerakan nasional Indonesia. Jawab dalam Bahasa Indonesia. Jika tidak yakin, katakan bahwa kamu tidak tahu dan sarankan untuk mengecek sumber yang lebih authoritative. Jangan mengarang fakta sejarah.'

const GEMINI_IDLE_TIMEOUT = 60000

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let data = ''
    req.setEncoding('utf8')
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => resolve(data))
    req.on('error', reject)
  })

const sendJson = (res, status, payload) => {
  if (res.writableEnded || res.destroyed) return
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    return res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Metode tidak diizinkan' })
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY
  const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'

  if (!GEMINI_API_KEY) {
    return sendJson(res, 500, { error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
  }

  let messages
  try {
    const raw = await readBody(req)
    messages = JSON.parse(raw || '{}').messages
  } catch {
    return sendJson(res, 400, { error: 'Body harus berupa JSON dengan field messages' })
  }

  if (!Array.isArray(messages)) {
    return sendJson(res, 400, { error: 'messages harus berupa array' })
  }

  const controller = new AbortController()
  const onClose = () => controller.abort()
  res.on('close', onClose)

  const write = (data) => {
    if (!res.destroyed && !res.writableEnded) res.write(data)
  }

  let idleTimer = null
  const armIdle = () => {
    clearTimeout(idleTimer)
    idleTimer = setTimeout(() => {
      if (!res.destroyed && !res.writableEnded) controller.abort()
    }, GEMINI_IDLE_TIMEOUT)
  }

  try {
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content ?? '') }],
    }))

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
    }

    const apiUrl =
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL_NAME)}` +
      `:streamGenerateContent?alt=sse&key=${encodeURIComponent(GEMINI_API_KEY)}`

    armIdle()
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    if (!response.ok) {
      await response.text().catch(() => '')
      return sendJson(res, 500, { error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      armIdle()
      if (done) break
      if (controller.signal.aborted) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const payload = trimmed.slice(6).trim()
        if (payload === '[DONE]') continue
        try {
          const parsed = JSON.parse(payload)
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
          if (text) write(`data: ${JSON.stringify({ text })}\n\n`)
        } catch {
          // ignore malformed SSE
        }
      }
    }

    write('data: [DONE]\n\n')
    if (!res.writableEnded) res.end()
  } catch (err) {
    if (err?.name === 'AbortError') {
      if (!res.writableEnded) res.end()
      return
    }
    if (!res.headersSent) {
      sendJson(res, 500, { error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
    } else if (!res.writableEnded) {
      res.end()
    }
  } finally {
    clearTimeout(idleTimer)
    res.removeListener('close', onClose)
  }
}
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'
const GEMINI_IDLE_TIMEOUT = 60000

if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env')
  process.exit(1)
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `Kamu adalah Pati, pemandu museum virtual Historia. Jawab dengan singkat, jelas, dan akurat tentang sejarah pergerakan nasional Indonesia. Jawab dalam Bahasa Indonesia. Jika tidak yakin, katakan bahwa kamu tidak tahu dan sarankan untuk mengecek sumber yang lebih authoritative. Jangan mengarang fakta sejarah.`

app.post('/api/ai/chat', async (req, res) => {
  console.log('AI request received:', req.body.messages?.length ?? 0, 'messages')

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
      if (!res.destroyed && !res.writableEnded) {
        console.log('Gemini stream idle timeout, aborting')
        controller.abort()
      }
    }, GEMINI_IDLE_TIMEOUT)
  }

  try {
    const { messages } = req.body
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages harus berupa array' })
    }

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents,
    }

    console.log('Calling Gemini model:', MODEL_NAME)
    armIdle()
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    })

    console.log('Gemini response status:', response.status)
    if (!response.ok) {
      const text = await response.text()
      console.error('Gemini error:', response.status, text)
      return res.status(500).json({ error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let chunkCount = 0

    while (true) {
      const { done, value } = await reader.read()
      armIdle()
      if (done) {
        console.log('Gemini stream done, chunks:', chunkCount)
        break
      }
      if (controller.signal.aborted) {
        console.log('Gemini stream aborted, chunks:', chunkCount)
        break
      }

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
          if (text) {
            chunkCount++
            write(`data: ${JSON.stringify({ text })}\n\n`)
          }
        } catch {
          // ignore parse errors
        }
      }
    }

    write('data: [DONE]\n\n')
    res.end()
  } catch (err) {
    if (err?.name === 'AbortError') {
      console.log('Request aborted, stopping Gemini stream')
      res.end()
      return
    }
    console.error('AI error:', err)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
    } else {
      res.end()
    }
  } finally {
    clearTimeout(idleTimer)
    res.removeListener('close', onClose)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Historia AI server running on http://localhost:${PORT}`)
})

export default app

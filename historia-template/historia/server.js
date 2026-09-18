import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const MODEL_NAME = process.env.GEMINI_MODEL || 'gemini-3.5-flash-lite'

if (!GEMINI_API_KEY) {
  console.error('Missing GEMINI_API_KEY in .env')
  process.exit(1)
}

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:streamGenerateContent?alt=sse&key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `Kamu adalah Pati, pemandu museum virtual Historia. Jawab dengan singkat, jelas, dan akurat tentang sejarah pergerakan nasional Indonesia. Jawab dalam Bahasa Indonesia. Jika tidak yakin, katakan bahwa kamu tidak tahu dan sarankan untuk mengecek sumber yang lebih authoritative. Jangan mengarang fakta sejarah.`

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages } = req.body
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages harus berupa array' })
    }

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const lastUser = messages[messages.length - 1]?.content ?? ''
    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      contents: [
        ...contents,
        { role: 'user', parts: [{ text: lastUser }] },
      ],
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

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
        if (payload === '[DONE]') {
          res.write('data: [DONE]\n\n')
          continue
        }
        try {
          const parsed = JSON.parse(payload)
          const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
          if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`)
        } catch {
          // ignore parse errors
        }
      }
    }

    res.end()
  } catch (err) {
    console.error('AI error:', err)
    res.status(500).json({ error: 'Maaf, aku sedang mengalami kendala. Coba lagi sebentar.' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Historia AI server running on http://localhost:${PORT}`)
})

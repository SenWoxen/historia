import { useEffect, useRef, useState } from 'react'

/**
 * Reveals `text` one character at a time.
 * Returns the visible slice, whether it finished, and skip() to reveal it all.
 * Respects prefers-reduced-motion by showing the full line immediately.
 */
export default function useTypewriter(text = '', speed = 26) {
  const [shown, setShown] = useState('')
  const timer = useRef(null)

  const instant =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    clearInterval(timer.current)

    if (!text || instant) {
      setShown(text)
      return
    }

    setShown('')
    let i = 0
    timer.current = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(timer.current)
    }, speed)

    return () => clearInterval(timer.current)
  }, [text, speed, instant])

  const done = shown.length >= text.length

  const skip = () => {
    clearInterval(timer.current)
    setShown(text)
  }

  return { shown, done, skip }
}

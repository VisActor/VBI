import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

export function useFullscreen(ref: RefObject<HTMLElement | null>) {
  const [fullscreen, setFullscreen] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true
    const element = ref.current
    const onChange = () => setFullscreen(document.fullscreenElement === element)
    document.addEventListener('fullscreenchange', onChange)
    return () => {
      mounted.current = false
      document.removeEventListener('fullscreenchange', onChange)
      if (document.fullscreenElement === element) void document.exitFullscreen().catch(() => {})
    }
  }, [ref])

  const toggle = async () => {
    const element = ref.current
    if (!element || pending) return
    setPending(true)
    setError(false)
    try {
      if (document.fullscreenElement === element) await document.exitFullscreen()
      else await element.requestFullscreen()
      if (!mounted.current && document.fullscreenElement === element) await document.exitFullscreen()
    } catch {
      if (mounted.current) setError(true)
    } finally {
      if (mounted.current) setPending(false)
    }
  }

  return { fullscreen, pending, error, toggle }
}

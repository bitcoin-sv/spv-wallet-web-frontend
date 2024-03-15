import { HighlightAnimationClassName } from '@/styles/highlightAnimation'
import { useCallback, useEffect, useRef, useState, RefObject } from 'react'

type PaymailAnimation = {
  startAnimation: () => void
  ref: RefObject<HTMLInputElement>
}

export const usePaymailInputAnimation = (): PaymailAnimation => {
  const ref = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = useCallback(() => setIsAnimating(true), [])

  useEffect(() => {
    if (ref.current == null) {
      return
    }
    const element = ref.current
    if (!isAnimating) {
      element.classList.remove(HighlightAnimationClassName)
    } else {
      element.classList.add(HighlightAnimationClassName)
      timeoutRef.current = setTimeout(() => {
        setIsAnimating(false)
      }, 1000)

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }
  }, [ref, isAnimating])

  return { startAnimation, ref }
}

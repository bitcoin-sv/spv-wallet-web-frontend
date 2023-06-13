import { EffectCallback, useEffect, useRef } from 'react'

export const useMountEffect = (effect: EffectCallback) => {
  const mountedRef = useRef(false)

  return useEffect(() => {
    if (mountedRef.current) {
      return
    }
    effect()
    return () => {
      mountedRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

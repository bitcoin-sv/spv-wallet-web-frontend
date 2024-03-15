import { useEffect } from 'react'

const EVENT_NAME = 'paymail'

export const setPaymailEvent = new EventTarget()

export const useSubscribePaymailEvent = (callback: (data: string) => void) => {
  useEffect(() => {
    const handler = (event: Event) => {
      if (event instanceof CustomEvent) {
        callback(event.detail)
      }
    }
    setPaymailEvent.addEventListener(EVENT_NAME, handler)
    return () => {
      setPaymailEvent.removeEventListener(EVENT_NAME, handler)
    }
  }, [callback])
}

export const emitSetPaymailEvent = (data: string) => {
  setPaymailEvent.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }))
}

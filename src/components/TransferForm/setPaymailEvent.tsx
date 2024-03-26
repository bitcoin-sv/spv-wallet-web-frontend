import { useEffect } from 'react'

const EVENT_NAME = 'paymail'

export const setPaymailEvent = new EventTarget()

// useSubscribePaymailEvent allows to subscribe to the paymail event
// when the <SetPaymailButton /> is clicked it will emit the paymail event
// this is a way to communicate between components without using props and context
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

import { useWsUrl } from '@/api/wsUrl.ts'
import { useEffect, useMemo, useState } from 'react'
import { Centrifuge, MessageContext } from 'centrifuge'
import { WebsocketTransaction } from '@/api/types/transaction.ts'
import { toast } from 'react-toastify'

export const useWebsocket = () => {
  const [isInitialized, setIsInitialized] = useState(false)
  const [retries, setRetries] = useState(0)
  const wsUrl = useWsUrl()

  const centrifuge = useMemo(() => new Centrifuge(wsUrl, { websocket: WebSocket }), [wsUrl])

  const connect = () => {
    if (!isInitialized) {
      centrifuge.connect()
      setIsInitialized(true)
    } else {
      throw new Error('Websocket connection is already initialized')
    }
  }

  const disconnect = () => {
    centrifuge.disconnect()
    setIsInitialized(false)
  }

  centrifuge.on('message', function (ctx: MessageContext) {
    const event: WebsocketTransaction | undefined = ctx?.data

    if (event !== null && typeof event == 'object' && !Array.isArray(event)) {
      const { eventType, status, error } = event
      switch (eventType) {
        case 'create_transaction':
          if (status === 'success') {
            toast.success('Transaction successfully sent')
          } else if (status === 'error') {
            toast.error(error || 'Error while sending transaction')
          }
          break
      }
    }
  })

  centrifuge.on('error', function () {
    setRetries((prevState) => prevState + 1)
    if (retries >= 3) {
      centrifuge.disconnect()
    }
  })

  useEffect(() => {
    const channel = 'bux-wallet'
    const sub = centrifuge.newSubscription(channel)
    sub.subscribe()

    return () => {
      sub.unsubscribe()
      sub.removeAllListeners()
    }
  }, [centrifuge])

  return {
    connect,
    disconnect,
  }
}

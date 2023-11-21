import { Centrifuge, MessageContext } from 'centrifuge'
import { BaseWebsocketModel, WebsocketTransaction } from '@/api/types/transaction'
import { toast } from 'react-toastify'

export const SetupWebsocket = (url: string) => {
  let retries = 0
  const centrifuge = new Centrifuge(url, { websocket: WebSocket })
  centrifuge.connect()

  centrifuge.on('message', function (ctx: MessageContext) {
    const event = parseResponse(ctx)

    if (typeof event == 'object' && event != undefined) {
      switch (event.eventType) {
        case 'create_transaction':
          if (event.status === 'success') {
            toast.success('Transaction successfully sent')
          } else if (event.status === 'error') {
            toast.error(event.error || 'Error while sending transaction')
          }
          break
      }
    }
  })

  centrifuge.on('error', function () {
    retries++
    if (retries >= 3) {
      centrifuge.disconnect()
    }
  })

  const channel = 'bux-wallet'
  const sub = centrifuge.newSubscription(channel)
  sub.subscribe()
}

function parseResponse(ctx: MessageContext): WebsocketTransaction | undefined {
  // Try to map the response to the expected type
  //
  // Create transaction response
  const wsTransaction: BaseWebsocketModel<WebsocketTransaction> = ctx
  if (wsTransaction != undefined) {
    return wsTransaction.data
  }

  // TODO: change of status or incoming transaction

  return undefined
}

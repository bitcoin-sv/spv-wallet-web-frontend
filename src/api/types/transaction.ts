export type TransactionDirection = 'incoming' | 'outgoing'

export type Transaction = {
  createdAt: string
  direction: TransactionDirection
  id: string
  status: string
  totalValue: number
  sender: string
  receiver: string
  fee: number
}

export type TransactionDetails = Transaction & {
  blockHash: string
  blockHeight: number
  numberOfInputs: number
  numberOfOutputs: number
}

export interface SendNewTransaction {
  recipient: string
  satoshis: number
  password: string
}

export interface BaseWebsocketModel<T> {
  data: T
}

export interface WebsocketTransaction {
  status: string
  error: null | string
  eventType: string
  transaction: Transaction
}

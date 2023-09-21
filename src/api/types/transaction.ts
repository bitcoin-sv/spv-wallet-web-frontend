export interface Transaction {
  createdAt: string
  direction: string
  id: string
  status: string
  totalValue: number
  sender: string
  receiver: string
}

export interface TransactionDetails {
  blockHash: string
  blockHeight: number
  id: string
  direction: string
  fee: number
  numberOfInputs: number
  numberOfOutputs: number
  amount: string
  status: string
  createdAt: string
  totalValue: number
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

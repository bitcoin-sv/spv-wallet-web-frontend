export interface Transaction {
  createdAt: string
  direction: string
  id: string
  status: string
  totalValue: string
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
  totalValue: 886
}

export interface SendNewTransaction {
  recipient?: string
  satoshis?: number
  password: string
  data?: string
}

export interface Transaction {
  createdAt: string
  direction: string
  id: string
  status: string
  totalValue: string
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

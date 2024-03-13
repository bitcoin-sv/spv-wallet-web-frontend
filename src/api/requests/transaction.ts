import axios from 'axios'
import { SendNewTransaction } from '@/api/types/transaction'

export const getTransactions = async (page?: number, pageSize?: number, order?: string, sort?: 'desc' | 'asc') => {
  const { data: response } = await axios.get(
    `/transaction?page=${page || 1}&page_size=${pageSize || 10}&order=${order || 'created_at'}&sort=${sort || 'desc'}`,
    {
      withCredentials: true,
      headers: {
        'Cache-Control': 'no-store, no-cache',
      },
    }
  )
  if (response != null && typeof response !== 'object') {
    throw new Error('Unexpected response from backend.', { cause: { response } })
  }
  return {
    transactions: response,
  }
}

export const getTransactionsDetails = async (transactionId: string) => {
  const { data: response } = await axios.get(`/transaction/${transactionId}`, {
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  })
  return response
}

export const sendTransaction = async (data: SendNewTransaction) => {
  const { data: response } = await axios.post('/transaction', data, { withCredentials: true })
  return response
}

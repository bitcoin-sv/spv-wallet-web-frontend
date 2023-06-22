import { axiosClient } from '@/api/client'
import { SendNewTransaction } from '@/api/types/transaction'

export const sendTransaction = async (data: SendNewTransaction) => {
  const { data: response } = await axiosClient.post('/transaction', data)
  return response
}

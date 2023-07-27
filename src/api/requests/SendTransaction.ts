import { SendNewTransaction } from '@/api/types/transaction'
import axios from 'axios'

export const sendTransaction = async (apiUrl: string, data: SendNewTransaction) => {
  const { data: response } = await axios.post(`${apiUrl}/transaction`, data, { withCredentials: true })
  return response
}

import { axiosClient } from '@/api/client'

export const getTransactionsDetails = async (transactionId: string) => {
  const { data: response } = await axiosClient.get(`/transaction/${transactionId}`)
  return response
}

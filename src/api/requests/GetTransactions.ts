import { axiosClient } from '@/api/client'

export const getTransactions = async () => {
  const { data: response } = await axiosClient.get('/transaction')
  return response
}

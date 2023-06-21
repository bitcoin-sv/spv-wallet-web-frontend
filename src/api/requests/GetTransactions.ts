import { axiosClient } from '@/api/client'

export const getTransactions = async (PAGE?: number, PAGE_SIZE?: number, ORDER?: string, SORT?: 'desc' | 'asc') => {
  const { data: count } = await axiosClient.get('/transaction')
  const { data: transactions } = await axiosClient.get(
    `/transaction?page=${PAGE || 1}&page_size=${PAGE_SIZE || 10}&order=${ORDER || 'created_at'}&sort=${SORT || 'desc'}`
  )
  return {
    transactions,
    count,
  }
}

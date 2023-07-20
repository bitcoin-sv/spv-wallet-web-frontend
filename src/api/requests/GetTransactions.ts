import axios from 'axios'

export const getTransactions = async (
  apiUrl: string,
  PAGE?: number,
  PAGE_SIZE?: number,
  ORDER?: string,
  SORT?: 'desc' | 'asc'
) => {
  const { data: transactions } = await axios.get(
    `${apiUrl}/transaction?page=${PAGE || 1}&page_size=${PAGE_SIZE || 10}&order=${ORDER || 'created_at'}&sort=${
      SORT || 'desc'
    }`
  )
  return {
    transactions,
  }
}

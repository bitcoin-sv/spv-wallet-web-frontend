import axios from 'axios'

export const getTransactions = async (
  apiUrl: string,
  PAGE?: number,
  PAGE_SIZE?: number,
  ORDER?: string,
  SORT?: 'desc' | 'asc'
) => {
  const { data: response } = await axios.get(
    `${apiUrl}/transaction?page=${PAGE || 1}&page_size=${PAGE_SIZE || 10}&order=${ORDER || 'created_at'}&sort=${
      SORT || 'desc'
    }`,
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

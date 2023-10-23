import axios from 'axios'

export const getTransactionsDetails = async (apiUrl: string, transactionId: string) => {
  const { data: response } = await axios.get(`${apiUrl}/transaction/${transactionId}`, {
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  })
  return response
}

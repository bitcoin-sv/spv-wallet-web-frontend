import axios from 'axios'

export const getTransactionsDetails = async (apiUrl: string, transactionId: string) => {
  const { data: response } = await axios.get(`${apiUrl}/transaction/${transactionId}`)
  return response
}

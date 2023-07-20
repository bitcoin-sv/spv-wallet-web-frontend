import axios from 'axios'

export const getUser = async (apiUrl: string) => {
  const { data: response } = await axios.get(`${apiUrl}/user`)
  return response
}

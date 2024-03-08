import axios from 'axios'

export const getServerConfig = async (apiUrl: string) => {
  const { data: response } = await axios.get(`${apiUrl}/config`, {
    withCredentials: false,
  })
  return response
}

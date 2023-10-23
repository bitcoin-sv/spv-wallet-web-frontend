import axios from 'axios'

export const getUser = async (apiUrl: string) => {
  const { data: response } = await axios.get(`${apiUrl}/user`, {
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  })
  return response
}

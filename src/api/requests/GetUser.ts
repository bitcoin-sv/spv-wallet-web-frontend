import axios from 'axios'

export const getUser = async (apiUrl: string) => {
  const { data: response } = await axios.get(`${apiUrl}/user`, {
    withCredentials: true,
    headers: {
      'Cache-Control': 'no-store, no-cache',
    },
  })

  if (response != null && typeof response !== 'object') {
    throw new Error('Unexpected response from backend.', { cause: { response } })
  }

  return response
}

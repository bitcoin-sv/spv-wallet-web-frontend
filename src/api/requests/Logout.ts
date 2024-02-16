import axios from 'axios'

export const logoutUser = async (apiUrl: string) => {
  await axios.post(`${apiUrl}/sign-out`, null, { withCredentials: true })
}

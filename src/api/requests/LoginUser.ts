import { User } from '@/api/types/user'
import axios from 'axios'

export const loginUser = async (apiUrl: string, data: User) => {
  const { data: response } = await axios.post(`${apiUrl}/sign-in`, data, { withCredentials: true })
  return response
}

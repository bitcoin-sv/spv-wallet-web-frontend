import { User } from '@/api/types/user'
import { LOGIN_USER } from '@/api/endpoints'
import axios from 'axios'

export const loginUser = async (data: User) => {
  const { data: response } = await axios.post(LOGIN_USER, data, { withCredentials: true })
  return response
}

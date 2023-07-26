import { RegisterNewUserDto } from '@/api/types/user'
import axios from 'axios'

export const registerUser = async (apiUrl: string, data: RegisterNewUserDto) => {
  const { data: response } = await axios.post(`${apiUrl}/user`, data)
  return response
}

import { NewUser } from '@/api/types/user'
import { REGISTER_USER } from '@/api/endpoints'
import axios from 'axios'

export const registerUser = async (data: NewUser) => {
  const { data: response } = await axios.post(REGISTER_USER, data)
  return response
}

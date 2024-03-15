import axios from 'axios'
import { User, RegisterNewUserDto } from '@/api/types/user'

export const getUser = async () => {
  const { data: response } = await axios.get('/user')

  if (response != null && typeof response !== 'object') {
    throw new Error('Unexpected response from backend.', { cause: { response } })
  }

  return response
}

export const loginUser = async (data: User) => {
  const { data: response } = await axios.post(`/sign-in`, data)
  return response
}

export const registerUser = async (data: RegisterNewUserDto) => {
  const { data: response } = await axios.post('/user', data)
  return response
}

export const logoutUser = async () => {
  await axios.post('/sign-out', null)
}

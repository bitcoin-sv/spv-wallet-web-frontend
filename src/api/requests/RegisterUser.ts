import { RegisterNewUserDto } from '@/api/types/user'
import { axiosClient } from '@/api/client'

export const registerUser = async (data: RegisterNewUserDto) => {
  const { data: response } = await axiosClient.post('/user', data)
  return response
}

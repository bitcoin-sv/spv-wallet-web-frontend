import { User } from '@/api/types/user'
import { axiosClient } from '@/api/client'

export const loginUser = async (data: User) => {
  const { data: response } = await axiosClient.post('/sign-in', data, { withCredentials: true })
  return response
}

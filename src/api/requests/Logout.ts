import { axiosClient } from '@/api/client'

export const logoutUser = async () => {
  await axiosClient.post('/sign-out')
}

import { axiosClient } from '@/api/client'

export const getUser = async () => {
  const { data: response } = await axiosClient.get('/user')
  return response
}

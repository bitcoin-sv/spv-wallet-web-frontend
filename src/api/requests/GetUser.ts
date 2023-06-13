import { GET_USER } from '@/api/endpoints'
import axios from 'axios'

export const getUser = async () => {
  const { data: response } = await axios.get(GET_USER)
  return response
}

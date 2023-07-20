import { useConfig } from '@/providers'

export const useApiUrl = () => {
  const { config } = useConfig()
  return `${config.apiUrl}/api/v1`
}

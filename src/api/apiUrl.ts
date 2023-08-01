import { useConfig } from '@4chain-ag/react-configuration'

export const useApiUrl = () => {
  const { config } = useConfig()
  return config.apiUrl ? `${config.apiUrl}/api/v1` : undefined
}

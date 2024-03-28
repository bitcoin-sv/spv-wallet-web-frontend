import { useServerConfig } from '@/providers/server_config/hooks'

export const useExperimentalFeatures = () => {
  return useServerConfig().experimental_features
}

export const usePikeEnabled = () => {
  return useExperimentalFeatures().pike_enabled
}

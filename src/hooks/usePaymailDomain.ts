import { useServerConfig } from '@/providers/server_config/hooks'

export const usePaymailDomain = () => {
  return useServerConfig().paymail_domain
}

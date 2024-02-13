import { useConfig } from '@4chain-ag/react-configuration'

export const usePaymailDomain = () => {
  const { config } = useConfig()
  const domain = config?.paymailDomain
  if (typeof domain !== 'string') {
    return 'example.com'
  }
  return domain
}

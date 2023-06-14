import { useContext } from 'react'

import { AuthorizationContext } from './provider'

export const useAuthorization = () => {
  const ctx = useContext(AuthorizationContext)
  if (!ctx) {
    throw new Error('useApi must be used within AuthorizationProvider')
  }
  return ctx
}

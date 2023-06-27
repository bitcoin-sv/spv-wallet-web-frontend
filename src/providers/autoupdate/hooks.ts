import { useContext } from 'react'

import { AutoupdateContext } from './provider'

export const useAutoupdate = () => {
  const ctx = useContext(AutoupdateContext)
  if (!ctx) {
    throw new Error('useApi must be used within AuthorizationProvider')
  }
  return ctx
}

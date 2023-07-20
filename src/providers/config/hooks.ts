import { useContext } from 'react'
import { ConfigContext } from './provider'

export const useConfig = () => {
  const ctx = useContext(ConfigContext)
  if (!ctx) {
    throw new Error('useConfig must be use within ConfigProvider')
  }
  return ctx
}

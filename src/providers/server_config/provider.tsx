import { ServerConfig } from '@/api'
import { useApiUrl } from '@/api/apiUrl'
import { getServerConfig } from '@/api/requests'
import { FC, PropsWithChildren, createContext, useEffect, useState } from 'react'

export const ServerConfigContext = createContext<ServerConfig>(null as never)

export const ServerConfigProvider: FC<PropsWithChildren> = ({ children }) => {
  const apiUrl = useApiUrl()
  const [loading, setLoading] = useState(true)
  const [serverConfig, setServerConfig] = useState<ServerConfig | null>(null)

  useEffect(() => {
    if (!apiUrl) {
      return
    }

    getServerConfig(apiUrl)
      .then((response) => {
        setServerConfig(response)
      })
      .catch((e) => {
        console.error('Error during fetching server config', e)
      })
      .finally(() => setLoading(false))
  }, [apiUrl])

  if (loading) return null

  if (!serverConfig) {
    throw new Error('Cannot fetch server configuration. Please try again later.')
  }

  return <ServerConfigContext.Provider value={serverConfig}>{children}</ServerConfigContext.Provider>
}

import { useConfig } from '@4chain-ag/react-configuration'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import axios from 'axios'

export const AxiosProvider: FC<PropsWithChildren> = ({ children }) => {
  const { config } = useConfig()
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (!config?.apiUrl) {
      return
    }

    axios.defaults.baseURL = `${config.apiUrl}/api/v1`
    setupAxiosInterceptors()

    setRender(true)
  }, [config?.apiUrl])

  return render ? <>{children}</> : null
}

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      config.withCredentials = true

      if (config.method === 'get') {
        config.headers['Cache-Control'] = 'no-store, no-cache'
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

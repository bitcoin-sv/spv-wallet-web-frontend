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
    setRender(true)
  }, [config?.apiUrl])

  return render ? <>{children}</> : null
}

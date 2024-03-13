import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { AuthorizationProvider } from '@/providers'
import { ConfigProvider } from '@4chain-ag/react-configuration'
import { BrowserRouter } from 'react-router-dom'
import { AutoupdateProvider } from '@/providers/autoupdate'
import { registerSW } from 'virtual:pwa-register'
import { ServerConfigProvider } from './providers/server_config/provider'
import { ErrorBoundary } from './ErrorBoundary'
import { GlobalStyles } from '@/styles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary>
      <ConfigProvider>
        <ServerConfigProvider>
          <AuthorizationProvider>
            <AutoupdateProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </AutoupdateProvider>
          </AuthorizationProvider>
        </ServerConfigProvider>
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>
)

const intervalMS = 30 * 60 * 1000

registerSW({
  onRegisteredSW(swUrl, worker) {
    worker &&
      setInterval(async () => {
        if (!(!worker.installing && navigator)) return

        if ('connection' in navigator && !navigator.onLine) return

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            'cache': 'no-store',
            'cache-control': 'no-cache',
          },
        })

        if (resp?.status === 200) await worker.update()
      }, intervalMS)
  },
})

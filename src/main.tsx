import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { AuthorizationProvider, ContactsProvider } from '@/providers';
import { ConfigProvider } from '@4chain-ag/react-configuration';
import { BrowserRouter } from 'react-router-dom';
import { AutoupdateProvider } from '@/providers/autoupdate';
import { registerSW } from 'virtual:pwa-register';
import { ServerConfigProvider } from './providers/server_config/provider';
import { ErrorBoundary } from './ErrorBoundary';
import { GlobalStyles } from '@/styles';
import { AxiosProvider } from './api/AxiosProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <ErrorBoundary>
      <ConfigProvider>
        <AxiosProvider>
          <ServerConfigProvider>
            <AuthorizationProvider>
              <AutoupdateProvider>
                <ContactsProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </ContactsProvider>
              </AutoupdateProvider>
            </AuthorizationProvider>
          </ServerConfigProvider>
        </AxiosProvider>
      </ConfigProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);

const intervalMS = 30 * 60 * 1000;

registerSW({
  onRegisteredSW(swUrl, worker) {
    if (!worker) {
      return;
    }
      setInterval(async () => {
        if (!(!worker.installing && navigator)) return;

        if ('connection' in navigator && !navigator.onLine) return;

        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache',
          },
        });

        if (resp?.status === 200) await worker.update();
      }, intervalMS);
  },
});
